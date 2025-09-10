from enum import Enum
from pydantic import BaseModel, EmailStr
from datetime import time, date



class HorarioBase(BaseModel):
    dia: str 
    hora_inicio: time
    hora_fin: time



class HorarioResponse(HorarioBase):
    id_medico: int

    class Config:
        from_attributes = True


class HorarioUpdate(BaseModel):
    dia: str
    hora_inicio: time
    hora_fin: time

