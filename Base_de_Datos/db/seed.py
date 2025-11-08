from datetime import date, time, timedelta
import logging
import random
from db.database import Session
from models.usuario import Usuario, EstadoUsuario, Genero, EspecialidadMedica, TipoDocumento
from models.horarios import Horario
from models.hospitales import Hospital, EstadoHospital
from models.error import ErrorTecnico
from models.cita import Cita, EstadoCita
from models.familiar import Familiar
from models.rol import Rol
from models.medicacion import Medicacion, EstadoMedicacion
from models.medicamento import Medicamento
from models.indicaciones import Indicaciones, EstadoIndicacion
from models.tipo_Novedad import TipoNovedad
from models.medico import Medico, EspecialidadMedica

# Configuración básica de logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear sesión
session = Session()

# Listas de datos base
nombres_masculinos = ["Juan", "Carlos", "Luis", "Pedro", "Miguel", "José", "Antonio", "Francisco", "Diego", "Andrés"]
nombres_femeninos = ["Ana", "María", "Laura", "Sofía", "Lucía", "Elena", "Carolina", "Valentina", "Camila", "Isabella"]
apellidos = ["Pérez", "Gómez", "López", "Martínez", "Rodríguez", "García", "Hernández", "Ortiz", "Morales", "Ramírez",
             "Torres", "Vargas", "Rojas", "Castillo", "Díaz", "Cruz", "Reyes", "Mendoza", "Silva", "Castro"]

especialidades = list(EspecialidadMedica)
dias_semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
estados_cita = [EstadoCita.PROGRAMADA, EstadoCita.CANCELADA, EstadoCita.COMPLETADA]
estados_medicacion = [EstadoMedicacion.ACTIVA, EstadoMedicacion.COMPLETADA]
estados_indicacion = [EstadoIndicacion.PROGRAMADA, EstadoIndicacion.COMPLETADA]


def generar_documento():
    return f"1{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}"

def generar_correo(nombre, apellido):
    return f"{nombre.lower()}.{apellido.lower()}{random.randint(1, 999)}@example.com"

def generar_telefono():
    return f"3{random.choice(['0','1','2','5'])}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}"

def fecha_aleatoria(start_year=1960, end_year=2005):
    year = random.randint(start_year, end_year)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    return date(year, month, day)

def hora_aleatoria():
    hora = random.randint(7, 18)
    minuto = random.choice([0, 30])
    return time(hora, minuto)


# === 1. Hospitales (50) ===
def agregar_hospitales():
    hospitales = []
    base_nombres = ["Clínica", "Hospital", "Centro Médico", "Fundación", "IPS"]
    localidades = ["Suba", "Engativá", "Kennedy", "Fontibón", "Usaquén", "Chapinero", "Teusaquillo", "Barrios Unidos", "Santa Fe", "Puente Aranda"]
    
    for i in range(50):
        nombre = f"{random.choice(base_nombres)} {random.choice(localidades)} {i+1 if i > 9 else ''}".strip()
        direccion = f"Calle {random.randint(1,200)} # {random.randint(1,99)}-{random.randint(1,99)}, Bogotá"
        estado = random.choice([EstadoHospital.ABIERTO, EstadoHospital.MANTENIMIENTO])
        hospitales.append(Hospital(nombre=nombre, direccion=direccion, estado=estado))
    
    session.add_all(hospitales)
    session.commit()
    logger.info("50 Hospitales agregados exitosamente.")


# === 2. Roles (3 fijos) ===
def agregar_roles():
    roles = [
        Rol(nombre_rol="Paciente"),
        Rol(nombre_rol="Médico"),
        Rol(nombre_rol="Administrador"),
    ]
    session.add_all(roles)
    session.commit()
    logger.info("Roles agregados exitosamente.")

def obtener_rol_id(nombre_rol):
    rol = session.query(Rol).filter_by(nombre_rol=nombre_rol).first()
    return rol.id_rol if rol else None


# === 3. Tipos de Información (5 fijos) ===
def agregar_tipo_informacion():
    tipos = [
        TipoNovedad(id_info=1, descripcion="Toda informacion"),
        TipoNovedad(id_info=2, descripcion="Emergencias y indicaciones medicas"),
        TipoNovedad(id_info=3, descripcion="Emergencias y medicamentos"),
        TipoNovedad(id_info=4, descripcion="Emergencias y citas"),
        TipoNovedad(id_info=5, descripcion="Solo emergencias"),
    ]
    session.add_all(tipos)
    session.commit()
    logger.info("Tipos de información agregados exitosamente.")


