from app.db.database import Base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey , Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from .AuditMixin import AuditMixin

class EstadoTerapia(PyEnum):
    ACTIVA = "Activa"
    FINALIZADA = "Finalizada"
    CANCELADA = "Cancelada"

class CrearTerapia(Base, AuditMixin):
    __tablename__ = "CrearTerapia"
    id_terapia = Column(Integer, primary_key=True, autoincrement=True)
    id_admin = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    nombre = Column(String(100), nullable=False)
    estado = Column(SqlEnum(EstadoTerapia), nullable=False)
    archivo = Column(String(200), nullable=False)

    # Relaciones
    adminT = relationship("Usuario", back_populates="terapias")
    terapia = relationship("Terapia", back_populates="archivo")
