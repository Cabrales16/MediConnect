from app.db.base import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Time, Enum as SqlEnum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum

class EstadoHospital(PyEnum):
    MANTENIMIENTO = "Mantenimiento"
    CERRADO = "Cerrado"
    ABIERTO = "Abierto"

class Hospital(Base):
    __tablename__ = "Hospital"
    id_hospital = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(60), nullable=False)
    direccion = Column(String(60), nullable=False)
    estado = Column(SqlEnum(EstadoHospital), nullable=False)
    
    citas = relationship("Cita", back_populates="hospital")
