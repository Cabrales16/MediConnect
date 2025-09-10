from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.horarios import Horario
from app.models.cita import Cita
from app.models.usuario import Usuario
from app.models.hospitales import Hospital
from sqlalchemy import func
from app.models.medico import Medico

def obtener_horarios_por_dia(db: Session, id_medico: int):
    horarios = db.query(Horario).filter(Horario.id_medico == id_medico).all()
    if not horarios:
        raise HTTPException(status_code=404, detail="No se encontraron horarios para el médico especificado.")
    return horarios

def ver_citas_por_dias(db:Session, id_medico: int, dia: str):
    dia_es_en = {
        "lunes":"Monday",
        "martes":"Tuesday",
        "miercoles":"Wednesday",
        "miércoles":"Wednesday",
        "jueves":"Thursday",
        "viernes":"Friday",
        "sabado":"Saturday",
        "sábado":"Saturday",
        "domingo":"Sunday"
    }

    dia_ingles = dia_es_en.get(dia.lower())
    if not dia_ingles:
        raise HTTPException(status_code=400, detail="Día inválido")

    citas = (
        db.query(
            Cita.id_cita,
            Cita.fecha,
            Cita.hora,
            Usuario.nombre,
            Usuario.apellido,
            Medico.especialidad,
            Cita.estado,
            Hospital.nombre.label("hospital"),
        )

    .join(Usuario, Cita.id_paciente == Usuario.id_usuario)
    .join(Hospital, Cita.id_hospital == Hospital.id_hospital)
    .filter(Cita.id_medico == id_medico,)
    .filter(func.dayname(Cita.fecha) == dia_ingles)
    .all() #esto es por si todos los valores son verdaderos
    )
    return citas


def editar_horario(db: Session, id_horario: int, horario_data):
    horario = db.query(Horario).filter(Horario.id_horario == id_horario).first()
    if not horario:
        return None
    
    horario.dia = horario_data.dia
    horario.hora_inicio = horario_data.hora_inicio
    horario.hora_fin = horario_data.hora_fin

    db.commit()
    db.refresh(horario)
    return horario
