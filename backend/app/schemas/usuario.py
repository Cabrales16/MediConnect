from enum import Enum
from pydantic import BaseModel, EmailStr, validator
from datetime import date
import re

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

    @validator("contrasena")
    def validar_contrasena(cls, value):
        """
        Valida que la contraseña cumpla con:
        - Mínimo 8 caracteres
        - Al menos una mayúscula
        - Al menos una minúscula
        - Al menos un número
        - Al menos un caracter especial (@$!%*?&)
        """
        if len(value) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not re.search(r"[A-Z]", value):
            raise ValueError("La contraseña debe contener al menos una letra mayúscula.")
        if not re.search(r"[a-z]", value):
            raise ValueError("La contraseña debe contener al menos una letra minúscula.")
        if not re.search(r"[0-9]", value):
            raise ValueError("La contraseña debe contener al menos un número.")
        if not re.search(r"[@$!%*?&]", value):
            raise ValueError("La contraseña debe contener al menos un caracter especial (@$!%*?&).")
        return value

class UsuarioLogin(BaseModel):
    correo: EmailStr
    contrasena: str

class Token(BaseModel):
    access_token: str
    token_type: str
    rol: str
    id_usuario: int
    correo: str
    nombre: str

class ForgotPasswordRequest(BaseModel):
    correo: EmailStr

class ResetPasswordRequest(BaseModel):
    nueva_contrasena: str

    @validator("nueva_contrasena")
    def validar_nueva_contrasena(cls, value):
        if len(value) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not re.search(r"[A-Z]", value):
            raise ValueError("La contraseña debe contener al menos una letra mayúscula.")
        if not re.search(r"[a-z]", value):
            raise ValueError("La contraseña debe contener al menos una letra minúscula.")
        if not re.search(r"[0-9]", value):
            raise ValueError("La contraseña debe contener al menos un número.")
        if not re.search(r"[@$!%*?&]", value):
            raise ValueError("La contraseña debe contener al menos un caracter especial (@$!%*?&).")
        return value
