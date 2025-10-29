from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.usuario import Usuario
from app.schemas.perfil import UsuarioResponse, UsuarioEdid, TipoDocumentoEnum

def obtener_usuario(db: Session, id_usuario: int):
    usuario  = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not usuario :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return usuario 

def editar_perfil(db: Session, id_usuario: int, perfil:UsuarioEdid):
    usuario_db = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    
    if not usuario_db:
        return None

    usuario_db.tipo_documento = perfil.tipo_documento
    usuario_db.telefono = perfil.telefono
    usuario_db.direccion = perfil.direccion
    usuario_db.correo = perfil.correo

    db.commit()
    db.refresh(usuario_db)
    
    return usuario_db
