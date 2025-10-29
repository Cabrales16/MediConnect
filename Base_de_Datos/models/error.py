from db import Base
from sqlalchemy import Column, Integer, Text, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from models.AuditMixin import AuditMixin

class ErrorTecnico(Base, AuditMixin):
    __tablename__ = "Error_Tecnico"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    mensaje = Column(Text, nullable=False)
    fecha = Column(TIMESTAMP, server_default=func.current_timestamp())

    # Relaciones
    usuario = relationship("Usuario", back_populates="errores_tecnicos" , foreign_keys=[id_usuario])

