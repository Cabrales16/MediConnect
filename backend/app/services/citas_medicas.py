from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.cita import Cita
from app.models.usuario import Usuario  
from app.models.hospitales import Hospital  
from app.models.medico import Medico

def obtener_citas(db: Session, id_paciente: int):
    citas = (
        db.query(
            Medico.especialidad.label("tipo_cita"),
            Cita.fecha.label("fecha"),
            Cita.hora.label("hora"),
            Cita.estado.label("estado"),
            Usuario.nombre.label("nombre"),
            Usuario.apellido.label("apellido"),
        )
        .join(Usuario, Cita.id_medico == Usuario.id_usuario)  # join con el médico
        .filter(Cita.id_paciente == id_paciente)             # citas de un paciente
        .all()
    )
    return citas

def obtener_cita(db: Session, id_cita: int):
    cita = (
        db.query(
            Medico.especialidad,
            Cita.fecha,
            Cita.hora,
            Usuario.nombre,
            Usuario.apellido,
            Cita.estado,
            Hospital.nombre.label("hospital"),
        )
        .join(Usuario, Cita.id_medico == Usuario.id_usuario)
        .join(Hospital, Cita.id_hospital == Hospital.id_hospital)
        .filter(Cita.id_cita == id_cita)
        .first()
    )

    if not cita:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cita no encontrada"
        )

    return cita