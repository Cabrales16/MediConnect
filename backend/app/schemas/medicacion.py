from pydantic import BaseModel
from typing import Optional
from datetime import date, time


class MedicacionBase(BaseModel):
    id_paciente: int
    id_medico: int
    id_medicamento: int
    dosis: str
    fecha_inicio: date
    fecha_fin: Optional[date] = None


    class Config:
        from_attributes = True


class MedicacionResponse(BaseModel):
    id_medicacion: int
    id_paciente: int
    id_medico: int
    id_medicamento: int
    dosis: str
    estado: str
    fecha_inicio: date
    fecha_fin: Optional[date] = None


    class Config:
        from_attributes = True

class MedicamentoResponse(BaseModel):
    id_medicamento: int
    nombre: str
    presentacion: str

    class Config:
        from_attributes = True

class MedicacionResponse2(BaseModel):
    id_medicacion: int
    id_paciente: int
    id_medico: int
    medico_nombre: str
    id_medicamento: int
    medicamento_nombre: str
    dosis: str
    estado: str
    fecha_inicio: date
    fecha_fin: date


    class Config:
        orm_mode = True