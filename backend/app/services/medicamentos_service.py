from sqlalchemy.orm import Session 
from fastapi import HTTPException
from app.models.medicamento import Medicamento
from app.schemas.medicamento import MedicamentoBase, EditarMedicamento

def obtener_medicamentos_service(db: Session):
    medicamentos = db.query(Medicamento).all()
    return medicamentos


def crear_medicamento_service(db: Session, medicamento_data: MedicamentoBase):
    nuevo_medicamento = Medicamento(
        nombre=medicamento_data.nombre,
        presentacion=medicamento_data.presentacion,
        unidad_medida=medicamento_data.unidad_medida
    )
    db.add(nuevo_medicamento)
    db.commit()
    db.refresh(nuevo_medicamento)
    return nuevo_medicamento

def editar_medicamento_service(db: Session, id_medicamento: int, medicamento_data: EditarMedicamento):
    medicamento = db.query(Medicamento).filter(Medicamento.id_medicamento == id_medicamento).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    
    medicamento.nombre = medicamento_data.nombre
    medicamento.presentacion = medicamento_data.presentacion
    medicamento.unidad_medida = medicamento_data.unidad_medida
    db.commit()
    db.refresh(medicamento)
    return medicamento

def eliminar_medicamento_service(db: Session, id_medicamento: int):
    medicamento = db.query(Medicamento).filter(Medicamento.id_medicamento == id_medicamento).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    
    db.delete(medicamento)
    db.commit()
    return {"detail": "Medicamento eliminado exitosamente"}
