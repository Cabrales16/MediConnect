from pydantic import BaseModel

class MedicacionBase(BaseModel):
    nombre: str
    dosis: str
    frecuencia: str

    class Config:
        from_attributes = True