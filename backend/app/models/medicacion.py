from app.db.base import Base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum

class EstadoMedicacion(PyEnum):
    PENDIENTE = "Pendiente"
    ACTIVA = "En curso"
    COMPLETADA = "Completada"
    CANCELADA = "Cancelada"


class Medicacion(Base):
    __tablename__ = "Medicacion"

    id_medicacion = Column(Integer, primary_key=True, autoincrement=True)
    id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    id_medicamento = Column(Integer, ForeignKey("Medicamento.id_medicamento"), nullable=False)  # Corregido el nombre de tabla y columna
    estado = Column(SqlEnum(EstadoMedicacion), nullable=False, default=EstadoMedicacion.PENDIENTE)
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    
    dosis = Column(String(250), nullable=False)
    
    # Relaciones
    paciente = relationship("Usuario", back_populates="medicamento_paciente", foreign_keys=[id_paciente])
    medico = relationship("Usuario", back_populates="medicamento_medico", foreign_keys=[id_medico])
    citas = relationship("Cita", back_populates="medicacion_rel", cascade="all, delete-orphan")
    medicamento = relationship("Medicamento", back_populates="medicaciones", foreign_keys=[id_medicamento])
