from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.medicamentos_service import obtener_medicamentos_service, crear_medicamento_service, editar_medicamento_service, eliminar_medicamento_service
from app.schemas.medicamento import MedicamentoBase, EditarMedicamento, MedicamentoResponse

router = APIRouter(prefix="/medicamentos", tags=["Medicamentos"])

@router.get("/ver", response_model=list[MedicamentoResponse])
def obtener_medicamentos(db: Session = Depends(get_db)):
    return obtener_medicamentos_service(db)

@router.post("/crear", response_model=MedicamentoResponse)
def crear_medicamento(medicamento_data: MedicamentoBase, db: Session = Depends(get_db)):
    return crear_medicamento_service(db, medicamento_data)

@router.put("/editar/{id_medicamento}", response_model=MedicamentoResponse)
def editar_medicamento(id_medicamento: int, medicamento_data: MedicamentoBase, db: Session = Depends(get_db)):
    return editar_medicamento_service(db, id_medicamento, medicamento_data)

@router.delete("/eliminar/{id_medicamento}")
def eliminar_medicamento(id_medicamento: int, db: Session = Depends(get_db)):
    return eliminar_medicamento_service(db, id_medicamento)