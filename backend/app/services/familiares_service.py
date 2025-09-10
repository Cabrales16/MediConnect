from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.familiar import Familiar
from app.models.usuario import Usuario
from app.schemas.familiares import FamiliarCreate, FamiliarBase

def obtener_familiares_por_usuario(db: Session, id_paciente: int):
    familiares = db.query(Familiar).filter(Familiar.id_paciente == id_paciente).all()
    if not familiares:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontraron familiares para este usuario"
        )
    return familiares

def crear_familiar(db: Session, id_paciente: int, familiar_data: FamiliarCreate):
    paciente = db.query(Usuario).filter(Usuario.id_usuario == id_paciente).first()
    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el paciente especificado"
        )
    
    nuevo_familiar = Familiar(
        nombre=familiar_data.nombre,
        correo=familiar_data.correo,
        Telefono=familiar_data.Telefono,  
        id_info=familiar_data.id_info,
        id_paciente=id_paciente           
    )
    db.add(nuevo_familiar)
    db.commit()
    db.refresh(nuevo_familiar)
    return nuevo_familiar
