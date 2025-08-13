from app.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Familiar(Base):
    __tablename__ = "Familiar"
    id_familiar = Column(Integer, primary_key=True, autoincrement=True)
    id_info = Column(Integer, ForeignKey("Tipo_Novedad.id_info"))
    id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"))
    nombre = Column(String(60), nullable=False)
    correo = Column(String(100), nullable=False)
    

    # Relaciones
    tipo_novedad = relationship("TipoNovedad", back_populates="novedades_familiar" , foreign_keys=[id_info])
    paciente = relationship("Usuario", back_populates="familiares")

    # Despues del "relationship", va el nombre de la clase