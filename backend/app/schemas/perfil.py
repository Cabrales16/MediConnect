from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum

class TipoDocumentoEnum(str, Enum):
    CC = "CC"
    TI = "TI"
    PAS = "PAS"
    CE = "CE"
    RC = "RC"

class UsuarioResponse(BaseModel):
    nombre: str
    apellido: str
    tipo_documento: TipoDocumentoEnum
    num_documento: str
    telefono: str
    direccion: str
    correo: EmailStr
    fecha_registro: date

    class Config:
        orm_mode = True
        
class UsuarioEdid(BaseModel):
    tipo_documento: TipoDocumentoEnum
    telefono: str
    direccion: str
    correo: EmailStr

        
