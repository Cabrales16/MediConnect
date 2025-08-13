from app.db.base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class TipoNovedad(Base):
    __tablename__ = "Tipo_Novedad"
    id_info = Column(Integer, primary_key=True, autoincrement=True)
    descripcion = Column(String(60), nullable=False, unique=True)

    # Relación con Familiar
    novedades_familiar = relationship("Familiar", back_populates="tipo_novedad")
    novedad = relationship("Cita", back_populates="tipo_novedad")