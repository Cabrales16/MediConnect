// Datos iniciales de la demo. Replican la estructura de las tablas del backend
// (Usuario, Medico, Horario, Hospital, Cita, Medicacion, ...) para que la API
// simulada responda exactamente con la misma forma que el FastAPI original.
import dayjs from "dayjs";

const BASE = import.meta.env.BASE_URL || "/";
const novedadImg = (f) => `${BASE}static/novedades/${f}`;

export const DEMO_PASSWORD = "Demo123@";
export const DEMO_ACCOUNTS = {
  Paciente: { correo: "paciente@demo.com", id: 37 },
  "Médico": { correo: "medico@demo.com", id: 2 },
  Administrador: { correo: "admin@demo.com", id: 1 },
};

export const ESPECIALIDADES = [
  "Cardiologia",
  "Pediatria",
  "Traumatologia",
  "Neurologia",
  "Dermatologia",
  "Odontologia",
  "Medicina General",
];

const NOMBRES_M = ["Gerson", "Carlos", "Luis", "Pedro", "Miguel", "José", "Antonio", "Diego", "Andrés", "Felipe", "Sergio", "Mauricio", "Julián", "Camilo", "Esteban", "Ricardo"];
const NOMBRES_F = ["Juliana", "María", "Laura", "Sofía", "Lucía", "Elena", "Carolina", "Valentina", "Camila", "Isabella", "Natalia", "Paula", "Daniela", "Andrea", "Mariana", "Sara"];
const APELLIDOS = ["Sánchez", "García", "Pérez", "Gómez", "López", "Martínez", "Rodríguez", "Hernández", "Ortiz", "Morales", "Ramírez", "Torres", "Vargas", "Rojas", "Castillo", "Díaz", "Cruz", "Reyes", "Mendoza", "Silva", "Castro", "Herrera", "Medina", "Suárez"];

const HOSPITALES = [
  ["Clínica Suba", "Calle 145 # 91-19, Bogotá"],
  ["Hospital Engativá", "Calle 64 # 100-05, Bogotá"],
  ["Centro Médico Chapinero", "Carrera 13 # 54-75, Bogotá"],
  ["IPS Usaquén", "Carrera 7 # 119-14, Bogotá"],
  ["Clínica Kennedy", "Avenida 1 de Mayo # 78-60, Bogotá"],
];

const TIPOS_NOVEDAD = [
  "Toda informacion",
  "Emergencias y indicaciones medicas",
  "Emergencias y medicamentos",
  "Emergencias y citas",
  "Solo emergencias",
];

const ESTUDIOS = [
  "Especialista en {} - Universidad Nacional",
  "Magíster en {} - Universidad Javeriana",
  "Especialista en {} - Universidad de los Andes",
  "Diplomado en {} - Universidad El Bosque",
];

const MEDICAMENTOS = [
  ["Paracetamol", "Tabletas", "500mg"],
  ["Paracetamol", "Jarabe", "120mg/5ml"],
  ["Ibuprofeno", "Tabletas", "400mg"],
  ["Ibuprofeno", "Suspensión", "100mg/5ml"],
  ["Amoxicilina", "Cápsulas", "500mg"],
  ["Omeprazol", "Cápsulas", "20mg"],
  ["Losartán", "Tabletas", "50mg"],
  ["Metformina", "Tabletas", "850mg"],
  ["Atorvastatina", "Tabletas", "20mg"],
  ["Salbutamol", "Inhalador", "100mcg/dosis"],
  ["Diclofenaco", "Gel", "10mg/g"],
  ["Cetirizina", "Tabletas", "10mg"],
  ["Loratadina", "Jarabe", "5mg/5ml"],
  ["Amlodipino", "Tabletas", "5mg"],
  ["Enalapril", "Tabletas", "10mg"],
  ["Sertralina", "Tabletas", "50mg"],
];

const TERAPIAS = [
  ["Rehabilitación de rodilla", "rehabilitacion_rodilla.pdf"],
  ["Ejercicios respiratorios", "ejercicios_respiratorios.pdf"],
  ["Estimulación cognitiva", "estimulacion_cognitiva.pdf"],
  ["Estiramientos para lumbalgia", "estiramientos_lumbalgia.pdf"],
];

