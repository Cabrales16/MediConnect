from app.db.database import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum as SqlEnum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from datetime import date
from .AuditMixin import AuditMixin



class EspecialidadMedica(PyEnum):
    CARDIOLOGIA = "Cardiología"
    PEDIATRIA = "Pediatría"
    TRAUMATOLOGIA = "Traumatología"
    NEUROLOGIA = "Neurología" 
    # ... otros omitidos por brevedad

# Modelo Medico
class Medico(Base, AuditMixin):
    __tablename__ = "medico"

    id  = Column(Integer, primary_key=True, autoincrement=True)
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"))
    especialidad = Column(SqlEnum(EspecialidadMedica), nullable=True)
    estudios = Column(String(100), nullable=True)
    calificacion = Column(Float, nullable=True)
    id_hospital = Column(Integer, ForeignKey("Hospital.id_hospital"), nullable=True)

    medico = relationship("Usuario", back_populates="medicos")
    hospital = relationship("Hospital", back_populates="medicos")
    citas = relationship("Cita", back_populates="medico")

