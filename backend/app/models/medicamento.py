from app.db.base import Base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship

class Medicamento(Base):
    __tablename__ = 'Medicamento'

    id_medicamento = Column(Integer, primary_key=True, autoincrement=True)
    
    nombre = Column(String(100), nullable=False)
    presentacion = Column(String(100), nullable=False)
    unidad_medida = Column(String(50), nullable=False)

    medicaciones = relationship("Medicacion", back_populates="medicamento")