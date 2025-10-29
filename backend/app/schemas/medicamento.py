from pydantic import BaseModel

class MedicamentoBase(BaseModel):
    nombre: str
    presentacion: str
    unidad_medida: str

    class Config:
        from_attributes = True

class EditarMedicamento(MedicamentoBase):
    pass


class MedicamentoResponse(MedicamentoBase):
    id_medicamento: int