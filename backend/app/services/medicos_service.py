from sqlalchemy.orm import Session 
from fastapi import HTTPException
from app.models.medico import Medico
from app.schemas.medico import MedicoBase

def crear_medico(db: Session, medico: MedicoBase, id_usuario: int):
    nuevo_medico = Medico(
        id_medico=id_usuario,  
        especialidad=medico.especialidad,
        estudios=medico.estudios,
        id_hospital=medico.id_hospital
    )
    db.add(nuevo_medico)
    db.commit()
    db.refresh(nuevo_medico)
    return nuevo_medico

