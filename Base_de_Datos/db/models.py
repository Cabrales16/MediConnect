# from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Time, Enum as SqlEnum, Float
# from sqlalchemy.orm import relationship
# from .database import Base
# from enum import Enum as PyEnum
# from datetime import date
# from sqlalchemy.sql import func

# # === Enums ===
# class TipoDocumento(PyEnum):
#     CC = "CC"
#     TI = "TI"
#     PAS = "PAS"

# class EstadoUsuario(PyEnum):
#     ACTIVO = "Activo"
#     INACTIVO = "Inactivo"
#     PENDIENTE = "Pendiente"
#     SUSPENDIDO = "Suspendido"

# class Genero(PyEnum):
#     FEMENINO = "Femenino"
#     MASCULINO = "Masculino"

# class EspecialidadMedica(PyEnum):
#     CARDIOLOGIA = "Cardiología"
#     DERMATOLOGIA = "Dermatología"
#     ENDOCRINOLOGIA = "Endocrinología"
#     GASTROENTEROLOGIA = "Gastroenterología"
#     GERIATRIA = "Geriatría"
#     GINECOLOGIA = "Ginecología"
#     HEMATOLOGIA = "Hematología"
#     INFECTOLOGIA = "Infectología"
#     NEFROLOGIA = "Nefrología"
#     NEUROLOGIA = "Neurología"
#     ONCOLOGIA = "Oncología"
#     OFTALMOLOGIA = "Oftalmología"
#     OTORRINO = "Otorrinolaringología"
#     PEDIATRIA = "Pediatría"
#     PSIQUIATRIA = "Psiquiatría"
#     REUMATOLOGIA = "Reumatología"
#     TRAUMATOLOGIA = "Traumatología"
#     UROLOGIA = "Urología"
#     CIRUGIA_GENERAL = "Cirugía General"
#     MEDICINA_INTERNA = "Medicina Interna"
#     ANESTESIOLOGIA = "Anestesiología"
#     RADIOLOGIA = "Radiología"
#     MEDICINA_FAMILIAR = "Medicina Familiar"
#     MEDICINA_DEPORTE = "Medicina del Deporte"
#     PATOLOGIA = "Patología"
#     NEUMOLOGIA = "Neumología"
#     CIRUGIA_CARDIOTORACICA = "Cirugía Cardiotorácica"
#     CIRUGIA_PLASTICA = "Cirugía Plástica"
#     ORTOPEDIA = "Ortopedia"
#     NEUROCIRUGIA = "Neurocirugía"

# class EstadoCita(PyEnum):
#     PROGRAMADA = "Programada"
#     CANCELADA = "Cancelada"
#     COMPLETADA = "Completada"
#     PENDIENTE = "Pendiente"

# class EstadoIndicacion(PyEnum):
#     PROGRAMADA = "Programada"
#     CANCELADA = "Cancelada"
#     COMPLETADA = "Completada"

# class EstadoMedicacion(PyEnum):
#     ACTIVA = "Activa"
#     TERMINADA = "Terminada"
#     SUSPENDIDA = "Suspendida"

# # === Modelo Usuario ===
# class Usuario(Base):
#     __tablename__ = "Usuario"
#     id_usuario = Column(Integer, primary_key=True, autoincrement=True)
#     nombre = Column(String(60), nullable=False)
#     apellido = Column(String(60), nullable=False)
#     tipo_documento = Column(SqlEnum(TipoDocumento), nullable=False)
#     num_documento = Column(String(60), nullable=False)
#     correo = Column(String(100), nullable=False)
#     telefono = Column(String(60), nullable=False)
#     genero = Column(SqlEnum(Genero), nullable=False)
#     direccion = Column(String(100), nullable=False)
#     contrasena = Column(String(255), nullable=False)  # Encriptada
#     fecha_registro = Column(Date, default=func.current_date(), nullable=False)  # Fecha actual por defecto
#     estado = Column(SqlEnum(EstadoUsuario), nullable=True)
#     fecha_nacimiento = Column(Date, nullable=False)
#     especialidad = Column(SqlEnum(EspecialidadMedica), nullable=True)
#     estudios = Column(String(100), nullable=True)
#     calificacion = Column(Float, nullable=True)
#     rol_id = Column(Integer, ForeignKey("Rol.id_rol"))

#     # Relaciones con otras tablas
#     citas_paciente = relationship("Cita", back_populates="paciente", foreign_keys="[Cita.id_paciente]")
#     citas_medico = relationship("Cita", back_populates="medico", foreign_keys="[Cita.id_medico]")
#     familiares = relationship("Familiar", back_populates="paciente")
#     rol = relationship("Rol", back_populates="usuarios")

#     # Relaciones para Indicaciones
#     indicacion_paciente = relationship("Indicaciones", back_populates="paciente", foreign_keys="[Indicaciones.id_paciente]")
#     indicacion_medica = relationship("Indicaciones", back_populates="medico", foreign_keys="[Indicaciones.id_medico]")

#     # Relaciones para Medicación
#     medicamento_paciente = relationship("Medicacion", back_populates="paciente", foreign_keys="[Medicacion.id_paciente]")
#     medicamento_medico = relationship("Medicacion", back_populates="medico", foreign_keys="[Medicacion.id_medico]")
#     #Horario
#         # Relación con el modelo Usuario
#     horarios = relationship("Horario", back_populates="medico")

#     @property
#     def rol_nombre(self):
#         roles = {1: "Paciente", 2: "Médico", 3: "Administrador"}
#         return roles.get(self.rol_id, "Rol no válido")

