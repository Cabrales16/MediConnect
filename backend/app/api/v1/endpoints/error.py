from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.error import ErrorCreate, ErrorResponse
from app.services import errores_service
from app.core.sanitizer import sanitize_text

router = APIRouter(prefix="/errores", tags=["Errores"])

@router.post("/reportar", response_model=ErrorResponse)
def reportar_error(error: ErrorCreate, db: Session = Depends(get_db)):
    """
    Reporta un error en el sistema (ej: bug, crash, info de debug).
    Sanitiza campos de texto antes de guardarlos en BD.
    """

    # Sanitizar solo strings para prevenir XSS
    error.mensaje = sanitize_text(error.mensaje)

    # Si quieres, puedes validar que el mensaje no venga vacío
    if not error.mensaje.strip():
        raise HTTPException(status_code=400, detail="El mensaje no puede estar vacío")

    return errores_service.crear_error(db, error)
