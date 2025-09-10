from datetime import date, time
import logging
from db.database import Session
# db/models.py
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



# Configuración básica de logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear sesión
session = Session()



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
    logger.info("Tipos de información para familiares agregados exitosamente.")


def agregar_usuarios():
    rol_paciente = obtener_rol_id("Paciente")
    rol_medico = obtener_rol_id("Médico")
    rol_admin = obtener_rol_id("Administrador")

    usuarios = [
    Usuario(
        nombre="Juan", apellido="Pérez", tipo_documento=TipoDocumento.CC, num_documento="1000000001",
        correo="juan@example.com", telefono="3001234567", genero=Genero.MASCULINO, direccion="Calle 123",
        contrasena="juan080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1990, 1, 1), id_rol=rol_paciente
    ),
    Usuario(
        nombre="Ana", apellido="Gómez", tipo_documento=TipoDocumento.CC, num_documento="1000000002",
        correo="ana@example.com", telefono="3009876543", genero=Genero.FEMENINO, direccion="Calle 456",
        contrasena="ana080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1985, 5, 5), id_rol=rol_medico
    ),
    Usuario(
        nombre="Carlos", apellido="López", tipo_documento=TipoDocumento.CC, num_documento="1564896523",
        correo="carlos@example.com", telefono="3101234567", genero=Genero.MASCULINO, direccion="Calle 789",
        contrasena="carlos080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1980, 10, 10), id_rol=rol_medico
    ),
    Usuario(
        nombre="María", apellido="Torres", tipo_documento=TipoDocumento.CC, num_documento="2000000004",
        correo="maria@example.com", telefono="3123456789", genero=Genero.FEMENINO, direccion="Calle 101",
        contrasena="maria080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(2000, 6, 15), id_rol=rol_paciente
    ),
    Usuario(
        nombre="Luis", apellido="Martínez", tipo_documento=TipoDocumento.CC, num_documento="3000000005",
        correo="luis@example.com", telefono="3141592653", genero=Genero.MASCULINO, direccion="Calle 202",
        contrasena="luis080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1995, 3, 22), id_rol=rol_paciente
    ),
    Usuario(
        nombre="Elena", apellido="Rodríguez", tipo_documento=TipoDocumento.CC, num_documento="4000000006",
        correo="elena@example.com", telefono="3001122334", genero=Genero.FEMENINO, direccion="Calle 303",
        contrasena="elena080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1988, 9, 8), id_rol=rol_paciente
    ),
    Usuario(
        nombre="Pedro", apellido="García", tipo_documento=TipoDocumento.CC, num_documento="5000000007",
        correo="pedro@example.com", telefono="3006677889", genero=Genero.MASCULINO, direccion="Calle 404",
        contrasena="pedro080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1982, 12, 25),
         id_rol=rol_medico
    ),
    Usuario(
        nombre="Sofía", apellido="Hernández", tipo_documento=TipoDocumento.CC, num_documento="6000000008",
        correo="sofia@example.com", telefono="3007788996", genero=Genero.FEMENINO, direccion="Calle 505",
        contrasena="sofia080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1992, 7, 11), id_rol=rol_admin
    ),
    Usuario(
        nombre="Miguel", apellido="Ortiz", tipo_documento=TipoDocumento.CC, num_documento="7000000009",
        correo="miguel@example.com", telefono="3005566778", genero=Genero.MASCULINO, direccion="Calle 606",
        contrasena="miguel080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1998, 4, 14), id_rol=rol_paciente
    ),
    Usuario(
        nombre="Lucía", apellido="Morales", tipo_documento=TipoDocumento.CC, num_documento="8000000010",
        correo="lucia@example.com", telefono="3003344556", genero=Genero.FEMENINO, direccion="Calle 707",
        contrasena="lucia080", estado=EstadoUsuario.ACTIVO, fecha_nacimiento=date(1987, 11, 30), id_rol=rol_paciente
    )
    ]
    session.add_all(usuarios)
    session.commit()
    logger.info("Usuarios agregados exitosamente.")

def agregar_horarios():
    medico = session.query(Usuario).filter_by(nombre="Ana").first()

    if medico:
        horarios = [
            Horario(id_medico=medico.id_usuario, dia="Lunes", hora_inicio=time(8, 0), hora_fin=time(14, 0)),
            Horario(id_medico=medico.id_usuario, dia="Miércoles", hora_inicio=time(9, 0), hora_fin=time(15, 0)),
            Horario(id_medico=medico.id_usuario, dia="Viernes", hora_inicio=time(10, 0), hora_fin=time(16, 0)),
        ]
        session.add_all(horarios)
        session.commit()
        logger.info("Horarios agregados exitosamente.")
    else:
        logger.error("No se encontró al médico para asignar horarios.")


def crear_cita():
    paciente = session.query(Usuario).filter_by(nombre="Juan").first()
    medico = session.query(Usuario).filter_by(nombre="Ana").first()

    if paciente and medico:
        citas = [
            Cita(
                id_paciente=paciente.id_usuario,
                id_medico=medico.id_usuario,
                fecha=date(2025, 6, 1),
                id_hospital=1,
                hora=time(9, 0),
                estado=EstadoCita.PROGRAMADA,
                observaciones="Se observo que el paciente tiene dolor de cabeza",
                id_info=1
            ),
            Cita(
                id_paciente=paciente.id_usuario,
                id_medico=medico.id_usuario,
                fecha=date(2025, 6, 2),
                id_hospital=1,
                hora=time(10, 0),
                estado=EstadoCita.CANCELADA,
                observaciones="Se observo que el paciente tiene unas caries",
                id_info=1
            )
        ]
        session.add_all(citas)
        session.commit()
        logger.info("Citas agregadas exitosamente.")
    else:
        logger.error("Paciente o médico no encontrado para agendar las citas.")


