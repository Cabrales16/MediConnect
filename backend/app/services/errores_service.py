from sqlalchemy.orm import Session
from app.models.error import ErrorTecnico
from app.schemas.error import ErrorCreate

def crear_error(db: Session, error: ErrorCreate):
    nuevo_error = ErrorTecnico(
        id_usuario=error.id_usuario,
        mensaje=error.mensaje
    )
    db.add(nuevo_error)
    db.commit()
    db.refresh(nuevo_error)
    return nuevo_error
