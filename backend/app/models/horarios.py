from app.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Time
from sqlalchemy.orm import relationship


class Horario(Base):
    __tablename__ = "Horario"
    id_horario = Column(Integer, primary_key=True, autoincrement=True)
    id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    dia = Column(String(20), nullable=False)  # Días como "Lunes", "Martes"
    hora_inicio = Column(Time, nullable=False)  # Hora de inicio del turno
    hora_fin = Column(Time, nullable=False)  # Hora de finalización del turno

    # Relación con Usuario (médico)
    medico = relationship("Usuario", back_populates="horarios")
