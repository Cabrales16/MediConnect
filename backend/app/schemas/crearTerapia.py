from pydantic import BaseModel


class CrearTerapia(BaseModel):
    id_admin: int
    estado: str
    archivo: str

    class Config:
        from_attributes = True