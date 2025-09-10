from pydantic import BaseModel, Field, EmailStr, field_validator, model_validator
from typing import Optional
from datetime import date
from enum import Enum
import re

# === Definición del Enum para Genero ===
class Genero(str, Enum):
    FEMENINO = "Femenino"
    MASCULINO = "Masculino"

# === Definición del Enum para EstadoUsuario ===
class EstadoUsuario(str, Enum):
    ACTIVO = "Activo"
    INACTIVO = "Inactivo"
    PENDIENTE = "Pendiente"
    SUSPENDIDO = "Suspendido"

# === Definición del Enum para TipoDocumento ===
class TipoDocumento(str, Enum):
    CC = "CC"
    TI = "TI"
    PAS = "PAS"

# === Ejemplo Base para Usuarios ===
EXAMPLE_USUARIO = {
    "nombre": "Juan",
    "apellido": "Pérez",
    "tipo_documento": "CC",
    "num_documento": "123456789",
    "correo": "juan@example.com",
    "telefono": "3001234567",
    "genero": "Masculino",
    "direccion": "Calle 123",
    "estado": "Activo",
    "fecha_nacimiento": "1990-01-01",
    "fecha_registro": "2023-01-01",
}

# === Esquema base del Usuario ===
class UsuarioBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    apellido: str = Field(..., min_length=2, max_length=50)
    tipo_documento: TipoDocumento
    num_documento: str = Field(..., min_length=5, max_length=20)
    correo: EmailStr
    telefono: str = Field(..., pattern=r"^[0-9]{7,15}$")
    genero: Genero
    direccion: str = Field(..., min_length=5, max_length=100)
    estado: EstadoUsuario
    fecha_nacimiento: date
    fecha_registro: date

# === Para crear usuarios ===
class UsuarioCreate(UsuarioBase):
    contrasena: str = Field(..., min_length=8)

    @field_validator("contrasena")
    @classmethod
    def validar_contrasena(cls, v):
        if len(v) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not re.search(r'[A-Za-z]', v):
            raise ValueError("La contraseña debe contener al menos una letra.")
        if not re.search(r'\d', v):
            raise ValueError("La contraseña debe contener al menos un número.")
        return v

    class Config:
        json_schema_extra = {
            "example": {**EXAMPLE_USUARIO, "contrasena": "Password123"}
        }

# === Para leer usuarios ===
class UsuarioRead(UsuarioBase):
    rol_id: int = Field(..., ge=1, le=3, description="1: Paciente, 2: Médico, 3: Administrador")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id_usuario": 1,
                "nombre": "Juan",
                "apellido": "Pérez",
                "tipo_documento": "CC",
                "num_documento": "123456789",
                "correo": "juan@example.com",
                "telefono": "3001234567",
                "genero": "Masculino",
                "direccion": "Calle 123",
                "estado": "Activo",
                "fecha_nacimiento": "1990-01-01",
                "fecha_registro": "2023-01-01",
                "rol_id": 1,
            }
        }

# === Esquema para actualizar usuarios ===
class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=50)
    apellido: Optional[str] = Field(None, min_length=2, max_length=50)
    telefono: Optional[str] = Field(None, pattern=r"^[0-9]{7,15}$")
    direccion: Optional[str] = Field(None, min_length=5, max_length=100)
    estado: Optional[str] = None  # Asegúrate de que el tipo coincida con tus enums o campo.

    @model_validator(mode="after")
    def validar_campos(cls, values):
        if not any(values.values()):
            raise ValueError("Debe proporcionar al menos un campo para actualizar.")
        return values

    class Config:
        json_schema_extra = {
            "example": {
                "nombre": "Juan Carlos",
                "telefono": "3109876543",
                "estado": "Inactivo"
            }
        }