const NOVEDADES = [
  ["Campaña de Vacunación", "Este mes iniciamos la campaña de vacunación contra la influenza para todos los pacientes y personal del hospital.", "vacunas.png"],
  ["Taller de Salud Mental y Bienestar", "Únete a nuestro taller semanal de salud mental para aprender técnicas de manejo del estrés y promoción del bienestar emocional.", "saludmental.jpg"],
  ["Nueva Área de Atención Pediátrica", "Hemos inaugurado una nueva área especializada en atención pediátrica para mejorar el cuidado de nuestros pequeños pacientes.", "pediatria.jpeg"],
  ["Nuevo Servicio de Rehabilitación Física", "Inauguramos un moderno centro de rehabilitación para pacientes con necesidades físicas postquirúrgicas.", "rehabilitacion.jpg"],
  ["Programa de Nutrición y Alimentación Saludable", "Lanzamos un programa integral de nutrición con charlas, talleres y asesorías para fomentar hábitos saludables.", "nutricion.jpg"],
  ["Chequeos Preventivos de Cardiología", "Durante este mes ofrecemos jornadas de chequeo cardiológico preventivo para nuestros pacientes mayores de 40 años.", "cardiologia.jpg"],
  ["Nueva Tecnología en Diagnóstico por Imagen", "Incorporamos equipos de última generación en radiología y resonancia magnética para mejorar la precisión en diagnósticos.", "tecnologia.jpeg"],
  ["Campaña de Donación de Sangre", "Invitamos a toda la comunidad a participar en nuestra jornada solidaria de donación de sangre. ¡Tu ayuda salva vidas!", "donacion.jpg"],
  ["Consultas Ginecológicas Ampliadas", "Ahora contamos con más especialistas en ginecología para mejorar la atención a nuestras pacientes.", "ginecologia.jpg"],
  ["Jornada de Atención Gratuita", "El próximo sábado realizaremos una jornada de atención médica gratuita en distintas especialidades.", "jornada.jpg"],
];

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const pad = (n) => String(n).padStart(2, "0");
const hhmmss = (h, m = 0) => `${pad(h)}:${pad(m)}:00`;

// Devuelve la fecha (YYYY-MM-DD) a `offset` días de hoy, saltando domingos
// (los médicos no tienen horario ese día).
const fecha = (offset) => {
  let d = dayjs().add(offset, "day");
  if (d.day() === 0) d = d.add(offset >= 0 ? 1 : -1, "day");
  return d.format("YYYY-MM-DD");
};

