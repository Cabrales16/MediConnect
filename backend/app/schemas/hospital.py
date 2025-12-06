from enum import Enum
from pydantic import BaseModel, EmailStr

class HospitalBase(BaseModel):
    id_hospital: int
    nombre: str