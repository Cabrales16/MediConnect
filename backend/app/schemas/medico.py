from enum import Enum
from pydantic import BaseModel

class EspecialidadEnum(str, Enum):
    CARDIOLOGIA = "Cardiologia"
    DERMATOLOGIA = "Dermatologia"
    PEDIATRIA = "Pediatria"
    ORTOPEDIA = "Ortopedia"
    GINECOLOGIA = "Ginecologia"
    NEUROLOGIA = "Neurologia"
    PSIQUIATRIA = "Psiquiatria"
    OFTALMOLOGIA = "Oftalmologia"
    OTORRINOLARINGOLOGIA = "Otorrinolaringologia"
    RADIOLOGIA = "Radiologia"

class MedicoBase(BaseModel):
    especialidad: EspecialidadEnum
    estudios: str
    id_hospital: int
