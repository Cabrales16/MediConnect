from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.familiares_service import obtener_familiares_por_usuario, crear_familiar, eliminar_familiar, actualizar_familiar
from app.schemas.familiares import FamiliarCreate, FamiliarBase, FamiliarResponse

router = APIRouter(prefix="/familiares", tags=["Familiares"])

@router.get("/ver/{id_paciente}", response_model=list[FamiliarBase])
def obtener_familiares(id_paciente: int, db: Session = Depends(get_db)):
    return obtener_familiares_por_usuario(db, id_paciente)


@router.post("/crear/{id_paciente}", response_model=FamiliarResponse)
def crear_nuevo_familiar(id_paciente: int, familiar_data: FamiliarCreate, db: Session = Depends(get_db)):
    return crear_familiar(db, id_paciente, familiar_data)
    return nuevo_familiar

@router.delete("/eliminar/{id_familiar}")
def eliminar_familiar_endpoint(id_familiar: int, db: Session = Depends(get_db)):
    return eliminar_familiar(db, id_familiar)

@router.put("/actualizar/{id_familiar}", response_model=FamiliarResponse)
def actualizar_familiar_endpoint(id_familiar: int, familiar_data: FamiliarCreate, db: Session = Depends(get_db)):
    return actualizar_familiar(db, id_familiar, familiar_data)
