from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.perfiles_service import obtener_Usuarios, obtener_por_rol, cambiar_rol, cambiar_datos_usuario, cambiar_estado_usuario
from app.schemas.perfiles import CambiarRol, CambiarDatosUsuario, EstadoUsuarioResponse


router = APIRouter(prefix="/Usuarios", tags=["Usuarios"])

@router.get("/Usuarios", response_model=list)
def listar_usuarios(db: Session = Depends(get_db)):
    return obtener_Usuarios(db)


@router.get("/rol/{id_rol}")
def listar_por_rol(id_rol: int, db: Session = Depends(get_db)):
    return obtener_por_rol(db, id_rol)

@router.put("/cambiar_rol/{id_usuario}")
def actualizar_rol(id_usuario: int, nuevo_rol: CambiarRol, db: Session = Depends(get_db)):
    return cambiar_rol(db, nuevo_rol, id_usuario)

@router.put("/editar_usuario/{id_usuario}")
def actualizar_datos_usuario(id_usuario: int, nuevos_datos: CambiarDatosUsuario, db: Session = Depends(get_db)):
    return cambiar_datos_usuario(db, nuevos_datos, id_usuario)

@router.put("/cambiar_estado/{id_usuario}", response_model=EstadoUsuarioResponse)
def actualizar_estado_usuario(id_usuario: int, nuevo_estado: EstadoUsuarioResponse, db: Session = Depends(get_db)):
   
    return cambiar_estado_usuario(db, nuevo_estado, id_usuario)





