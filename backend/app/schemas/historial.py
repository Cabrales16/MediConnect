from pydantic import BaseModel
from datetime import date, time as Time

class PacienteResponse(BaseModel):
    nombre: str
    apellido: str

    class Config:
        from_attributes = True


class HistorialResponse(BaseModel):
    id_cita: int
    fecha: date
    hora: Time
    nombre_paciente: str
    apellido_paciente: str
    nombre_medico: str
    apellido_medico: str
    especialidad_medico: str
    estado_cita: str

    class Config:
        orm_mode = True