from app.db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from .AuditMixin import AuditMixin


class Info_Novedad(Base, AuditMixin):
    __tablename__ = "info_Novedad"
    id_info = Column(Integer, primary_key=True, autoincrement=True)
    id_admin = Column(Integer, ForeignKey("Usuario.id_usuario"))
    id_novedad = Column(Integer, ForeignKey("Novedad.id_novedad"))
    titulo = Column(String(60), nullable=False)
    descripcion = Column(Text, nullable=False)
    src = Column(String(200), nullable=False)
    

    # Relaciones
    admin = relationship("Usuario", back_populates="info_novedades")
    novedad = relationship("Novedad", back_populates="info_novedades")

    # Despues del "relationship", va el nombre de la clase