def agregar_familiares():
    paciente_juan = session.query(Usuario).filter_by(nombre="Juan").first()
    paciente_lucia = session.query(Usuario).filter_by(nombre="Lucía").first()

    if paciente_juan and paciente_lucia:
        familiares = [
            Familiar(nombre="María Pérez", correo="maria.perez@example.com",
                     id_info=1, id_paciente=paciente_juan.id_usuario , Telefono="3123649877"),
            Familiar(nombre="José Gómez", correo="jose.gomez@example.com",
                     id_info=2, id_paciente=paciente_lucia.id_usuario, Telefono="3123649557"),
            Familiar(nombre="Marta López", correo="marta.lopez@example.com",
                     id_info=3, id_paciente=paciente_juan.id_usuario, Telefono="3123649117"),
            Familiar(nombre="Luis Martínez", correo="luis.martinez@example.com",
                     id_info=4, id_paciente=paciente_lucia.id_usuario, Telefono="3123699877"),
            Familiar(nombre="Sofía Ramírez", correo="sofia.ramirez@example.com",
                     id_info=1, id_paciente=paciente_juan.id_usuario, Telefono="3113649877"),
        ]
        session.add_all(familiares)
        session.commit()
        logger.info("Familiares agregados exitosamente.")
    else:
        logger.error("No se encontraron pacientes válidos para asociar familiares.")

def agregar_medicamentos():
    medicamentos = [
        Medicamento(nombre="Paracetamol", presentacion="Tabletas", unidad_medida="500mg"),
        Medicamento(nombre="Ibuprofeno", presentacion="Jarabe", unidad_medida="200mg/5ml"),
        Medicamento(nombre="Amoxicilina", presentacion="Cápsulas", unidad_medida="250mg"),
    ]
    session.add_all(medicamentos)
    session.commit()
    logger.info("Medicamentos agregados exitosamente.")

def agregar_medicaciones():
    paciente = session.query(Usuario).filter_by(nombre="Juan").first()
    medico = session.query(Usuario).filter_by(nombre="Ana").first()
    paracetamol = session.query(Medicamento).filter_by(nombre="Paracetamol").first()
    ibuprofeno = session.query(Medicamento).filter_by(nombre="Ibuprofeno").first()

    if paciente and medico and paracetamol and ibuprofeno:
        medicaciones = [
            Medicacion(id_paciente=paciente.id_usuario, id_medico=medico.id_usuario,
                       fecha=date(2025, 6, 1), hora=time(10, 0), estado=EstadoMedicacion.ACTIVA,
                       id_medicamento=paracetamol.id_medicamento, dosis="1 tableta cada 8 horas"),
            Medicacion(id_paciente=paciente.id_usuario, id_medico=medico.id_usuario,
                       fecha=date(2025, 6, 2), hora=time(14, 0), estado=EstadoMedicacion.ACTIVA,
                       id_medicamento=ibuprofeno.id_medicamento, dosis="5 ml cada 6 horas")
        ]
        session.add_all(medicaciones)
        session.commit()
        logger.info("Medicaciones agregadas exitosamente.")
    else:
        logger.error("Error al agregar medicaciones. Faltan datos válidos.")

def agregar_indicaciones():
    paciente = session.query(Usuario).filter_by(nombre="Juan").first()
    medico = session.query(Usuario).filter_by(nombre="Ana").first()

    if paciente and medico:
        indicaciones = [
            Indicaciones(id_paciente=paciente.id_usuario, id_medico=medico.id_usuario,
                         fecha=date(2025, 6, 1), hora=time(11, 0), estado=EstadoIndicacion.PROGRAMADA,
                         observaciones="Reposo absoluto durante 48 horas. Mantener hidratación adecuada."),
            Indicaciones(id_paciente=paciente.id_usuario, id_medico=medico.id_usuario,
                         fecha=date(2025, 6, 2), hora=time(15, 0), estado=EstadoIndicacion.PROGRAMADA,
                         observaciones="Controlar la fiebre con compresas frías si supera los 38°C.")
        ]
        session.add_all(indicaciones)
        session.commit()
        logger.info("Indicaciones médicas agregadas exitosamente.")
    else:
        logger.error("No se encontraron pacientes o médicos válidos para asociar indicaciones.")



def agregar_hospitales():
    hospitales = [
        Hospital(nombre='Hospital de Suba', direccion='Carrera 90 #147 60, Bogotá', estado=EstadoHospital.ABIERTO),
        Hospital(nombre='Hospital de Engativa', direccion='Tv. 100a #80a-50, Bogotá', estado=EstadoHospital.ABIERTO),
        Hospital(nombre='Hospital Universitario San Ignacio', direccion='Kra 7° #40-62, Bogotá', estado=EstadoHospital.MANTENIMIENTO),
    ]
    session.add_all(hospitales)
    session.commit()
    logger.info("Hospitales agregados exitosamente.")


# Ejecutar todo el script
if __name__ == "__main__":
    agregar_hospitales()
    agregar_roles()
    agregar_tipo_informacion()
    agregar_usuarios()
    crear_cita()
    agregar_familiares()
    agregar_medicamentos()
    agregar_medicaciones()
    agregar_indicaciones()
    agregar_horarios()
    