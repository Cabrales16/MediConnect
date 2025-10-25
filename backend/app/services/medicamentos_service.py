from sqlalchemy.orm import Session 
from fastapi import HTTPException
from app.models.medicamento import Medicamento
from app.schemas.medicamento import MedicamentoBase

def obtener_medicamentos_service(db: Session):
    medicamentos = db.query(Medicamento).all()
    return medicamentos


def crear_medicamento_service(db: Session, medicamento_data: MedicamentoBase):
    nuevo_medicamento = Medicamento(
        id_medicamento=medicamento_data.id_medicamento,
        nombre=medicamento_data.nombre,
        presentacion=medicamento_data.presentacion
    )
    db.add(nuevo_medicamento)
    db.commit()
    db.refresh(nuevo_medicamento)
    return nuevo_medicamento

def editar_medicamento_service(db: Session, id_medicamento: int, medicamento_data: MedicamentoBase):
    medicamento = db.query(Medicamento).filter(Medicamento.id_medicamento == id_medicamento).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    
    medicamento.nombre = medicamento_data.nombre
    medicamento.presentacion = medicamento_data.presentacion
    db.commit()
    db.refresh(medicamento)
    return medicamento

