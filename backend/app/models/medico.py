from app.db.base import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum as SqlEnum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from datetime import date



class EspecialidadMedica(PyEnum):
    CARDIOLOGIA = "Cardiología"
    PEDIATRIA = "Pediatría"
    TRAUMATOLOGIA = "Traumatología"
    NEUROLOGIA = "Neurología" 
    # ... otros omitidos por brevedad

# Modelo Medico
class Medico(Base):
    __tablename__ = "medico"

    id  = Column(Integer, primary_key=True, autoincrement=True)
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"))
    especialidad = Column(SqlEnum(EspecialidadMedica), nullable=True)
    estudios = Column(String(100), nullable=True)
    calificacion = Column(Float, nullable=True)

    medico = relationship("Usuario", back_populates="medicos")


