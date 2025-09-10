from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.familiares_service import obtener_familiares_por_usuario, crear_familiar
from app.schemas.familiares import FamiliarCreate, FamiliarBase, FamiliarResponse

router = APIRouter(prefix="/familiares", tags=["Familiares"])

@router.get("/ver/{id_paciente}", response_model=list[FamiliarBase])
def obtener_familiares(id_paciente: int, db: Session = Depends(get_db)):
    familiares = obtener_familiares_por_usuario(db, id_paciente)
    if not familiares:
        raise HTTPException(status_code=404, detail="No se encontraron familiares para este usuario")
    return familiares

@router.post("/crear/{id_paciente}", response_model=FamiliarResponse)
def crear_nuevo_familiar(id_paciente: int, familiar_data: FamiliarCreate, db: Session = Depends(get_db)):
    nuevo_familiar = crear_familiar(db, id_paciente,familiar_data)
    return nuevo_familiar
