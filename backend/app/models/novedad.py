from app.db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .AuditMixin import AuditMixin


class Novedad(Base, AuditMixin):
    __tablename__ = "novedad"
    id_novedad = Column(Integer, primary_key=True, autoincrement=True)
    id_admin = Column(Integer, ForeignKey("Usuario.id_usuario"))
    titulo = Column(String(60), nullable=False)
    descripcion = Column(String(200), nullable=False)
    src = Column(String(200), nullable=False)
    

    # Relaciones
    admin = relationship("Usuario", back_populates="novedades")
  
    # Despues del "relationship", va el nombre de la clase