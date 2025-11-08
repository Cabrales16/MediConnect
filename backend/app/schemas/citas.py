from pydantic import BaseModel
from datetime import time, date
from enum import Enum
from typing import Optional

class EstadoCita(str, Enum):
    PROGRAMADA = "Programada"
    CANCELADA = "Cancelada"
    COMPLETADA = "Completada"
    PENDIENTE = "Pendiente"


# ---------------- RESPUESTAS ---------------- #

class CitaResponse(BaseModel):

    fecha: date
    hora: time
    nombre: str
    apellido: str
    estado: EstadoCita

    class Config:
        from_attributes = True


class CitaResponse2(BaseModel):

    fecha: date
    hora: time
    nombre: str
    apellido: str
    estado: EstadoCita
    hospital: str

    class Config:
        from_attributes = True


#CREACIÓN / ACTUALIZACIÓN #

class CitaBase(BaseModel):
    id_paciente: int
    id_medico: int
    id_medicacion: Optional[int] = None
    id_hospital: Optional[int] = None
    id_info: int
    fecha: date
    hora: time
    estado: EstadoCita


class CitaCreate(BaseModel):
    id_paciente: int
    id_medico: int
    id_hospital: Optional[int] = None
    id_medicacion: Optional[int] = None
    id_info: Optional[int] = None
    fecha: date
    hora: time


class CitaResponseA(CitaBase):
    id_cita: int

    class Config:
        orm_mode = True


class CitaUpdate(BaseModel):
    id_paciente: int
    id_medico: int
    fecha: date
    hora: time
    estado: EstadoCita
    id_hospital: int

class CitasMedico(BaseModel):
    id_cita: int
    id_paciente: int
    tipo_cita: str
    fecha: date
    hora: time
    estado: EstadoCita
    paciente_nombre: str
    paciente_apellido: str

    class Config:
        orm_mode = True