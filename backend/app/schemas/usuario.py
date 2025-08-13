from enum import Enum
from pydantic import BaseModel, EmailStr
from datetime import date

class TipoDocumentoEnum(str, Enum):
    CC = "CC"
    TI = "TI"
    PAS = "PAS"
    CE = "CE"
    RC = "RC"

class GeneroEnum(str, Enum):
    FEMENINO = "Femenino"
    MASCULINO = "Masculino"

class UsuarioBase(BaseModel):
    nombre: str
    apellido: str
    tipo_documento: TipoDocumentoEnum
    num_documento: str
    correo: EmailStr
    telefono: str
    genero: GeneroEnum
    direccion: str
    fecha_nacimiento: date

class UsuarioCreate(UsuarioBase):
    contrasena: str

class UsuarioLogin(BaseModel):
    correo: EmailStr
    contrasena: str

class Token(BaseModel):
    access_token: str
    token_type: str
