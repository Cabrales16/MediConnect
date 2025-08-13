from app.db.base import Base
from sqlalchemy import Column, Integer, Text, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship

class ErrorTecnico(Base):
    __tablename__ = "error_tecnico"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    mensaje = Column(Text, nullable=False)
    fecha = Column(TIMESTAMP, server_default=func.current_timestamp())

    # Relaciones
    usuario = relationship("Usuario", back_populates="errores_tecnicos" , foreign_keys=[id_usuario])

