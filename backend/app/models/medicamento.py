from app.db.database import Base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from .AuditMixin import AuditMixin

class Medicamento(Base, AuditMixin):
    __tablename__ = 'Medicamento'

    id_medicamento = Column(Integer, primary_key=True, autoincrement=True)
    
    nombre = Column(String(100), nullable=False)
    presentacion = Column(String(100), nullable=False)
    unidad_medida = Column(String(50), nullable=False)
    id_admin = Column(Integer, ForeignKey("Usuario.id_usuario"))

    medicaciones = relationship("Medicacion", back_populates="medicamento")
    admin = relationship("Usuario", back_populates="medicamentos")