from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.perfil import UsuarioResponse, UsuarioEdid, TipoDocumentoEnum
from app.services import perfil_service


router = APIRouter(prefix="/perfil", tags=["Perfil"])

@router.get("/perfil/{id_usuario}", response_model=UsuarioResponse)
def get_perfil(id_usuario: int, db: Session = Depends(get_db)):
    orm_mode = perfil_service.obtener_usuario(db, id_usuario)
    return orm_mode



@router.put("/editar/usuario/{id_usuario}")
def editar_perfil(id_usuario: int, perfil: UsuarioEdid, db: Session = Depends(get_db)):
    perfil_editado = perfil_service.editar_perfil(db, id_usuario, perfil)
    if not perfil_editado:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return {"msg": "Perfil actualizado con éxito", "horario": perfil_editado}