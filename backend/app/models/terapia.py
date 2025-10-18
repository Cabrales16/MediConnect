from app.db.database import Base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey , Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from .AuditMixin import AuditMixin

class EstadoTerapia(PyEnum):
    ACTIVA = "Activa"
    FINALIZADA = "Finalizada"
    CANCELADA = "Cancelada"

class Terapia(Base, AuditMixin):
    __tablename__ = "Terapia"
    id_terapia = Column(Integer, primary_key=True, autoincrement=True)
    id_CrearTerapia = Column(Integer, ForeignKey("CrearTerapia.id_terapia"), nullable=False)
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    estado = Column(SqlEnum(EstadoTerapia), nullable=False)
    inicio = Column(Date, nullable=False)
    fin = Column(Date, nullable=False)


    # Relaciones
    medico = relationship("Usuario", back_populates="medico_terapia", foreign_keys=[id_medico])
    paciente = relationship("Usuario", back_populates="paciente_terapia" , foreign_keys=[id_paciente])
    archivo = relationship("CrearTerapia", back_populates="terapia", foreign_keys=[id_CrearTerapia])
    
