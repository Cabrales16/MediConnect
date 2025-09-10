from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.cita import Cita
from app.models.horarios import Horario
from app.models.medico import Medico
from app.models.usuario import Usuario
from app.schemas.citas import CitaCreate, CitaUpdate, EstadoCita

# ============================================
# FUNCIONES DE VALIDACIÓN REUTILIZABLES
# ============================================
def validar_especialidad(db: Session, id_medico: int):
    medico = db.query(Usuario).filter(Usuario.id_usuario == id_medico).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")
    if not medico.especialidad:
        raise HTTPException(status_code=400, detail="El médico no tiene especialidad registrada")
    return medico


def validar_horario(db: Session, id_medico: int, fecha, hora):
    dia_semana = fecha.strftime("%A")
    traduccion_dias = {
        "Monday": "Lunes",
        "Tuesday": "Martes",
        "Wednesday": "Miercoles",
        "Thursday": "Jueves",
        "Friday": "Viernes",
        "Saturday": "Sabado",
        "Sunday": "Domingo"
    }
    dia_db = traduccion_dias[dia_semana]

    horario = db.query(Horario).filter(
        Horario.id_medico == id_medico,
        Horario.dia == dia_db
    ).first()

    if not horario:
        raise HTTPException(
            status_code=400,
            detail=f"El médico no tiene horario configurado para el día {dia_db}"
        )

    if not (horario.hora_inicio <= hora <= horario.hora_fin):
        raise HTTPException(
            status_code=400,
            detail=f"La cita está fuera del horario laboral del médico ({horario.hora_inicio} - {horario.hora_fin})"
        )


def validar_disponibilidad_paciente(db: Session, id_paciente: int, fecha, hora, cita_id=None):
    query = db.query(Cita).filter(
        Cita.id_paciente == id_paciente,
        Cita.fecha == fecha,
        Cita.hora == hora,
        Cita.estado != EstadoCita.CANCELADA.value
    )
    if cita_id:
        query = query.filter(Cita.id_cita != cita_id)

    if query.first():
        raise HTTPException(
            status_code=400,
            detail="El paciente ya tiene una cita en esa fecha y hora"
        )


def validar_disponibilidad_medico(db: Session, id_medico: int, fecha, hora, cita_id=None):
    query = db.query(Cita).filter(
        Cita.id_medico == id_medico,
        Cita.fecha == fecha,
        Cita.hora == hora,
        Cita.estado != EstadoCita.CANCELADA.value
    )
    if cita_id:
        query = query.filter(Cita.id_cita != cita_id)

    if query.first():
        raise HTTPException(
            status_code=400,
            detail="El médico ya tiene una cita en esa fecha y hora"
        )

# ============================================
# CREAR CITA
# ============================================
def crear_cita(db: Session, cita_data: CitaCreate):
    # Validaciones
    medico = db.query(Medico).filter(Medico.id_medico == Cita.id_medico).first()
    validar_horario(db, cita_data.id_medico, cita_data.fecha, cita_data.hora)
    validar_disponibilidad_paciente(db, cita_data.id_paciente, cita_data.fecha, cita_data.hora)
    validar_disponibilidad_medico(db, cita_data.id_medico, cita_data.fecha, cita_data.hora)

    # Crear nueva cita
    nueva_cita = Cita(
        id_paciente=cita_data.id_paciente,
        id_medico=cita_data.id_medico,
        id_medicacion=cita_data.id_medicacion,
        id_hospital=cita_data.id_hospital,
        id_info=cita_data.id_info,
        fecha=cita_data.fecha,
        hora=cita_data.hora,
        estado=cita_data.estado.value,
    )

    db.add(nueva_cita)
    db.commit()
    db.refresh(nueva_cita)
    return nueva_cita


# ============================================
# EDITAR CITA
# ============================================
def editar_cita(db: Session, cita_id: int, cita: CitaUpdate):
    db_cita = db.query(Cita).filter(Cita.id_cita == cita_id).first()
    if not db_cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    # Validaciones
    medico = validar_especialidad(db, cita.id_medico)
    validar_horario(db, cita.id_medico, cita.fecha, cita.hora)
    validar_disponibilidad_paciente(db, cita.id_paciente, cita.fecha, cita.hora, cita_id)
    validar_disponibilidad_medico(db, cita.id_medico, cita.fecha, cita.hora, cita_id)

    # Actualizar datos
    db_cita.id_paciente = cita.id_paciente
    db_cita.id_medico = cita.id_medico
    db_cita.fecha = cita.fecha
    db_cita.hora = cita.hora
    db_cita.estado = cita.estado.value
    db_cita.id_hospital = cita.id_hospital

    db.commit()
    db.refresh(db_cita)
    return db_cita
