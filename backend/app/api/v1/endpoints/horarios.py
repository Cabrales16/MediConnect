from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.horarios import HorarioResponse, HorarioUpdate
from app.schemas.cita import CitaResponse
from app.services import horarios_service
from typing import List

router = APIRouter(prefix="/horarios", tags=["Horarios"])

@router.get("/{id_medico}", response_model=List[HorarioResponse])
def get_horarios(id_medico: int, db: Session = Depends(get_db)):
    return horarios_service.obtener_horarios_por_dia(db, id_medico)

@router.get("/citas/{id_medico}/{dia}", response_model=List[CitaResponse])
def get_citas_por_dia(id_medico: int, dia: str, db: Session = Depends(get_db)):
    return horarios_service.ver_citas_por_dias(db, id_medico, dia)

@router.put("/editar/{id_horario}")
def editar_horario(id_horario: int, horario: HorarioUpdate, db: Session = Depends(get_db)):
    horario_editado = horarios_service.editar_horario(db, id_horario, horario)
    if not horario_editado:
        raise HTTPException(status_code=404, detail="Horario no encontrado")
    return {"msg": "Horario actualizado con éxito", "horario": horario_editado}