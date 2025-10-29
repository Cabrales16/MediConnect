# app/models/planilla.py
from sqlalchemy import Column, Integer, String, Date, Time
from app.db.database import Base

class VistaPlanilla(Base):
    __tablename__ = "vista_planilla"

    id_cita = Column(Integer, primary_key=True)  # Cada fila necesita un PK
    fecha = Column(Date)
    hora = Column(Time)
    especialidad_medico = Column(String(100))
    estado_cita = Column(String(50))
    ubicacion = Column(String(255))

    id_paciente = Column(Integer)
    nombre_paciente = Column(String(100))
    apellido_paciente = Column(String(100))
    correo_paciente = Column(String(100))

    id_medico = Column(Integer)
    nombre_medico = Column(String(100))
    apellido_medico = Column(String(100))
    especialidad_medico = Column(String(100))
    calificacion_medico = Column(Integer)
