from pydantic import BaseModel


class CrearTerapia(BaseModel):
    id_terapia: int
    id_admin: int
    nombre: str
    estado: str
    archivo: str

    class Config:
        from_attributes = True

