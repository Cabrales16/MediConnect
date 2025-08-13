from app.db.base import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum as SqlEnum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from datetime import date

# Enumeradores
class TipoDocumento(PyEnum):
    CC = "CC"
    TI = "TI"
    PAS = "PAS"
    CE = "CE"
    RC = "RC"

class EstadoUsuario(PyEnum):
    ACTIVO = "Activo"
    INACTIVO = "Inactivo"
    PENDIENTE = "Pendiente"
    SUSPENDIDO = "Suspendido"

class Genero(PyEnum):
    FEMENINO = "Femenino"
    MASCULINO = "Masculino"

class EspecialidadMedica(PyEnum):
    CARDIOLOGIA = "Cardiología"
    PEDIATRIA = "Pediatría"
    TRAUMATOLOGIA = "Traumatología"
    NEUROLOGIA = "Neurología" 
    # ... otros omitidos por brevedad

# Modelo Usuario
class Usuario(Base):
    __tablename__ = "Usuario"

    # Campos
    id_usuario = Column(Integer, primary_key=True, autoincrement=True)
    id_rol = Column(Integer, ForeignKey("Rol.id_rol"))
    nombre = Column(String(60), nullable=False)
    apellido = Column(String(60), nullable=False)
    tipo_documento = Column(SqlEnum(TipoDocumento), nullable=False)
    num_documento = Column(String(60), nullable=False, unique=True, index=True)
    correo = Column(String(100), nullable=False, unique=True, index=True)
    telefono = Column(String(60), nullable=False)
    genero = Column(SqlEnum(Genero), nullable=False)
    direccion = Column(String(100), nullable=False)
    contrasena = Column(String(255), nullable=False)
    fecha_registro = Column(Date, default=func.current_date(), nullable=False)
    estado = Column(SqlEnum(EstadoUsuario), nullable=True)
    fecha_nacimiento = Column(Date, nullable=False)
    especialidad = Column(SqlEnum(EspecialidadMedica), nullable=True)
    estudios = Column(String(100), nullable=True)
    calificacion = Column(Float, nullable=True)
    

    # Relaciones
    rol = relationship("Rol", back_populates="usuarios")
    familiares = relationship("Familiar", back_populates="paciente")
    citas_paciente = relationship("Cita", back_populates="paciente", foreign_keys="[Cita.id_paciente]")
    citas_medico = relationship("Cita", back_populates="medico", foreign_keys="[Cita.id_medico]")
    indicacion_paciente = relationship("Indicaciones", back_populates="paciente", foreign_keys="[Indicaciones.id_paciente]")
    indicacion_medica = relationship("Indicaciones", back_populates="medico", foreign_keys="[Indicaciones.id_medico]")
    medicamento_paciente = relationship("Medicacion", back_populates="paciente", foreign_keys="[Medicacion.id_paciente]")
    medicamento_medico = relationship("Medicacion", back_populates="medico", foreign_keys="[Medicacion.id_medico]")
    horarios = relationship("Horario", back_populates="medico")
    errores_tecnicos = relationship("ErrorTecnico", back_populates="usuario")