# === 4. Usuarios (50) ===
def agregar_usuarios():
    rol_paciente = obtener_rol_id("Paciente")
    rol_medico = obtener_rol_id("Médico")
    rol_admin = obtener_rol_id("Administrador")

    usuarios = []
    medicos_count = 0
    pacientes_count = 0
    admins_count = 0

    for i in range(50):
        es_medico = i < 15  # 15 médicos
        es_admin = i == 49  # 1 admin
        es_paciente = not es_medico and not es_admin

        genero = random.choice([Genero.MASCULINO, Genero.FEMENINO])
        nombre = random.choice(nombres_masculinos if genero == Genero.MASCULINO else nombres_femeninos)
        apellido = random.choice(apellidos)
        documento = generar_documento()
        correo = generar_correo(nombre, apellido)
        telefono = generar_telefono()
        direccion = f"Calle {random.randint(1,200)} # {random.randint(1,99)}-{random.randint(1,99)}"
        contrasena = f"{nombre.lower()}080"
        fecha_nac = fecha_aleatoria(1960 if es_medico else 1980, 2000 if es_paciente else 1990)

        id_rol = rol_medico if es_medico else (rol_admin if es_admin else rol_paciente)

        usuarios.append(Usuario(
            nombre=nombre, apellido=apellido, tipo_documento=TipoDocumento.CC, num_documento=documento,
            correo=correo, telefono=telefono, genero=genero, direccion=direccion,
            contrasena=contrasena, estado=EstadoUsuario.ACTIVO, fecha_nacimiento=fecha_nac, id_rol=id_rol
        ))

        if es_medico: medicos_count += 1
        if es_paciente: pacientes_count += 1
        if es_admin: admins_count += 1

    session.add_all(usuarios)
    session.commit()
    logger.info(f"50 Usuarios agregados: {medicos_count} médicos, {pacientes_count} pacientes, {admins_count} admin.")


# === 5. Médicos (15, asociados a usuarios médicos) ===
def agregar_medicos():
    usuarios_medicos = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Médico")).all()
    hospitales = session.query(Hospital).all()

    medicos = []
    estudios_base = [
        "Especialista en {} - Universidad Nacional",
        "Magíster en {} - Universidad Javeriana",
        "Residente en {} - Universidad de los Andes",
        "Diplomado en {} - Universidad El Bosque"
    ]

    for i, usuario in enumerate(usuarios_medicos):
        if i >= len(hospitales): break
        especialidad = random.choice(especialidades)
        estudio = random.choice(estudios_base).format(especialidad.name.capitalize())
        calificacion = round(random.uniform(3.5, 5.0), 1)
        hospital = random.choice(hospitales)

        medicos.append(Medico(
            id_medico=usuario.id_usuario,
            especialidad=especialidad,
            estudios=estudio,
            calificacion=calificacion,
            id_hospital=hospital.id_hospital
        ))

    session.add_all(medicos)
    session.commit()
    logger.info(f"{len(medicos)} Médicos detallados agregados.")


# === 6. Horarios (50, ~3-4 por médico) ===
def agregar_horarios():
    medicos = session.query(Medico).all()
    horarios = []

    for medico in medicos:
        num_horarios = random.randint(2, 4)
        dias_usados = random.sample(dias_semana, num_horarios)
        for dia in dias_usados:
            hora_inicio = hora_aleatoria()
            hora_fin = time((hora_inicio.hour + random.randint(4, 8)) % 24, random.choice([0, 30]))
            horarios.append(Horario(
                id_medico=medico.id_medico,
                dia=dia,
                hora_inicio=hora_inicio,
                hora_fin=hora_fin
            ))

        if len(horarios) >= 50:
            horarios = horarios[:50]
            break

    session.add_all(horarios)
    session.commit()
    logger.info(f"{len(horarios)} Horarios agregados.")


# === 7. Citas (50) ===
def crear_citas():
    pacientes = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Paciente")).all()
    medicos = session.query(Medico).all()

    citas = []
    fecha_base = date(2025, 6, 1)
    observaciones_base = [
        "Dolor de cabeza persistente", "Control de presión arterial", "Revisión de resultados de laboratorio",
        "Dolor abdominal", "Fiebre recurrente", "Cita de seguimiento", "Dolor lumbar", "Chequeo anual"
    ]

    for i in range(50):
        paciente = random.choice(pacientes)
        medico = random.choice(medicos)
        fecha_cita = fecha_base + timedelta(days=random.randint(0, 60))
        hora = hora_aleatoria()
        estado = random.choice(estados_cita)
        observacion = random.choice(observaciones_base)
        id_info = random.randint(1, 5)
        id_hospital = medico.id_hospital if random.random() > 0.3 else random.choice([h.id_hospital for h in session.query(Hospital).all()])

        citas.append(Cita(
            id_paciente=paciente.id_usuario,
            id_medico=medico.id_medico,
            fecha=fecha_cita,
            hora=hora,
            estado=estado,
            observaciones=observacion,
            id_info=id_info,
            id_hospital=id_hospital
        ))

    session.add_all(citas)
    session.commit()
    logger.info("50 Citas agregadas exitosamente.")