export function buildSeed() {
  const hoy = dayjs().format("YYYY-MM-DD");
  const usuarios = [];
  const medicos = [];
  const horarios = [];

  // ---- Administrador (id 1) ----
  usuarios.push({
    id_usuario: 1, id_rol: 3, nombre: "Carlos", apellido: "Ramírez",
    tipo_documento: "CC", num_documento: "1012345678",
    correo: DEMO_ACCOUNTS.Administrador.correo, telefono: "3105550101",
    genero: "Masculino", direccion: "Calle 100 # 15-20", fecha_nacimiento: "1985-03-12",
    fecha_registro: "2025-01-10", estado: "Activo",
  });

  // ---- Médicos (ids 2..36): 7 especialidades x 5 hospitales ----
  let id = 2;
  let n = 0;
  ESPECIALIDADES.forEach((esp, si) => {
    HOSPITALES.forEach((_, hi) => {
      const fem = (si + hi) % 2 === 1;
      const nombre = (fem ? NOMBRES_F : NOMBRES_M)[(si * 5 + hi) % 16];
      const apellido = APELLIDOS[(si * 3 + hi * 5) % APELLIDOS.length];
      usuarios.push({
        id_usuario: id, id_rol: 2, nombre, apellido,
        tipo_documento: "CC", num_documento: String(1020000000 + id * 137),
        correo: `${slug(nombre)}.${slug(apellido)}${id}@mediconnect.demo`,
        telefono: `31${(10000000 + id * 7919) % 100000000}`.slice(0, 10),
        genero: fem ? "Femenino" : "Masculino",
        direccion: `Calle ${30 + id} # ${10 + (id % 40)}-${10 + (id % 80)}`,
        fecha_nacimiento: `${1968 + (id % 20)}-${pad(1 + (id % 12))}-${pad(1 + (id % 27))}`,
        fecha_registro: "2025-02-01", estado: "Activo",
      });
      medicos.push({
        id_medico: id, especialidad: esp,
        estudios: ESTUDIOS[n % ESTUDIOS.length].replace("{}", esp),
        calificacion: Math.round((3.6 + ((id * 7) % 15) / 10) * 10) / 10,
        id_hospital: hi + 1,
      });
      const inicio = 7 + (id % 3);
      DIAS.forEach((dia) =>
        horarios.push({
          id_horario: horarios.length + 1, id_medico: id, dia,
          hora_inicio: hhmmss(inicio), hora_fin: hhmmss(inicio + 9),
        })
      );
      id += 1;
      n += 1;
    });
  });

  // Médico demo (id 2) y la Dra. Juliana García de las notificaciones
  Object.assign(usuarios[1], { nombre: "Gerson", apellido: "Sánchez", genero: "Masculino", correo: DEMO_ACCOUNTS["Médico"].correo });
  medicos[0].calificacion = 4.8;
  const dra = usuarios.find((u) => u.id_rol === 2 && medicos.find((m) => m.id_medico === u.id_usuario && m.especialidad === "Pediatria" && m.id_hospital === 1));
  Object.assign(dra, { nombre: "Juliana", apellido: "García", genero: "Femenino", correo: `juliana.garcia${dra.id_usuario}@mediconnect.demo` });

  // ---- Pacientes (ids 37..48) ----
  const pacientesBase = [
    ["Camila", "Rodríguez", "Femenino"], ["Andrés", "Torres", "Masculino"],
    ["Valentina", "Morales", "Femenino"], ["Sebastián", "Vargas", "Masculino"],
    ["Daniela", "Castillo", "Femenino"], ["Juan", "Pérez", "Masculino"],
    ["Natalia", "Gómez", "Femenino"], ["Mateo", "López", "Masculino"],
    ["Sofía", "Herrera", "Femenino"], ["Santiago", "Medina", "Masculino"],
    ["Laura", "Suárez", "Femenino"], ["Nicolás", "Reyes", "Masculino"],
  ];
  pacientesBase.forEach(([nombre, apellido, genero], i) => {
    const uid = 37 + i;
    usuarios.push({
      id_usuario: uid, id_rol: 1, nombre, apellido,
      tipo_documento: "CC", num_documento: String(1030000000 + uid * 211),
      correo: i === 0 ? DEMO_ACCOUNTS.Paciente.correo : `${slug(nombre)}.${slug(apellido)}@correo.demo`,
      telefono: `32${(10000000 + uid * 6571) % 100000000}`.slice(0, 10),
      genero, direccion: `Carrera ${10 + uid} # ${20 + (uid % 50)}-${10 + (uid % 70)}`,
      fecha_nacimiento: `${1985 + (i % 15)}-${pad(1 + (i % 12))}-${pad(2 + (i % 26))}`,
      fecha_registro: "2025-03-15", estado: "Activo",
    });
  });
  usuarios.forEach((u) => {
    u.contrasena = DEMO_PASSWORD;
    u.confirmado = true;
    u.token_confirmacion = null;
  });

  // ---- Citas ----
  const medEn = (esp, h = 1) => medicos.find((m) => m.especialidad === esp && m.id_hospital === h).id_medico;
  const citas = [];
  const addCita = (id_paciente, id_medico, off, hora, estado, id_hospital) => {
    const m = medicos.find((x) => x.id_medico === id_medico);
    citas.push({
      id_cita: citas.length + 1, id_paciente, id_medico,
      id_hospital: id_hospital ?? m.id_hospital, id_medicacion: null, id_info: 1,
      fecha: fecha(off), hora: hhmmss(...hora), estado, eliminado_en: null,
    });
  };
  // Paciente demo (37)
  addCita(37, medEn("Cardiologia"), 3, [9, 30], "Programada");
  addCita(37, medEn("Pediatria"), 8, [10, 0], "Programada");
  addCita(37, medEn("Neurologia", 2), 15, [14, 0], "Programada");
  addCita(37, medEn("Cardiologia"), -21, [9, 0], "Completada");
  addCita(37, medEn("Traumatologia", 3), -45, [11, 30], "Completada");
  addCita(37, medEn("Medicina General", 4), -60, [8, 30], "Completada");
  addCita(37, medEn("Dermatologia", 5), -10, [15, 0], "Cancelada");
  // Médico demo (2) con otros pacientes
  const medDemo = medEn("Cardiologia");
  [[38, 1, [8, 0]], [39, 1, [10, 30]], [40, 2, [9, 0]], [41, 4, [14, 30]], [42, 5, [11, 0]], [43, 6, [8, 30]]].forEach(([p, off, h]) =>
    addCita(p, medDemo, off, h, "Programada")
  );
  [[38, -7, [9, 0]], [39, -14, [10, 0]], [41, -28, [15, 30]], [44, -35, [8, 0]]].forEach(([p, off, h]) =>
    addCita(p, medDemo, off, h, "Completada")
  );
  addCita(45, medDemo, -3, [13, 0], "Cancelada");
  // Relleno determinista para otros médicos/pacientes
  for (let i = 0; i < 24; i++) {
    const pac = 38 + (i % 11);
    const med = medicos[(i * 3 + 5) % medicos.length].id_medico;
    if (med === medDemo) continue;
    const off = i % 3 === 0 ? -(5 + i) : 2 + i;
    addCita(pac, med, off, [8 + (i % 8), i % 2 ? 30 : 0], off < 0 ? "Completada" : "Programada");
  }

  // ---- Medicamentos / medicación ----
  const medicamentos = MEDICAMENTOS.map(([nombre, presentacion, unidad_medida], i) => ({
    id_medicamento: i + 1, nombre, presentacion, unidad_medida, id_admin: 1,
  }));
  const medicaciones = [
    { id_paciente: 37, id_medico: medDemo, id_medicamento: 7, dosis: "1 tableta cada 24 horas", estado: "En curso", fecha_inicio: fecha(-20), fecha_fin: fecha(40) },
    { id_paciente: 37, id_medico: medDemo, id_medicamento: 9, dosis: "1 tableta en la noche", estado: "En curso", fecha_inicio: fecha(-20), fecha_fin: fecha(70) },
    { id_paciente: 37, id_medico: medEn("Traumatologia", 3), id_medicamento: 3, dosis: "1 tableta cada 8 horas con comida", estado: "Completada", fecha_inicio: fecha(-45), fecha_fin: fecha(-38) },
    { id_paciente: 38, id_medico: medDemo, id_medicamento: 14, dosis: "1 tableta cada 24 horas", estado: "En curso", fecha_inicio: fecha(-7), fecha_fin: fecha(50) },
    { id_paciente: 39, id_medico: medDemo, id_medicamento: 15, dosis: "1 tableta cada 12 horas", estado: "En curso", fecha_inicio: fecha(-14), fecha_fin: fecha(30) },
  ].map((m, i) => ({ id_medicacion: i + 1, ...m }));

  // ---- Terapias ----
  const crearTerapias = TERAPIAS.map(([nombre, archivo], i) => ({
    id_terapia: i + 1, id_admin: 1, nombre, estado: "Activa",
    descripcion: null, archivo: `terapias/${archivo}`,
  }));
  const terapiasAsignadas = [
    { id_CrearTerapia: 2, id_medico: medDemo, id_paciente: 37, estado: "ACTIVA", inicio: fecha(-18), fin: fecha(30) },
    { id_CrearTerapia: 4, id_medico: medEn("Traumatologia", 3), id_paciente: 37, estado: "FINALIZADA", inicio: fecha(-45), fin: fecha(-15) },
    { id_CrearTerapia: 1, id_medico: medDemo, id_paciente: 38, estado: "ACTIVA", inicio: fecha(-5), fin: fecha(40) },
  ].map((t, i) => ({ id_terapia: i + 1, ...t }));

  // ---- Indicaciones ----
  const citaCompletada = citas.find((c) => c.id_paciente === 37 && c.estado === "Completada" && c.id_medico === medDemo);
  const indicaciones = [
    { id_medico: medDemo, id_paciente: 37, id_cita: citaCompletada.id_cita, fecha: citaCompletada.fecha, hora: citaCompletada.hora, estado: "COMPLETADA", observaciones: "Mantener dieta baja en sodio y caminar 30 minutos diarios. Control de presión arterial en casa dos veces por semana." },
    { id_medico: medEn("Traumatologia", 3), id_paciente: 37, id_cita: citas.find((c) => c.id_paciente === 37 && c.id_medico === medEn("Traumatologia", 3)).id_cita, fecha: fecha(-45), hora: hhmmss(11, 30), estado: "PROGRAMADA", observaciones: "Aplicar frío local 15 minutos, 3 veces al día. Evitar cargar peso durante dos semanas." },
  ].map((x, i) => ({ id_indicacion: i + 1, ...x }));

  // ---- Familiares ----
  const familiares = [
    { id_paciente: 37, nombre: "Marta Rodríguez", correo: "marta.rodriguez@correo.demo", id_info: 1 },
    { id_paciente: 37, nombre: "Jorge Rodríguez", correo: "jorge.rodriguez@correo.demo", id_info: 4 },
    { id_paciente: 38, nombre: "Ana Torres", correo: "ana.torres@correo.demo", id_info: 2 },
  ].map((f, i) => ({ id_familiar: i + 1, ...f }));

  // ---- Novedades / hospitales / catálogos ----
  const novedades = NOVEDADES.map(([titulo, descripcion, img], i) => ({
    id_novedad: i + 1, id_admin: 1, titulo, descripcion, src: novedadImg(img),
  }));
  const hospitales = HOSPITALES.map(([nombre, direccion], i) => ({
    id_hospital: i + 1, nombre, direccion, estado: "Abierto",
  }));
  const tipos_novedad = TIPOS_NOVEDAD.map((descripcion, i) => ({ id_info: i + 1, descripcion }));

  return {
    version: 1,
    creado: hoy,
    usuarios, medicos, horarios, hospitales, citas, medicamentos, medicaciones,
    crearTerapias, terapiasAsignadas, indicaciones, familiares, novedades,
    tipos_novedad, errores: [], resetTokens: {}, archivos: {},
  };
}
