
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.citas import CitaResponse, CitaResponse2, CitaResponseA, CitaCreate ,CitaUpdate
from app.services.citas_medicas import obtener_citas, obtener_cita
from app.services import citas_service
from typing import List
from app.services.historial_service import cancelar_cita

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

# OBTENER CITAS

@router.post("/agendar", response_model=CitaResponseA)
def agendar_cita(cita: CitaCreate, db: Session = Depends(get_db)):
    """
    Agendar una nueva cita.
    - Valida que el paciente no tenga otra cita en la misma fecha y hora.
    - Valida que el médico no tenga otra cita en la misma fecha y hora.
    - Valida especialidad y horario del médico.
    """
    return citas_service.crear_cita(db, cita)


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


