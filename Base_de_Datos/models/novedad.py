from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.AuditMixin import AuditMixin


class Novedad(Base, AuditMixin):
    __tablename__ = "Novedad"
    id_novedad = Column(Integer, primary_key=True, autoincrement=True)
    id_admin = Column(Integer, ForeignKey("Usuario.id_usuario"))
    titulo = Column(String(60), nullable=False)
    descripcion = Column(String(200), nullable=False)
    src = Column(String(20), nullable=False)
    

    # Relaciones
    admin = relationship("Usuario", back_populates="novedades")
  
    
    # Despues del "relationship", va el nombre de la clase