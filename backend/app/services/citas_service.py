from datetime import datetime, timedelta, date
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.cita import Cita
from app.models.horarios import Horario
from app.models.medico import Medico, EspecialidadMedica
from app.models.usuario import Usuario
from app.schemas.citas import CitaCreate, CitaUpdate, EstadoCita
from app.models.hospitales import Hospital
from app.models.medicamento import Medicamento
from app.models.tipo_Novedad import TipoNovedad

# ============================================
# DURACIÓN SEGÚN ESPECIALIDAD
# ============================================
duracion_especialidades = {
    EspecialidadMedica.CARDIOLOGIA: 30,
    EspecialidadMedica.PEDIATRIA: 20,
    EspecialidadMedica.TRAUMATOLOGIA: 25,
    EspecialidadMedica.NEUROLOGIA: 40,
}

# ============================================
# VALIDACIONES
# ============================================
def validar_especialidad(db: Session, medico_id: int):
    # Buscar por la primary key de la tabla medico
    medico = db.query(Medico).filter(Medico.id == medico_id).first()
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
        "Wednesday": "Miércoles",
        "Thursday": "Jueves",
        "Friday": "Viernes",
        "Saturday": "Sábado",
        "Sunday": "Domingo"
    }
    dia_db = traduccion_dias[dia_semana]

    # CAMBIO CLAVE: Buscar el médico para obtener su id_usuario
    medico = db.query(Medico).filter(Medico.id == id_medico).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")
    


    # Buscar horario usando id_medico (que corresponde a Usuario.id_usuario)
    horario = db.query(Horario).filter(
        Horario.id_medico == medico.id_medico,  # Este es el id_usuario del médico
        Horario.dia == dia_db
    ).first()

    if not horario:
        # Debug adicional
        todos_horarios = db.query(Horario).filter(Horario.id_medico == medico.id_medico).all()
        print(f"Horarios existentes para médico {medico.id_medico}:")
        for h in todos_horarios:
            print(f"  - Día: {h.dia}, {h.hora_inicio}-{h.hora_fin}")
            
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
    # Validar existencia de entidades relacionadas
    paciente = db.query(Usuario).filter(Usuario.id_usuario == cita_data.id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    medico = db.query(Medico).filter(Medico.id_medico == cita_data.id_medico).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")

    hospital = db.query(Hospital).filter(Hospital.id_hospital == cita_data.id_hospital).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital no encontrado")

    medicacion = db.query(Medicamento).filter(Medicamento.id_medicamento == cita_data.id_medicacion).first()
    if not medicacion:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")

    info = db.query(TipoNovedad).filter(TipoNovedad.id_info == cita_data.id_info).first()
    if not info:
        raise HTTPException(status_code=404, detail="Información adicional no encontrada")

    # Validaciones de reglas de negocio
    validar_especialidad(db, medico.id)
    validar_horario(db, medico.id, cita_data.fecha, cita_data.hora)
    validar_disponibilidad_paciente(db, cita_data.id_paciente, cita_data.fecha, cita_data.hora)
    validar_disponibilidad_medico(db, medico.id, cita_data.fecha, cita_data.hora)

    # Crear nueva cita
    nueva_cita = Cita(
        id_paciente=cita_data.id_paciente,
        id_medico=medico.id,
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

    # Validar existencia de entidades relacionadas
    paciente = db.query(Usuario).filter(Usuario.id_usuario == cita.id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    medico = db.query(Medico).filter(Medico.id_medico == cita.id_medico).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")

    hospital = db.query(Hospital).filter(Hospital.id_hospital == cita.id_hospital).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital no encontrado")

    medicacion = db.query(Medicamento).filter(Medicamento.id_medicamento  == cita.id_medicacion).first()
    if not medicacion:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")

    info = db.query(TipoNovedad).filter(TipoNovedad.id_info == cita.id_info).first()
    if not info:
        raise HTTPException(status_code=404, detail="Información adicional no encontrada")

    # Validaciones de reglas de negocio
    validar_especialidad(db, cita.id_medico)
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
    db_cita.id_medicacion = cita.id_medicacion
    db_cita.id_info = cita.id_info

    db.commit()
    db.refresh(db_cita)
    return db_cita

# ============================================
# GENERAR SLOTS DISPONIBLES
# ============================================
def generar_slots(horario, duracion_minutos: int):
    """Divide el horario en bloques de X minutos"""
    slots = []
    hora_actual = datetime.combine(datetime.today(), horario.hora_inicio)
    hora_fin = datetime.combine(datetime.today(), horario.hora_fin)

    while hora_actual + timedelta(minutes=duracion_minutos) <= hora_fin:
        slots.append(hora_actual.time())
        hora_actual += timedelta(minutes=duracion_minutos)

    return slots


def obtener_slots_disponibles(db: Session, id_medico: int, fecha: date):
    # Buscar médico
    medico = db.query(Medico).filter(Medico.id == id_medico).first()
    if not medico or not medico.especialidad:
        raise HTTPException(status_code=404, detail="Médico o especialidad no encontrado")

    # Duración según especialidad
    duracion = duracion_especialidades.get(medico.especialidad, 30)

    # Día de la semana
    dia_semana = fecha.strftime("%A")
    traduccion_dias = {
        "Monday": "Lunes", "Tuesday": "Martes", "Wednesday": "Miercoles",
        "Thursday": "Jueves", "Friday": "Viernes", "Saturday": "Sabado", "Sunday": "Domingo"
    }

    # Buscar horario
    horario = db.query(Horario).filter(
        Horario.id_medico == id_medico,
        Horario.dia == traduccion_dias[dia_semana]
    ).first()

    if not horario:
        raise HTTPException(status_code=400, detail="El médico no tiene horario ese día")

    # Generar slots posibles
    slots = generar_slots(horario, duracion)

    # Citas ocupadas
    citas_ocupadas = db.query(Cita.hora).filter(
        Cita.id_medico == id_medico,
        Cita.fecha == fecha,
        Cita.estado != EstadoCita.CANCELADA.value
    ).all()

    horas_ocupadas = {c.hora for c in citas_ocupadas}

    # Filtrar disponibles
    disponibles = [s.strftime("%H:%M") for s in slots if s not in horas_ocupadas]

    return {
        "medico": medico.id,
        "especialidad": medico.especialidad.value,
        "fecha": str(fecha),
        "disponibles": disponibles
    }
