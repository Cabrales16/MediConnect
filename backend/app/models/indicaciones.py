from app.db.database import Base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from .AuditMixin import AuditMixin


class EstadoIndicacion(PyEnum):
    PROGRAMADA = "Programada"
    CANCELADA = "Cancelada"
    COMPLETADA = "Completada"


class Indicaciones(Base, AuditMixin):
    __tablename__ = "indicaciones"
    id_indicacion = Column(Integer, primary_key=True, autoincrement=True)
    id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    id_cita = Column(Integer, ForeignKey("Cita.id_cita"), nullable=True)
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    estado = Column(SqlEnum(EstadoIndicacion), nullable=False)
    observaciones = Column(String(200), nullable=False)
    

    # Relaciones con Usuario
    paciente = relationship("Usuario", back_populates="indicacion_paciente", foreign_keys=[id_paciente])
    medico = relationship("Usuario", back_populates="indicacion_medica", foreign_keys=[id_medico])

    # Relación con Cita
    citas = relationship("Cita", back_populates="indicacion_rel")