# # === Modelo Cita ===
# class Cita(Base):
#     __tablename__ = "Cita"
#     id_cita = Column(Integer, primary_key=True, autoincrement=True)
#     id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"))
#     id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"))
#     fecha = Column(Date, nullable=False)
#     hora = Column(Time, nullable=False)
#     tipo_cita = Column(String(100), nullable=False)
#     estado = Column(SqlEnum(EstadoCita), nullable=False)
#     ubicacion = Column(String(100), nullable=False)
#     id_Medicacion = Column(Integer, ForeignKey("Medicacion.id_Medicacion"))
#     id_Indicacion = Column(Integer, ForeignKey("Indicaciones.id_Indicacion"))

#     # Relaciones
#     paciente = relationship("Usuario", back_populates="citas_paciente", foreign_keys=[id_paciente])
#     medico = relationship("Usuario", back_populates="citas_medico", foreign_keys=[id_medico])
#     medicacion_rel = relationship("Medicacion", back_populates="citas", foreign_keys=[id_Medicacion])
#     indicacion_rel = relationship("Indicaciones", back_populates="citas", foreign_keys=[id_Indicacion])

# # === Modelo Tipo_Informacion_de_envio_de_los_Familiares ===
# class Tipo_Informacion_de_envio_de_los_Familiares(Base):
#     __tablename__ = "Tipo_Informacion_de_envio_de_los_Familiares"
#     id_Info = Column(Integer, primary_key=True, autoincrement=True)
#     descripcion = Column(String(60), nullable=False) 

#     tipo_info_que_recibira = relationship("Familiar", back_populates="tipo_info_recibida_familiares")

# # === Modelo Familiar ===
# class Familiar(Base):
#     __tablename__ = "Familiar"
#     id_familiar = Column(Integer, primary_key=True, autoincrement=True)
#     nombre = Column(String(60), nullable=False)
#     correo = Column(String(100), nullable=False)
#     tipo_info_recibida = Column(Integer, ForeignKey("Tipo_Informacion_de_envio_de_los_Familiares.id_Info"))
#     id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"))

#     tipo_info_recibida_familiares = relationship("Tipo_Informacion_de_envio_de_los_Familiares", back_populates="tipo_info_que_recibira", foreign_keys=[tipo_info_recibida])
#     paciente = relationship("Usuario", back_populates="familiares")

# # === Modelo Rol ===
# class Rol(Base):
#     __tablename__ = "Rol"
#     id_rol = Column(Integer, primary_key=True)
#     nombre_rol = Column(String(60), nullable=False)
#     usuarios = relationship("Usuario", back_populates="rol")

#     def obtener_usuarios(self):
#         return [{"id": usuario.id_usuario, "nombre": usuario.nombre} for usuario in self.usuarios]

# # === Modelo Indicaciones ===
# class Indicaciones(Base):
#     __tablename__ = "Indicaciones"
#     id_Indicacion = Column(Integer, primary_key=True, autoincrement=True)
#     id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"))
#     id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"))
#     fecha = Column(Date, nullable=False)
#     hora = Column(Time, nullable=False)
#     estado = Column(SqlEnum(EstadoIndicacion), nullable=False)
#     observaciones = Column(String(200), nullable=False)

#     paciente = relationship("Usuario", back_populates="indicacion_paciente", foreign_keys=[id_paciente])
#     medico = relationship("Usuario", back_populates="indicacion_medica", foreign_keys=[id_medico])
#     citas = relationship("Cita", back_populates="indicacion_rel")

# # === Modelo Medicacion ===
# class Medicacion(Base):
#     __tablename__ = "Medicacion"
#     id_Medicacion = Column(Integer, primary_key=True, autoincrement=True)
#     id_paciente = Column(Integer, ForeignKey("Usuario.id_usuario"))
#     id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"))
#     fecha = Column(Date, nullable=False)
#     hora = Column(Time, nullable=False)
#     estado = Column(SqlEnum(EstadoMedicacion), nullable=False)
#     id_Medicamento = Column(Integer, ForeignKey("Medicamento.id_Medicamento"))
#     dosis = Column(String(250), nullable=False)

#     # Relaciones
#     paciente = relationship("Usuario", back_populates="medicamento_paciente", foreign_keys=[id_paciente])
#     medico = relationship("Usuario", back_populates="medicamento_medico", foreign_keys=[id_medico])
#     citas = relationship("Cita", back_populates="medicacion_rel")
#     medicamento = relationship("Medicamento", back_populates="medicaciones")

# # === Modelo Medicamento ===
# class Medicamento(Base):
#     __tablename__ = "Medicamento"
#     id_Medicamento = Column(Integer, primary_key=True, autoincrement=True)
#     nombre = Column(String(60), nullable=False)
#     presentacion = Column(String(60), nullable=False)
#     unidad_medida = Column(String(60), nullable=False)
#     medicaciones = relationship("Medicacion", back_populates="medicamento")




# # === Modelo Horario ===
# class Horario(Base):
#     __tablename__ = "Horario"
#     id_horario = Column(Integer, primary_key=True, autoincrement=True)
#     id_medico = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
#     dia = Column(String(20), nullable=False)   #"Lunes", "Martes"
#     hora_inicio = Column(Time, nullable=False)  # Hora de inicio del turno
#     hora_fin = Column(Time, nullable=False)  # Hora de finalización del turno



#     # Agregar la relación en el modelo Usuario
#     medico = relationship("Usuario", back_populates="horarios")
