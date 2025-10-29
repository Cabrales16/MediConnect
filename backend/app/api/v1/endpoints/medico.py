from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.medico import MedicoBase
from app.services.medicos_service import crear_medico
from app.core.sanitizer import sanitize_text

router = APIRouter(prefix="/medicos", tags=["Medicos"])

@router.post("/Completa/Medico/{id_usuario}", response_model=MedicoBase)
def completar_perfil_medico(
    id_usuario: int,
    medico: MedicoBase,
    db: Session = Depends(get_db)
):
    """
    Completa el perfil de un médico.
    """
    medico.especialidad = sanitize_text(medico.especialidad)
    medico.estudios = sanitize_text(medico.estudios)

    if not medico.especialidad.strip():
        raise HTTPException(status_code=400, detail="La especialidad no puede estar vacía")
    if not medico.estudios.strip():
        raise HTTPException(status_code=400, detail="Los estudios no pueden estar vacíos")

    return crear_medico(db, medico, id_usuario)


