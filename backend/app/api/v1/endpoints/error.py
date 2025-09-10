from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.error import ErrorCreate, ErrorResponse
from app.services import errores_service  

router = APIRouter(prefix="/errores", tags=["Errores"])

@router.post("/reportar", response_model=ErrorResponse)
def reportar_error(error: ErrorCreate, db: Session = Depends(get_db)):
    return errores_service.crear_error(db, error)  

