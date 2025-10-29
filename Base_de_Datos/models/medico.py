from db import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum as SqlEnum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from datetime import date
from models.AuditMixin import AuditMixin


class EspecialidadMedica(PyEnum):
    CARDIOLOGIA = "Cardiologia"
    PEDIATRIA = "Pediatria"
    TRAUMATOLOGIA = "Traumatologia"
    NEUROLOGIA = "Neurologia"


class Medico(Base, AuditMixin):
    __tablename__ = "Medico"

    # Usamos el mismo id que el usuario
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"), primary_key=True)
    especialidad = Column(SqlEnum(EspecialidadMedica), nullable=True)
    estudios = Column(String(100), nullable=True)
    calificacion = Column(Float, nullable=True)
    id_hospital = Column(Integer, ForeignKey("Hospital.id_hospital"), nullable=True)

    # Relaciones
    usuario  = relationship("Usuario", back_populates="medicos", uselist=False)
    hospital = relationship("Hospital", back_populates="medicos")
    citas = relationship("Cita", back_populates="medico")

