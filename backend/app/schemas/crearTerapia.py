from pydantic import BaseModel
from datetime import date


class CrearTerapia(BaseModel):
    id_terapia: int
    id_admin: int
    nombre: str
    estado: str
    archivo: str

    class Config:
        from_attributes = True

class AsignarTerapiaBase(BaseModel):
    id_CrearTerapia: int
    id_medico: int
    id_paciente: int
    inicio: date
    fin: date

class AsignarTerapiaResponse(AsignarTerapiaBase):
    id_terapia: int
    nombre: str
    estado: str
    pdf: str | None = None

    class Config:
        orm_mode = True

class CrearTerapiaBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    archivo: str | None = None  # ruta del PDF

    class Config:
        from_attributes = True


class CrearTerapiaResponse(CrearTerapiaBase):
    id_terapia: int

    class Config:
        from_attributes = True

class TerapiaResponse(BaseModel):
    id_terapia: int
    nombre: str
    pdf: str | None
    estado: str
    inicio: date | None
    fin: date | None
    nombre_medico: str

    class Config:
        from_attributes = True