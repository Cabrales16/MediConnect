from pydantic import BaseModel

class MedicamentoBase(BaseModel):
    id_medicamento: int
    nombre: str
    presentacion: str

    class Config:
        from_attributes = True
