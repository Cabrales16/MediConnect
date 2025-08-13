from app.db.base import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Time, Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum


class EstadoCita(PyEnum):
    PROGRAMADA = "Programada"
    CANCELADA = "Cancelada"
    COMPLETADA = "Completada"
    PENDIENTE = "Pendiente"


class Cita(Base):
    __tablename__ = "Cita"
    id_cita = Column(Integer, primary_key=True, autoincrement=True)
    id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"))
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"))
    id_medicacion = Column(Integer, ForeignKey("Medicacion.id_medicacion"))
    # id_indicacion = Column(Integer, ForeignKey("Indicaciones.id_indicacion"))
    id_hospital = Column(Integer, ForeignKey("Hospital.id_hospital"))
    id_info = Column(Integer, ForeignKey("Tipo_Novedad.id_info"))
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    tipo_cita = Column(String(100), nullable=False)
    estado = Column(SqlEnum(EstadoCita), nullable=False)
    ubicacion = Column(String(100), nullable=False)
    

    # Relaciones
    paciente = relationship("Usuario", back_populates="citas_paciente", foreign_keys=[id_paciente]) 
    medico = relationship("Usuario", back_populates="citas_medico", foreign_keys=[id_medico])
    medicacion_rel = relationship("Medicacion", back_populates="citas", foreign_keys=[id_medicacion])
    indicacion_rel = relationship("Indicaciones", back_populates="citas")
    hospital = relationship("Hospital", back_populates="citas", foreign_keys=[id_hospital])
    tipo_novedad = relationship("TipoNovedad", back_populates="novedad", foreign_keys=[id_info])

    # Despues del "relationship", va el nombre de la clase