# === 8. Familiares (50) ===
def agregar_familiares():
    pacientes = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Paciente")).all()
    familiares = []

    for i in range(50):
        paciente = random.choice(pacientes)
        nombre_familiar = f"{random.choice(nombres_masculinos + nombres_femeninos)} {random.choice(apellidos)}"
        correo = generar_correo(nombre_familiar.split()[0], nombre_familiar.split()[1])
        id_info = random.randint(1, 5)

        familiares.append(Familiar(
            nombre=nombre_familiar,
            correo=correo,
            id_info=id_info,
            id_paciente=paciente.id_usuario
        ))

    session.add_all(familiares)
    session.commit()
    logger.info("50 Familiares agregados exitosamente.")


# === 9. Medicamentos (50) ===
def agregar_medicamentos():
    admin = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Administrador")).first()
    if not admin:
        logger.error("No se encontró administrador para medicamentos.")
        return

    medicamentos_nombres = [
        "Paracetamol", "Ibuprofeno", "Amoxicilina", "Omeprazol", "Losartán", "Metformina", "Atorvastatina",
        "Salbutamol", "Diclofenaco", "Captopril", "Ranitidina", "Cetirizina", "Tramadol", "Aspirina",
        "Loratadina", "Simvastatina", "Amlodipino", "Enalapril", "Clonazepam", "Sertralina"
    ] * 3  # Repetir para llegar a 50+

    presentaciones = ["Tabletas", "Cápsulas", "Jarabe", "Inyectable", "Crema", "Gotas", "Supositorio"]
    unidades = ["500mg", "200mg/5ml", "250mg", "20mg", "100mg", "10mg/g", "5mg/ml"]

    medicamentos = []
    for i in range(50):
        nombre = random.choice(medicamentos_nombres[:50])
        presentacion = random.choice(presentaciones)
        unidad = random.choice(unidades)
        medicamentos.append(Medicamento(
            nombre=nombre,
            presentacion=presentacion,
            unidad_medida=unidad,
            id_admin=admin.id_usuario
        ))

    session.add_all(medicamentos)
    session.commit()
    logger.info("50 Medicamentos agregados exitosamente.")


# === 10. Medicaciones (50) ===
def agregar_medicaciones():
    pacientes = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Paciente")).limit(20).all()
    medicos = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Médico")).all()
    medicamentos = session.query(Medicamento).all()

    medicaciones = []
    fecha_base = date(2025, 6, 1)

    for i in range(50):
        paciente = random.choice(pacientes)
        medico = random.choice(medicos)
        medicamento = random.choice(medicamentos)
        inicio = fecha_base + timedelta(days=random.randint(0, 30))
        fin = inicio + timedelta(days=random.randint(3, 30))
        dosis = random.choice([
            "1 tableta cada 8 horas", "5 ml cada 6 horas", "1 cápsula cada 12 horas",
            "2 gotas en cada ojo 3 veces al día", "Aplicar crema 2 veces al día"
        ])
        estado = random.choice(estados_medicacion)

        medicaciones.append(Medicacion(
            id_paciente=paciente.id_usuario,
            id_medico=medico.id_usuario,
            id_medicamento=medicamento.id_medicamento,
            estado=estado,
            fecha_inicio=inicio,
            fecha_fin=fin,
            dosis=dosis
        ))

    session.add_all(medicaciones)
    session.commit()
    logger.info("50 Medicaciones agregadas exitosamente.")


# === 11. Indicaciones (50) ===
def agregar_indicaciones():
    pacientes = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Paciente")).limit(20).all()
    medicos = session.query(Usuario).filter_by(id_rol=obtener_rol_id("Médico")).all()

    indicaciones = []
    fecha_base = date(2025, 6, 1)
    textos = [
        "Reposo absoluto durante 48 horas.", "Beber al menos 2 litros de agua al día.",
        "Evitar alimentos grasos por 5 días.", "Controlar glucosa 3 veces al día.",
        "Usar compresas frías si hay inflamación.", "Tomar medicamentos con comida."
    ]

    for i in range(50):
        paciente = random.choice(pacientes)
        medico = random.choice(medicos)
        fecha = fecha_base + timedelta(days=random.randint(0, 45))
        hora = hora_aleatoria()
        estado = random.choice(estados_indicacion)
        observacion = " ".join(random.sample(textos, random.randint(1, 3)))

        indicaciones.append(Indicaciones(
            id_paciente=paciente.id_usuario,
            id_medico=medico.id_usuario,
            fecha=fecha,
            hora=hora,
            estado=estado,
            observaciones=observacion
        ))

    session.add_all(indicaciones)
    session.commit()
    logger.info("50 Indicaciones médicas agregadas exitosamente.")


# === EJECUCIÓN ===
if __name__ == "__main__":
    agregar_hospitales()
    agregar_roles()
    agregar_tipo_informacion()
    agregar_usuarios()
    agregar_medicos()
    agregar_horarios()
    crear_citas()
    agregar_familiares()
    agregar_medicamentos()
    agregar_medicaciones()
    agregar_indicaciones()

    logger.info("¡Todos los 50 registros por entidad han sido insertados exitosamente!")