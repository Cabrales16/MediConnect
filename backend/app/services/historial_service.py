from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.planilla import VistaPlanilla  
from app.models.cita import Cita

def obtener_paciente(db: Session, id_paciente: int):
    paciente = (
        db.query(
            VistaPlanilla.nombre_paciente.label("nombre"),
            VistaPlanilla.apellido_paciente.label("apellido")
        )
        .filter(VistaPlanilla.id_paciente == id_paciente)
        .first()
    )

    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    return {"nombre": paciente.nombre, "apellido": paciente.apellido}


def obtener_historial(db: Session, id_paciente: int):
    historial = (
        db.query(
            VistaPlanilla.fecha,
            VistaPlanilla.id_cita.label("id_cita"),
            VistaPlanilla.nombre_paciente.label("nombre_paciente"),
            VistaPlanilla.apellido_paciente.label("apellido_paciente"),
            VistaPlanilla.nombre_medico.label("nombre_medico"),
            VistaPlanilla.apellido_medico.label("apellido_medico"),
            VistaPlanilla.estado_cita.label("estado_cita"),
            VistaPlanilla.especialidad_medico.label("especialidad_medico"),
            VistaPlanilla.calificacion_medico.label("calificacion_medico"),
        )
        .filter(VistaPlanilla.id_paciente == id_paciente)
        .all()
    )

    if not historial:
        raise HTTPException(status_code=404, detail="No se encontró historial clínico")

    return [
        {
            "id_cita": h.id_cita,
            "fecha": h.fecha,
            "nombre_paciente": h.nombre_paciente,
            "apellido_paciente": h.apellido_paciente,
            "nombre_medico": h.nombre_medico,
            "apellido_medico": h.apellido_medico,
            "estado_cita": h.estado_cita,
            "especialidad_medico": h.especialidad_medico,
            "calificacion_medico": h.calificacion_medico,
        }
        for h in historial
    ]



def cancelar_cita(db: Session, id_cita: int):
    # Buscar la cita
    cita = db.query(Cita).filter(Cita.id_cita == id_cita).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    # Cambiar estado
    cita.estado = "CANCELADA"
    db.commit()
    db.refresh(cita)

    return {
        "id_cita": cita.id_cita,
        "estado": cita.estado,
        "mensaje": "Cita cancelada exitosamente"
    }