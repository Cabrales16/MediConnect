from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum
from typing import Optional

# ---------------- ENUMS ----------------
class TipoDocumentoEnum(str, Enum):
    CC = "CC"
    TI = "TI"
    PAS = "PAS"
    CE = "CE"
    RC = "RC"


class GeneroEnum(str, Enum):
    FEMENINO = "Femenino"
    MASCULINO = "Masculino"


class EspecialidadMedica(str, Enum):
    CARDIOLOGIA = "Cardiologia"
    PEDIATRIA = "Pediatria"
    TRAUMATOLOGIA = "Traumatologia"
    NEUROLOGIA = "Neurologia"


class EstadoUsuario(str, Enum):
    ACTIVO = "Activo"
    INACTIVO = "Inactivo"
    PENDIENTE = "Pendiente"
    SUSPENDIDO = "Suspendido"


# ---------------- MODELOS DE RESPUESTA ----------------
class UsuarioResponseGene(BaseModel):
    id_usuario: int
    id_rol: int
    num_documento: str
    nombre: str
    apellido: str

    class Config:
        from_attributes = True


class PacienteAdmResponse(BaseModel):
    id_usuario: int
    nombre: str
    apellido: str
    tipo_documento: TipoDocumentoEnum
    num_documento: str
    correo: EmailStr
    telefono: str
    genero: GeneroEnum
    direccion: str
    fecha_nacimiento: date
    fecha_registro: date
    id_rol: int

    class Config:
        orm_mode = True


class MedicoResponseTar(BaseModel):
    id_usuario: int
    fecha_registro: date
    nombre: str
    apellido: str
    tipo_documento: TipoDocumentoEnum
    num_documento: str
    correo: EmailStr
    telefono: str
    genero: GeneroEnum
    direccion: str
    fecha_nacimiento: date
    especialidad: EspecialidadMedica
    calificacion: Optional[float] = None  # ✅ PERMITE None
    id_rol: int

    class Config:
        orm_mode = True


class EstadoUsuarioResponse(BaseModel):
    estado: EstadoUsuario

    class Config:
        from_attributes = True

class CambiarRol(BaseModel):
    id_rol: int

    class Config:
        from_attributes = True

class CambiarDatosUsuario(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    correo: Optional[EmailStr] = None


    class Config:
        from_attributes = True