from app.db.base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Rol(Base):
    __tablename__ = "Rol"
    id_rol = Column(Integer, primary_key=True)
    nombre_rol = Column(String(60), nullable=False, unique=True)

    # Relación con Usuario
    usuarios = relationship("Usuario", back_populates="rol", cascade="all, delete-orphan")

    def obtener_usuarios(self):
        """
        Devuelve una lista de usuarios que tienen este rol.
        """
        return [{"id": usuario.id_usuario, "nombre": usuario.nombre} for usuario in self.usuarios]
