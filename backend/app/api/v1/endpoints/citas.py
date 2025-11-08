
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.citas import CitaResponse, CitaResponse2, CitaResponseA, CitaCreate ,CitaUpdate, CitasMedico
from app.services.citas_medicas import obtener_citas, obtener_cita, obtener_citas_medico
from app.services import citas_service
from typing import List
from app.services.historial_service import cancelar_cita
from datetime import date, time
from app.models.medico import EspecialidadMedica


router = APIRouter(prefix="/Citas", tags=["Citas"])


# OBTENER CITAS

@router.get("/paciente/{id_paciente}", response_model=List[CitaResponse])
def listar_citas_paciente(id_paciente: int, db: Session = Depends(get_db)):
    """
    Obtener todas las citas de un paciente
    """
    return obtener_citas(db, id_paciente)


@router.get("/{id_cita}", response_model=CitaResponse2)
def obtener_cita_detalle(id_cita: int, db: Session = Depends(get_db)):
    """
    Obtener el detalle de una cita específica
    """
    return obtener_cita(db, id_cita)




# EDITAR CITA

@router.put("/{cita_id}/editar", response_model=CitaResponseA)
def editar_cita_endpoint(cita_id: int, cita: CitaUpdate, db: Session = Depends(get_db)):
    """
    Editar (reagendar) una cita existente.
    - Valida que el paciente no tenga otra cita en la misma fecha y hora.
    - Valida que el médico no tenga otra cita en la misma fecha y hora.
    - Valida especialidad y horario del médico.
    """
    return citas_service.editar_cita(db, cita_id, cita)

# CANCELAR CITA
@router.put("/paciente/{id_cita}/cancelar")
def cancelar_cita_endpoint(id_cita: int, db: Session = Depends(get_db)):
    """
    Cancela una cita:
    - Cambia su estado a 'CANCELADA'
    - Registra la fecha/hora de cancelación en `eliminado_en`
    """
    return cancelar_cita(db, id_cita)

@router.get("/slots-disponibles-hora_fija/")
def get_slots_disponibles(
    especialidad: EspecialidadMedica,
    fecha: date,
    hora: time | None = None,  
    id_hospital: int | None = None,
    db: Session = Depends(get_db)
):
    return citas_service.obtener_slots_disponibles(db, especialidad, fecha, hora, id_hospital)


@router.get("/slots-disponibles-rango/")
def slots_disponibles_rango(
    fecha: date,
    especialidad: EspecialidadMedica,
    hora_inicio: time,
    hora_fin: time,
    id_hospital: int | None = None,
    db: Session = Depends(get_db)
):
    return citas_service.obtener_slots_disponibles_rango(
        db, especialidad, fecha, hora_inicio, hora_fin, id_hospital
    )



@router.post("/agendar", response_model=CitaCreate)
def crear_cita(cita: CitaCreate, db: Session = Depends(get_db)):
    return citas_service.agendar_cita(db=db, cita=cita)


@router.get("/medico/{id_usuario}/citas", response_model=List[CitasMedico])
def citas_medico(id_usuario: int, db: Session = Depends(get_db)):
    return obtener_citas_medico(db, id_usuario)