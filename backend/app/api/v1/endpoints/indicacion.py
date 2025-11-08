from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.indicacion_service import crear_indicacion, obtener_indicaciones_paciente
from app.schemas.indicacion import CrearIndicacion, IndicacionesPaciente

router = APIRouter(prefix="/indicacion", tags=["Indicacion"])

@router.post("/crear", response_model=CrearIndicacion)
def crear_nueva_indicacion(indicacion: CrearIndicacion, db: Session = Depends(get_db)):
    nueva_indicacion = crear_indicacion(db, indicacion)
    return nueva_indicacion

@router.get("/paciente/{id_paciente}", response_model=list[IndicacionesPaciente])
def obtener_indicaciones_de_paciente(id_paciente: int, db: Session = Depends(get_db)):
    indicaciones = obtener_indicaciones_paciente(db, id_paciente)
    return indicaciones
