from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.hospital_service import todos_los_hospitales
from app.schemas.hospital import HospitalBase
from typing import List

router = APIRouter(prefix="/hospitales", tags=["Hospitales"])

@router.get("/", response_model=List[HospitalBase])
def listar_hospitales(db: Session = Depends(get_db)):
    """
    Obtener todos los hospitales
    """
    return todos_los_hospitales(db)