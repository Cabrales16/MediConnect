from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum

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
    CARDIOLOGIA = "Cardiología"
    PEDIATRIA = "Pediatría"
    TRAUMATOLOGIA = "Traumatología"
    NEUROLOGIA = "Neurología" 
    
class EstadoUsuario(str, Enum):
    ACTIVO = "Activo"
    INACTIVO = "Inactivo"
    PENDIENTE = "Pendiente"
    SUSPENDIDO = "Suspendido"



class UsuarioResponseGene(BaseModel):
    id_rol: int
    num_documento: str
    nombre: str
    apellido: str

    class Config:
        from_attributes = True


class PacienteAdmResponse(BaseModel):
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

    class Config:
        orm_mode = True
        
class MedicoResponseTar(BaseModel):
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
    especialidad:EspecialidadMedica
    calificacion: float

    class Config:
        orm_mode = True
        
class EstadoUsuarioResponse(BaseModel):
    Estado:EstadoUsuario

    class Config:
        from_attributes = True  
        
