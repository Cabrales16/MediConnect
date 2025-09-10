# app/routes/historial.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.historial import PacienteResponse, HistorialResponse
from app.services import historial_service
from typing import List
from app.services.historial_service import cancelar_cita

router = APIRouter(prefix="/historial", tags=["Historial"])

@router.get("/paciente/{id_paciente}", response_model=PacienteResponse)
def get_paciente(id_paciente: int, db: Session = Depends(get_db)):
    return historial_service.obtener_paciente(db, id_paciente)


@router.get("/paciente/historial/{id_paciente}", response_model=List[HistorialResponse])
def get_historial(id_paciente: int, db: Session = Depends(get_db)):
    return historial_service.obtener_historial(db, id_paciente)

@router.put("/paciente/{id_cita}/cancelar")
def cancelar_cita_endpoint(id_cita: int, db: Session = Depends(get_db)):
    """
    Cancela una cita cambiando su estado a 'cancelado'
    """
    return cancelar_cita(db, id_cita)
