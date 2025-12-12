from app.db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, func, Time, Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from .AuditMixin import AuditMixin



class EstadoCita(PyEnum):
    PROGRAMADA = "Programada"
    CANCELADA = "Cancelada"
    COMPLETADA = "Completada"
    PENDIENTE = "Pendiente"

class Cita(Base, AuditMixin):
    __tablename__ = "cita"

    id_cita = Column(Integer, primary_key=True, autoincrement=True)
    id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    id_medico = Column(Integer, ForeignKey("Medico.id_medico"), nullable=False)   # << apunta a Medico
    id_medicacion = Column(Integer, ForeignKey("Medicacion.id_medicacion"), nullable=True)
    id_hospital = Column(Integer, ForeignKey("Hospital.id_hospital"), nullable=True)
    id_info = Column(Integer, ForeignKey("Tipo_Novedad.id_info"), nullable=True)
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    estado = Column(SqlEnum(EstadoCita), nullable=False)
    observaciones = Column(String(255), nullable=True)
    fecha_registro = Column(Date, default=func.current_date(), nullable=False)

    # Relaciones
    paciente = relationship("Usuario", back_populates="citas_paciente", foreign_keys=[id_paciente])
    medico = relationship("Medico", back_populates="citas")   # << ahora con Medico
    medicacion_rel = relationship("Medicacion", back_populates="citas", foreign_keys=[id_medicacion])
    indicacion_rel = relationship("Indicaciones", back_populates="citas")
    hospital = relationship("Hospital", back_populates="citas", foreign_keys=[id_hospital])
    tipo_novedad = relationship("TipoNovedad", back_populates="citas", foreign_keys=[id_info])


    # Despues del "relationship", va el nombre de la clase