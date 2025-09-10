from enum import Enum
from pydantic import BaseModel, EmailStr
from datetime import time, date

class CitaResponse(BaseModel):
    id_cita: int
    fecha: date
    hora: time
    nombre: str
    apellido: str
    especialidad: str
    estado: str
    hospital: str

    class Config:
        from_attributes = True
