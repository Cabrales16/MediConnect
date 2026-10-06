// Endpoints de la API simulada. Cada ruta replica la del backend FastAPI
// (backend/app/api/v1/endpoints/*) con la misma forma de respuesta y los mismos
// mensajes de error, para que el frontend se comporte igual que con el original.
import dayjs from "dayjs";
import { getDb, saveDb, nextId } from "./db";
import { imageToDataUrl, storePdf } from "./files";
import { emailConLink, notificarFamiliares } from "./notify";

const BASE = import.meta.env.BASE_URL || "/";

export class HttpError extends Error {
  constructor(status, detail) {
    super(typeof detail === "string" ? detail : "Error");
    this.status = status;
    this.detail = detail;
  }
}
const fail = (status, detail) => {
  throw new HttpError(status, detail);
};

const ROLES = { 1: "Paciente", 2: "Médico", 3: "Administrador" };
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DURACION = { Cardiologia: 30, Pediatria: 20, Traumatologia: 25, Neurologia: 40 };
const PASSWORD_RE = {
  mayus: /[A-Z]/, minus: /[a-z]/, num: /[0-9]/, especial: /[@$!%*?&]/,
};

const num = (v) => Number(v);
const hms = (t) => {
  if (!t) return t;
  const [h = "00", m = "00", s = "00"] = String(t).split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:${(s || "00").padStart(2, "0")}`;
};
const toMin = (t) => {
  const [h, m] = hms(t).split(":").map(Number);
  return h * 60 + m;
};
const fromMin = (min) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}:00`;
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const userById = (db, id) => db.usuarios.find((u) => u.id_usuario === num(id));
const medicoById = (db, id) => db.medicos.find((m) => m.id_medico === num(id));
const hospitalById = (db, id) => db.hospitales.find((h) => h.id_hospital === num(id));
const nombreCompleto = (u) => `${u.nombre} ${u.apellido}`;

function validarPassword(pwd) {
  if (!pwd || pwd.length < 8) fail(422, "La contraseña debe tener al menos 8 caracteres.");
  if (!PASSWORD_RE.mayus.test(pwd)) fail(422, "La contraseña debe contener al menos una letra mayúscula.");
  if (!PASSWORD_RE.minus.test(pwd)) fail(422, "La contraseña debe contener al menos una letra minúscula.");
  if (!PASSWORD_RE.num.test(pwd)) fail(422, "La contraseña debe contener al menos un número.");
  if (!PASSWORD_RE.especial.test(pwd)) fail(422, "La contraseña debe contener al menos un caracter especial (@$!%*?&).");
}

// El selector de tipo de cita del frontend usa etiquetas ("Cita pediatría");
// el backend real solo entiende el enum de especialidades. Aquí se traducen todas.
function especialidadDesdeTipo(tipo) {
  const t = norm(tipo);
  if (t.includes("cardio")) return "Cardiologia";
  if (t.includes("pediatr")) return "Pediatria";
  if (t.includes("trauma")) return "Traumatologia";
  if (t.includes("neuro")) return "Neurologia";
  if (t.includes("dermat")) return "Dermatologia";
  if (t.includes("odonto")) return "Odontologia";
  if (t.includes("general")) return "Medicina General";
  return fail(422, [{ loc: ["query", "especialidad"], msg: "Especialidad no válida", type: "type_error.enum" }]);
}

function generarSlots(horario, duracion) {
  const slots = [];
  let cur = toMin(horario.hora_inicio);
  const fin = toMin(horario.hora_fin);
  while (cur + duracion <= fin) {
    slots.push(fromMin(cur));
    cur += duracion;
  }
  return slots;
}

function buscarSlots(db, { especialidad, fecha, id_hospital, filtrar }) {
  const esp = especialidadDesdeTipo(especialidad);
  let medicos = db.medicos.filter((m) => m.especialidad === esp);
  if (id_hospital) medicos = medicos.filter((m) => m.id_hospital === num(id_hospital));
  if (!medicos.length) fail(404, "No hay médicos con esa especialidad en ese hospital");

  const dia = DIAS[dayjs(fecha).day()];
  const duracion = DURACION[esp] ?? 30;
  const out = [];
  for (const m of medicos) {
    const horario = db.horarios.find((h) => h.id_medico === m.id_medico && h.dia === dia);
    if (!horario) continue;
    const ocupadas = new Set(
      db.citas
        .filter((c) => c.id_medico === m.id_medico && c.fecha === fecha && c.estado !== "Cancelada")
        .map((c) => hms(c.hora))
    );
    const libres = generarSlots(horario, duracion).filter((s) => !ocupadas.has(s) && filtrar(s));
    if (!libres.length) continue;
    const u = userById(db, m.id_medico);
    out.push({
      medico: m.id_medico,
      nombre: u.nombre,
      hospital: hospitalById(db, m.id_hospital)?.nombre ?? null,
      especialidad: m.especialidad,
      estudios: m.estudios,
      calificacion: m.calificacion,
      slots_disponibles: libres,
    });
  }
  return out;
}

function validarYCrearCita(db, { id_paciente, id_medico, id_hospital, fecha, hora }) {
  hora = hms(hora);
  const dup = (campo, id) =>
    db.citas.find((c) => c[campo] === id && c.fecha === fecha && hms(c.hora) === hora && c.estado !== "Cancelada");
  if (dup("id_paciente", id_paciente)) fail(400, "El paciente ya tiene una cita en esa fecha y hora");
  if (dup("id_medico", id_medico)) fail(400, "El médico ya tiene una cita en esa fecha y hora");

  const dia = DIAS[dayjs(fecha).day()];
  const horario = db.horarios.find((h) => h.id_medico === id_medico && h.dia === dia);
  if (!horario) fail(400, `El médico no tiene horario configurado para el día ${dia}`);
  if (!(toMin(horario.hora_inicio) <= toMin(hora) && toMin(hora) <= toMin(horario.hora_fin))) {
    fail(400, `La hora solicitada está fuera del horario laboral (${horario.hora_inicio} - ${horario.hora_fin})`);
  }
  if (!userById(db, id_paciente)) fail(404, "Paciente no encontrado");
  if (!userById(db, id_medico)) fail(404, "Médico no encontrado");
  if (!medicoById(db, id_medico)) fail(404, "Información del médico no encontrada");
  if (!hospitalById(db, id_hospital)) fail(404, "Hospital no encontrado");

  const cita = {
    id_cita: nextId(db.citas, "id_cita"), id_paciente, id_medico, id_hospital,
    id_medicacion: null, id_info: 1, fecha, hora, estado: "Programada", eliminado_en: null,
  };
  db.citas.push(cita);
  return cita;
}

const vistaCita = (db, c) => {
  const paciente = userById(db, c.id_paciente);
  const medico = userById(db, c.id_medico);
  return {
    id_cita: c.id_cita,
    fecha: c.fecha,
    hora: hms(c.hora),
    nombre_paciente: paciente.nombre,
    apellido_paciente: paciente.apellido,
    nombre_medico: medico.nombre,
    apellido_medico: medico.apellido,
    estado_cita: c.estado.toUpperCase(),
    especialidad_medico: medicoById(db, c.id_medico)?.especialidad ?? "General",
  };
};

const tipoFamiliar = (db, f) => db.tipos_novedad.find((t) => t.id_info === f.id_info)?.descripcion ?? null;
const familiarOut = (db, f) => ({ id_familiar: f.id_familiar, nombre: f.nombre, correo: f.correo, tipo: tipoFamiliar(db, f) });

const medicamentoOut = (m) => ({
  id_medicamento: m.id_medicamento, nombre: m.nombre, presentacion: m.presentacion, unidad_medida: m.unidad_medida,
});

const novedadOut = (n) => ({
  id_novedad: n.id_novedad, id_admin: n.id_admin, titulo: n.titulo, descripcion: n.descripcion, src: n.src,
});

const usuarioAdmOut = (u) => ({
  id_usuario: u.id_usuario, nombre: u.nombre, apellido: u.apellido, tipo_documento: u.tipo_documento,
  num_documento: u.num_documento, correo: u.correo, telefono: u.telefono, genero: u.genero,
  direccion: u.direccion, fecha_nacimiento: u.fecha_nacimiento, fecha_registro: u.fecha_registro, id_rol: u.id_rol,
});

const uploaded = (v) => typeof File !== "undefined" && v instanceof File;

// ---------------------------------------------------------------------------
// Tabla de rutas. Las más específicas van primero.
// ---------------------------------------------------------------------------
export const routes = [];
const route = (method, path, handler) => {
  const pattern = path
    .replace(/\/$/, "")
    .replace(/:(id_[a-zA-Z]+)/g, "(?<$1>\\d+)")
    .replace(/:([a-zA-Z]+)/g, "(?<$1>[^/]+)");
  routes.push({ method, re: new RegExp(`^${pattern}/?$`), handler });
};

// ----- Autenticación -----
route("post", "/auth/login", ({ body, db }) => {
  const correo = String(body.correo || "").trim().toLowerCase();
  const user = db.usuarios.find((u) => u.correo.toLowerCase() === correo);
  if (!user) fail(401, "Usuario no encontrado");

  if (!user.confirmado) {
    if (user.token_confirmacion) {
      emailConLink("Tu cuenta aún no está confirmada.", `bienvenida/${user.token_confirmacion}`);
    }
    fail(403, "Debes confirmar tu cuenta antes de iniciar sesión.");
  }
  const estado = norm(user.estado);
  if (estado === "suspendido") fail(403, "Tu cuenta está suspendida. Comunícate con el administrador.");
  if (estado !== "activo" && estado !== "pendiente") fail(403, "Tu cuenta no está activa.");

  if (user.bloqueado_hasta && Date.now() < user.bloqueado_hasta) {
    const min = Math.floor((user.bloqueado_hasta - Date.now()) / 60000);
    fail(403, `Cuenta bloqueada. Intenta de nuevo en ${min} minutos`);
  }
  if (user.contrasena !== body.contrasena) {
    user.intentos_fallidos = (user.intentos_fallidos || 0) + 1;
    if (user.intentos_fallidos >= 3) {
      user.bloqueado_hasta = Date.now() + 2 * 60000;
      user.intentos_fallidos = 0;
      saveDb();
      fail(403, "Cuenta bloqueada por 2 minutos");
    }
    saveDb();
    fail(401, "Credenciales incorrectas");
  }
  user.intentos_fallidos = 0;
  user.bloqueado_hasta = null;
  saveDb();
  return {
    access_token: `demo-token-${user.id_usuario}-${Date.now()}`,
    token_type: "bearer",
    rol: ROLES[user.id_rol],
    id_usuario: user.id_usuario,
    correo: user.correo,
    nombre: user.nombre,
  };
});

route("post", "/auth/register", ({ body, db }) => {
  const correo = String(body.correo || "").trim();
  if (db.usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase())) fail(400, "Correo ya registrado");
  validarPassword(body.contrasena);

  const token = `demo${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  const user = {
    id_usuario: nextId(db.usuarios, "id_usuario"), id_rol: 1,
    nombre: body.nombre, apellido: body.apellido, tipo_documento: body.tipo_documento,
    num_documento: body.num_documento, correo, telefono: body.telefono, genero: body.genero,
    direccion: body.direccion, fecha_nacimiento: body.fecha_nacimiento,
    fecha_registro: dayjs().format("YYYY-MM-DD"), contrasena: body.contrasena,
    estado: "Pendiente", confirmado: false, token_confirmacion: token,
  };
  db.usuarios.push(user);
  saveDb();
  emailConLink(`Enviamos un correo a ${correo} para confirmar la cuenta.`, `bienvenida/${token}`);
  return {
    access_token: `demo-token-${user.id_usuario}-${Date.now()}`, token_type: "bearer",
    rol: "Paciente", id_usuario: user.id_usuario, correo: user.correo, nombre: user.nombre,
  };
});

route("get", "/auth/confirmar/:token", ({ params, db }) => {
  const user = db.usuarios.find((u) => u.token_confirmacion === params.token);
  if (!user) fail(404, "Token inválido o usuario no encontrado");
  user.confirmado = true;
  user.estado = "Activo";
  user.token_confirmacion = null;
  saveDb();
  return { msg: "Cuenta confirmada con éxito." };
});

route("post", "/auth/recuperar-contrasena", ({ body, db }) => {
  const user = db.usuarios.find((u) => u.correo.toLowerCase() === String(body.correo || "").toLowerCase());
  if (!user) fail(404, "Usuario no encontrado.");
  const token = `reset${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  db.resetTokens[token] = { id_usuario: user.id_usuario, expira: Date.now() + 10 * 60000 };
  saveDb();
  emailConLink(`Enviamos un correo de recuperación a ${user.correo}.`, `restablecer/${token}`);
  return { msg: "Te hemos enviado un correo para recuperar tu contraseña." };
});

route("post", "/auth/restablecer-contrasena/:token", ({ params, body, db }) => {
  const info = db.resetTokens[params.token];
  if (!info) fail(400, "Token inválido.");
  if (Date.now() > info.expira) fail(400, "El enlace ha expirado.");
  validarPassword(body.nueva_contrasena);
  userById(db, info.id_usuario).contrasena = body.nueva_contrasena;
  delete db.resetTokens[params.token];
  saveDb();
  return { msg: "Contraseña restablecida con éxito." };
});

// ----- Perfil -----
route("get", "/perfil/perfil/:id_usuario", ({ params, db }) => {
  const u = userById(db, params.id_usuario);
  if (!u) fail(404, "Usuario no encontrado");
  return {
    nombre: u.nombre, apellido: u.apellido, tipo_documento: u.tipo_documento, num_documento: u.num_documento,
    telefono: u.telefono, direccion: u.direccion, correo: u.correo, fecha_registro: u.fecha_registro,
  };
});

route("put", "/perfil/editar/usuario/:id_usuario", ({ params, body, db }) => {
  const u = userById(db, params.id_usuario);
  if (!u) fail(404, "Perfil no encontrado");
  Object.assign(u, {
    tipo_documento: body.tipo_documento, telefono: body.telefono, direccion: body.direccion, correo: body.correo,
  });
  saveDb();
  return { msg: "Perfil actualizado con éxito", horario: u };
});

// ----- Citas (rutas fijas antes que /Citas/:id_cita) -----
route("get", "/Citas/slots-disponibles-hora_fija/", ({ query, db }) => {
  const hora = query.hora ? hms(query.hora) : null;
  return buscarSlots(db, {
    especialidad: query.especialidad, fecha: query.fecha, id_hospital: query.id_hospital,
    filtrar: (s) => !hora || s === hora,
  });
});

route("get", "/Citas/slots-disponibles-rango/", ({ query, db }) => {
  const ini = toMin(query.hora_inicio);
  const fin = toMin(query.hora_fin);
  return buscarSlots(db, {
    especialidad: query.especialidad, fecha: query.fecha, id_hospital: query.id_hospital,
    filtrar: (s) => toMin(s) >= ini && toMin(s) <= fin,
  });
});

route("post", "/Citas/agendar", ({ body, db }) => {
  const cita = validarYCrearCita(db, {
    id_paciente: num(body.id_paciente), id_medico: num(body.id_medico),
    id_hospital: num(body.id_hospital), fecha: body.fecha, hora: body.hora,
  });
  saveDb();
  notificarFamiliares(db, cita.id_paciente, ["toda informacion", "citas"], "Notificación de Nueva Cita Médica Programada");
  return {
    id_paciente: cita.id_paciente, id_medico: cita.id_medico, id_hospital: cita.id_hospital,
    id_medicacion: null, id_info: 1, fecha: cita.fecha, hora: hms(cita.hora),
  };
});

route("put", "/Citas/finalizar-cita", ({ body, db }) => {
  const c = db.citas.find((x) => x.id_cita === num(body.id_cita));
  if (!c) fail(404, "Cita no encontrada");
  c.estado = "Completada";
  saveDb();
  return c;
});

route("get", "/Citas/paciente/:id_paciente", ({ params, db }) =>
  db.citas
    .filter((c) => c.id_paciente === num(params.id_paciente))
    .map((c) => {
      const m = userById(db, c.id_medico);
      return { fecha: c.fecha, hora: hms(c.hora), nombre: m.nombre, apellido: m.apellido, estado: c.estado };
    })
);

route("put", "/Citas/paciente/:id_cita/cancelar", ({ params, db }) => {
  const c = db.citas.find((x) => x.id_cita === num(params.id_cita) && !x.eliminado_en);
  if (!c) fail(404, "Cita no encontrada o ya cancelada");
  c.estado = "Cancelada";
  c.eliminado_en = new Date().toISOString();
  saveDb();
  return { id_cita: c.id_cita, estado: "CANCELADA", eliminado_en: c.eliminado_en, mensaje: "Cita cancelada exitosamente" };
});

route("get", "/Citas/medico/:id_usuario/citas", ({ params, db }) =>
  db.citas
    .filter((c) => c.id_medico === num(params.id_usuario))
    .map((c) => {
      const p = userById(db, c.id_paciente);
      return {
        id_cita: c.id_cita, id_paciente: c.id_paciente, tipo_cita: medicoById(db, c.id_medico)?.especialidad,
        fecha: c.fecha, hora: hms(c.hora), estado: c.estado,
        paciente_nombre: p.nombre, paciente_apellido: p.apellido,
      };
    })
);

route("put", "/Citas/:id_cita/editar", ({ params, body, db }) => {
  const c = db.citas.find((x) => x.id_cita === num(params.id_cita));
  if (!c) fail(404, "Cita no encontrada");
  Object.assign(c, {
    id_paciente: num(body.id_paciente), id_medico: num(body.id_medico), fecha: body.fecha,
    hora: body.hora, estado: body.estado ?? c.estado, id_hospital: num(body.id_hospital),
  });
  saveDb();
  return { ...c, hora: hms(c.hora) };
});

route("get", "/Citas/:id_cita", ({ params, db }) => {
  const c = db.citas.find((x) => x.id_cita === num(params.id_cita));
  if (!c) fail(404, "Cita no encontrada");
  const m = userById(db, c.id_medico);
  return {
    fecha: c.fecha, hora: hms(c.hora), nombre: m.nombre, apellido: m.apellido,
    estado: c.estado, hospital: hospitalById(db, c.id_hospital)?.nombre,
  };
});

// ----- Historial -----
route("get", "/historial/paciente/historial/:id_paciente", ({ params, db }) => {
  const filas = db.citas.filter((c) => c.id_paciente === num(params.id_paciente)).map((c) => vistaCita(db, c));
  if (!filas.length) fail(404, "No se encontró historial clínico");
  return filas;
});

route("get", "/historial/paciente/:id_paciente", ({ params, db }) => {
  const u = userById(db, params.id_paciente);
  if (!u) fail(404, "Paciente no encontrado");
  return { nombre: u.nombre, apellido: u.apellido };
});

// ----- Horarios -----
route("get", "/horarios/:id_medico", ({ params, db }) => {
  const h = db.horarios.filter((x) => x.id_medico === num(params.id_medico));
  if (!h.length) fail(404, "No se encontraron horarios para el médico especificado.");
  return h.map(({ dia, hora_inicio, hora_fin, id_medico }) => ({ dia, hora_inicio, hora_fin, id_medico }));
});

// ----- Hospitales -----
route("get", "/hospitales/", ({ db }) => db.hospitales.map((h) => ({ id_hospital: h.id_hospital, nombre: h.nombre })));

// ----- Familiares -----
route("get", "/familiares/ver/:id_paciente", ({ params, db }) => {
  const lista = db.familiares.filter((f) => f.id_paciente === num(params.id_paciente));
  if (!lista.length) fail(404, "No se encontraron familiares para este usuario");
  return lista.map((f) => familiarOut(db, f));
});

route("post", "/familiares/crear/:id_paciente", ({ params, body, db }) => {
  if (!userById(db, params.id_paciente)) fail(404, "No se encontró el paciente especificado");
  if (!body.nombre || !body.correo) fail(422, "Nombre y correo son obligatorios");
  const f = {
    id_familiar: nextId(db.familiares, "id_familiar"), id_paciente: num(params.id_paciente),
    nombre: body.nombre, correo: body.correo, id_info: num(body.id_info) || 1,
  };
  db.familiares.push(f);
  saveDb();
  return familiarOut(db, f);
});

route("put", "/familiares/actualizar/:id_familiar", ({ params, body, db }) => {
  const f = db.familiares.find((x) => x.id_familiar === num(params.id_familiar));
  if (!f) fail(404, "No se encontró el familiar especificado");
  f.nombre = body.nombre;
  f.correo = body.correo;
  f.id_info = num(body.id_info) || f.id_info;
  saveDb();
  return familiarOut(db, f);
});

route("delete", "/familiares/eliminar/:id_familiar", ({ params, db }) => {
  const i = db.familiares.findIndex((x) => x.id_familiar === num(params.id_familiar));
  if (i < 0) fail(404, "No se encontró el familiar especificado");
  db.familiares.splice(i, 1);
  saveDb();
  return { detail: "Familiar eliminado exitosamente" };
});

// ----- Medicamentos (admin) -----
route("get", "/medicamentos/ver", ({ db }) => db.medicamentos.map(medicamentoOut));

route("post", "/medicamentos/crear", ({ body, db }) => {
  const m = {
    id_medicamento: nextId(db.medicamentos, "id_medicamento"), nombre: body.nombre,
    presentacion: body.presentacion, unidad_medida: body.unidad_medida, id_admin: 1,
  };
  db.medicamentos.push(m);
  saveDb();
  return medicamentoOut(m);
});

route("put", "/medicamentos/editar/:id_medicamento", ({ params, body, db }) => {
  const m = db.medicamentos.find((x) => x.id_medicamento === num(params.id_medicamento));
  if (!m) fail(404, "Medicamento no encontrado");
  Object.assign(m, { nombre: body.nombre, presentacion: body.presentacion, unidad_medida: body.unidad_medida });
  saveDb();
  return medicamentoOut(m);
});

route("delete", "/medicamentos/eliminar/:id_medicamento", ({ params, db }) => {
  const i = db.medicamentos.findIndex((x) => x.id_medicamento === num(params.id_medicamento));
  if (i < 0) fail(404, "Medicamento no encontrado");
  db.medicamentos.splice(i, 1);
  saveDb();
  return { detail: "Medicamento eliminado exitosamente" };
});

// ----- Medicación -----
route("get", "/medicacion/", ({ db }) =>
  db.medicamentos.map(({ id_medicamento, nombre, presentacion }) => ({ id_medicamento, nombre, presentacion }))
);

route("get", "/medicacion/paciente/:id_paciente", ({ params, db }) =>
  db.medicaciones
    .filter((m) => m.id_paciente === num(params.id_paciente))
    .map((m) => ({
      ...m,
      medico_nombre: userById(db, m.id_medico)?.nombre,
      medicamento_nombre: db.medicamentos.find((x) => x.id_medicamento === m.id_medicamento)?.nombre,
    }))
);

route("post", "/medicacion/crear", ({ body, db }) => {
  if (!userById(db, body.id_paciente) || !userById(db, body.id_medico)) fail(404, "Paciente o médico no encontrado");
  if (!db.medicamentos.some((m) => m.id_medicamento === num(body.id_medicamento))) fail(404, "Medicamento no encontrado");
  const m = {
    id_medicacion: nextId(db.medicaciones, "id_medicacion"), id_paciente: num(body.id_paciente),
    id_medico: num(body.id_medico), id_medicamento: num(body.id_medicamento), dosis: body.dosis,
    estado: "En curso", fecha_inicio: body.fecha_inicio, fecha_fin: body.fecha_fin || null,
  };
  db.medicaciones.push(m);
  saveDb();
  notificarFamiliares(db, m.id_paciente, ["toda informacion", "medicacion", "medicamento"], "Nueva medicación asignada");
  return m;
});

// ----- Indicaciones -----
route("post", "/indicacion/crear", ({ body, db }) => {
  if (!userById(db, body.id_paciente)) fail(404, "Paciente no encontrado");
  if (!userById(db, body.id_medico)) fail(404, "Médico no encontrado");
  if (db.indicaciones.some((i) => i.id_cita === num(body.id_cita))) fail(400, "Ya existe una indicación para esta cita");
  const ahora = dayjs();
  const i = {
    id_indicacion: nextId(db.indicaciones, "id_indicacion"), id_medico: num(body.id_medico),
    id_paciente: num(body.id_paciente), id_cita: num(body.id_cita),
    fecha: body.fecha || ahora.format("YYYY-MM-DD"), hora: body.hora || ahora.format("HH:mm:ss"),
    estado: "PROGRAMADA", observaciones: body.observaciones,
  };
  db.indicaciones.push(i);
  saveDb();
  notificarFamiliares(db, i.id_paciente, ["toda informacion", "medicacion", "indicaciones"], "Nueva indicación médica registrada");
  const { id_indicacion, ...out } = i;
  return out;
});

route("get", "/indicacion/paciente/:id_paciente", ({ params, db }) =>
  db.indicaciones
    .filter((i) => i.id_paciente === num(params.id_paciente))
    .map((i) => ({
      id_indicacion: i.id_indicacion, id_medico: i.id_medico, id_paciente: i.id_paciente, id_cita: i.id_cita,
      medico_nombre: nombreCompleto(userById(db, i.id_medico)), estado: i.estado, observaciones: i.observaciones,
    }))
);

// ----- Terapias -----
const terapiaFull = (t) => ({
  id_terapia: t.id_terapia, id_admin: t.id_admin, nombre: t.nombre, estado: t.estado, archivo: t.archivo,
});

route("get", "/terapia/ver", ({ db }) => db.crearTerapias.map(terapiaFull));

route("get", "/terapia/todas", ({ db }) =>
  db.crearTerapias.map(({ id_terapia, nombre, descripcion, archivo }) => ({ id_terapia, nombre, descripcion, archivo }))
);

route("post", "/terapia/subir", async ({ body, db }) => {
  if (!userById(db, body.id_admin)) fail(404, "Administrador no encontrado");
  if (!uploaded(body.file)) fail(422, "Debes adjuntar un archivo PDF");
  const { archivo, dataUrl } = await storePdf(body.file);
  const t = {
    id_terapia: nextId(db.crearTerapias, "id_terapia"), id_admin: num(body.id_admin),
    nombre: body.nombre, estado: "Activa", descripcion: null, archivo,
  };
  db.crearTerapias.push(t);
  if (dataUrl) db.archivos[archivo.split("/").pop()] = dataUrl;
  saveDb();
  return terapiaFull(t);
});

route("put", "/terapia/actualizar/:id_terapia", async ({ params, body, db }) => {
  const t = db.crearTerapias.find((x) => x.id_terapia === num(params.id_terapia));
  if (!t) fail(404, "Terapia no encontrada");
  t.nombre = body.nombre;
  t.estado = body.estado || t.estado;
  if (uploaded(body.file)) {
    const { archivo, dataUrl } = await storePdf(body.file);
    t.archivo = archivo;
    if (dataUrl) db.archivos[archivo.split("/").pop()] = dataUrl;
  }
  saveDb();
  return terapiaFull(t);
});

route("delete", "/terapia/eliminar/:id_terapia", ({ params, db }) => {
  const i = db.crearTerapias.findIndex((x) => x.id_terapia === num(params.id_terapia));
  if (i < 0) fail(404, "Terapia no encontrada");
  db.crearTerapias.splice(i, 1);
  saveDb();
  return { detail: "Terapia eliminada exitosamente" };
});

route("post", "/terapia/asignar", ({ body, db }) => {
  if (!userById(db, body.id_medico)) fail(404, "Médico no encontrado");
  if (!userById(db, body.id_paciente)) fail(404, "Paciente no encontrado");
  const base = db.crearTerapias.find((t) => t.id_terapia === num(body.id_CrearTerapia));
  if (!base) fail(404, "La terapia base no existe");
  const a = {
    id_terapia: nextId(db.terapiasAsignadas, "id_terapia"), id_CrearTerapia: base.id_terapia,
    id_medico: num(body.id_medico), id_paciente: num(body.id_paciente), estado: "ACTIVA",
    inicio: body.inicio, fin: body.fin,
  };
  db.terapiasAsignadas.push(a);
  saveDb();
  notificarFamiliares(db, a.id_paciente, ["toda informacion", "terapia"], "Nueva terapia asignada");
  return { ...a, nombre: base.nombre, pdf: base.archivo };
});

route("get", "/terapia/paciente/:id_usuario", ({ params, db }) => {
  const lista = db.terapiasAsignadas
    .filter((t) => t.id_paciente === num(params.id_usuario))
    .map((t) => {
      const base = db.crearTerapias.find((b) => b.id_terapia === t.id_CrearTerapia);
      return {
        id_terapia: t.id_terapia, nombre: base?.nombre, pdf: base?.archivo, estado: t.estado,
        inicio: t.inicio, fin: t.fin, nombre_medico: userById(db, t.id_medico)?.nombre,
      };
    });
  if (!lista.length) fail(404, "El paciente no tiene terapias asignadas");
  return lista;
});

// ----- Novedades -----
route("get", "/novedades/ver", ({ db }) => {
  if (!db.novedades.length) fail(404, "No se encontraron novedades registradas.");
  return db.novedades.map(novedadOut);
});

route("get", "/novedades/info/:id_novedad", ({ params, db }) => {
  const n = db.novedades.find((x) => x.id_novedad === num(params.id_novedad));
  if (!n) fail(404, "No se encontró la información de la novedad.");
  return novedadOut(n);
});

route("post", "/novedades/crear", async ({ body, db }) => {
  if (!body.titulo || !body.descripcion) fail(422, "Título y descripción son obligatorios");
  const src = uploaded(body.imagen) ? await imageToDataUrl(body.imagen) : `${BASE}static/novedades/jornada.jpg`;
  const n = {
    id_novedad: nextId(db.novedades, "id_novedad"), id_admin: num(body.id_admin),
    titulo: body.titulo, descripcion: body.descripcion, src,
  };
  db.novedades.push(n);
  saveDb();
  return novedadOut(n);
});

route("put", "/novedades/actualizar/:id_novedad", async ({ params, body, db }) => {
  const n = db.novedades.find((x) => x.id_novedad === num(params.id_novedad));
  if (!n) fail(404, "Novedad no encontrada");
  n.titulo = body.titulo;
  n.descripcion = body.descripcion;
  n.id_admin = num(body.id_admin);
  if (uploaded(body.imagen)) n.src = await imageToDataUrl(body.imagen);
  saveDb();
  return { msg: "Novedad actualizada correctamente", novedad: novedadOut(n) };
});

route("delete", "/novedades/eliminar/:id_novedad", ({ params, db }) => {
  const i = db.novedades.findIndex((x) => x.id_novedad === num(params.id_novedad));
  if (i < 0) fail(404, "Novedad no encontrada");
  db.novedades.splice(i, 1);
  saveDb();
  return { mensaje: "Novedad eliminada correctamente" };
});

// ----- Usuarios (admin) -----
route("get", "/Usuarios/rol/:id_rol", ({ params, db }) => {
  const rol = num(params.id_rol);
  if (![1, 2, 3].includes(rol)) fail(400, "Rol no válido");
  const lista = db.usuarios.filter((u) => u.id_rol === rol);
  if (rol === 2) {
    const medicos = lista
      .map((u) => ({ u, m: medicoById(db, u.id_usuario) }))
      .filter(({ m }) => m)
      .map(({ u, m }) => ({ ...usuarioAdmOut(u), especialidad: m.especialidad, calificacion: m.calificacion }));
    if (!medicos.length) fail(404, "No se encontraron médicos");
    return medicos;
  }
  if (!lista.length) fail(404, "No se encontraron usuarios con este rol");
  return lista.map(usuarioAdmOut);
});

route("put", "/Usuarios/cambiar_rol/:id_usuario", ({ params, body, db }) => {
  const u = userById(db, params.id_usuario);
  if (!u) fail(404, "Usuario no encontrado");
  u.id_rol = num(body.id_rol);
  saveDb();
  return { mensaje: "Rol actualizado correctamente", id_usuario: u.id_usuario, nuevo_rol: u.id_rol };
});

route("put", "/Usuarios/editar_usuario/:id_usuario", ({ params, body, db }) => {
  const u = userById(db, params.id_usuario);
  if (!u) fail(404, "Usuario no encontrado");
  ["nombre", "apellido", "correo"].forEach((k) => {
    if (body[k] != null) u[k] = body[k];
  });
  saveDb();
  return { mensaje: "Datos del usuario actualizados correctamente", id_usuario: u.id_usuario };
});

route("put", "/Usuarios/cambiar_estado/:id_usuario", ({ params, body, db }) => {
  const u = userById(db, params.id_usuario);
  if (!u) fail(404, "Usuario no encontrado");
  const e = String(body.estado || "");
  u.estado = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
  saveDb();
  return { mensaje: "Estado del usuario actualizado correctamente", id_usuario: u.id_usuario, estado: u.estado };
});

// ----- Médicos / errores -----
route("post", "/medicos/Completa/Medico/:id_usuario", ({ params, body, db }) => {
  if (!String(body.especialidad || "").trim()) fail(400, "La especialidad no puede estar vacía");
  if (!String(body.estudios || "").trim()) fail(400, "Los estudios no pueden estar vacíos");
  const id = num(params.id_usuario);
  if (!userById(db, id)) fail(404, "Usuario no encontrado");
  db.medicos = db.medicos.filter((m) => m.id_medico !== id);
  db.medicos.push({
    id_medico: id, especialidad: body.especialidad, estudios: body.estudios,
    calificacion: null, id_hospital: num(body.id_hospital),
  });
  // Horario por defecto para que el nuevo médico aparezca al agendar citas.
  if (!db.horarios.some((h) => h.id_medico === id)) {
    ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].forEach((dia) =>
      db.horarios.push({
        id_horario: nextId(db.horarios, "id_horario"), id_medico: id, dia,
        hora_inicio: "08:00:00", hora_fin: "17:00:00",
      })
    );
  }
  saveDb();
  return { especialidad: body.especialidad, estudios: body.estudios, id_hospital: num(body.id_hospital) };
});

route("post", "/errores/reportar", ({ body, db }) => {
  const e = { id: nextId(db.errores, "id"), id_usuario: num(body.id_usuario), mensaje: body.mensaje };
  db.errores.push(e);
  saveDb();
  return e;
});
