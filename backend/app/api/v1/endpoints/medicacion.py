from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.medicamento import Medicamento
from app.services.medicacion_service import crear_medicacion_service, obtener_medicacion_por_paciente
from app.schemas.medicacion import MedicacionBase, MedicacionResponse, MedicamentoResponse, MedicacionResponse2

router = APIRouter(prefix="/medicacion", tags=["Medicacion"])

@router.post("/crear", response_model=MedicacionResponse)
def crear_medicacion(medicacion_data: MedicacionBase, db: Session = Depends(get_db)):
    return crear_medicacion_service(db, medicacion_data)

@router.get("/paciente/{id_paciente}", response_model=list[MedicacionResponse2])
def get_medicacion_paciente(id_paciente: int, db: Session = Depends(get_db)):
    return obtener_medicacion_por_paciente(db, id_paciente)

@router.get("/", response_model=list[MedicamentoResponse])
def obtener_medicamentos(db: Session = Depends(get_db)):
    return db.query(Medicamento).all()