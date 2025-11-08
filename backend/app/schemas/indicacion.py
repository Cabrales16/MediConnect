from enum import Enum
from pydantic import BaseModel, EmailStr
from datetime import time, date
from typing import Optional

class CrearIndicacion(BaseModel):
    id_medico: int
    id_paciente: int
    id_cita: int
    estado: Optional[str] = "PROGRAMADA"
    observaciones: str
    fecha: Optional[date] = None
    hora: Optional[time] = None

class IndicacionesPaciente(BaseModel):
    id_indicacion: int
    id_medico: int
    id_paciente: int
    id_cita: int
    medico_nombre: str
    estado: str
    observaciones: str


    class Config:
        orm_mode = True
