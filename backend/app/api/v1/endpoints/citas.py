
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.citas import CitaResponse, CitaResponse2, CitaResponseA, CitaCreate ,CitaUpdate
from app.services.citas_medicas import obtener_citas, obtener_cita
from app.services import citas_service
from typing import List

router = APIRouter(prefix="/Citas", tags=["Citas"])

@router.get("/Citas/{id_paciente}", response_model=List[CitaResponse])
def get_Usuarios(id_paciente: int, db: Session = Depends(get_db), ):
    return obtener_citas(db, id_paciente)

@router.get("/Cita/{id_cita}", response_model=CitaResponse2)
def get_paciente(id_cita: int, db: Session = Depends(get_db)):
    return obtener_cita(db, id_cita)



@router.post("/agendar", response_model=CitaResponseA)
def agendar_cita(cita: CitaCreate, db: Session = Depends(get_db)):
    """
    Agendar una nueva cita.
    - Valida que el paciente no tenga otra cita en la misma fecha y hora.
    - Valida que el médico no tenga otra cita en la misma fecha y hora.
    """
    return citas_service.crear_cita(db, cita)


@router.put("/{cita_id}/editar", response_model=CitaResponseA)
def editar_cita(cita_id: int, cita: CitaUpdate, db: Session = Depends(get_db)):
    """
    Editar (reagendar) una cita existente.
    - Valida que el paciente no tenga otra cita en la misma fecha y hora.
    - Valida que el médico no tenga otra cita en la misma fecha y hora.
    """
    return citas_service.editar_cita(db, cita_id, cita)