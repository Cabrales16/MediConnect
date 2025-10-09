from pydantic import BaseModel


class NovedadBase(BaseModel):
    id_novedad: int
    id_admin: int
    titulo: str
    descripcion: str
    src: str

    class Config:
        from_attributes = True


class NovedadCreate(BaseModel):
    id_admin: int
    titulo: str
    descripcion: str

class NovedadUpdateResponse(BaseModel):
    msg: str
    novedad: NovedadBase
