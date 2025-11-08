from sqlalchemy.orm import Session, aliased
from fastapi import HTTPException, status
from app.models.cita import Cita
from app.models.usuario import Usuario  
from app.models.hospitales import Hospital  
from app.models.medico import Medico
from app.schemas.citas import CitasMedico


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

def obtener_citas_medico(db: Session, id_medico: int):
    # Alias para paciente
    paciente = aliased(Usuario)

    citas = (
        db.query(
            Cita.id_cita,
            Cita.fecha,
            Cita.hora,
            Cita.estado,
            Cita.id_paciente,
            paciente.nombre.label("paciente_nombre"),
            paciente.apellido.label("paciente_apellido"),
            Medico.especialidad.label("tipo_cita"),
        )
        .join(paciente, Cita.id_paciente == paciente.id_usuario)
        .join(Medico, Cita.id_medico == Medico.id_medico)
        .filter(Cita.id_medico == id_medico)
        .all()
    )

    return citas