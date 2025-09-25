from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.usuario import UsuarioCreate, UsuarioLogin, Token
from app.schemas.usuario import ForgotPasswordRequest, ResetPasswordRequest
from app.services.auth_service import register_user, login_user
from app.services.auth_service import enviar_correo_recuperacion, restablecer_contrasena, confirmar_usuario_service
from app.core.sanitizer import sanitize_dict, sanitize_text
router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/register", response_model=Token)
def register(user_data: UsuarioCreate, db: Session = Depends(get_db)):
    clean_data = sanitize_dict(user_data.dict())  # sanitiza solo strings
    user, access_token = register_user(UsuarioCreate(**clean_data), db)
    return {        
        "access_token": access_token,
        "token_type": "bearer",
        "rol": user.rol.nombre_rol,
        "id_usuario": user.id_usuario,     
        "correo": sanitize_text(user.correo),  # sanitiza al devolver
        "nombre": sanitize_text(user.nombre)
    }

@router.post("/login", response_model=Token)
def login(credentials: UsuarioLogin, db: Session = Depends(get_db)):
    user, access_token = login_user(credentials, db)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "rol": user.rol.nombre_rol,
        "id_usuario": user.id_usuario,     
        "correo": user.correo,
        "nombre": user.nombre
    }

@router.post("/recuperar-contrasena")
def recuperar_contrasena(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    # Aquí podrías validar que el correo existe antes de enviar
    enviar_correo_recuperacion(request.correo, db)
    return {"msg": "Te hemos enviado un correo para recuperar tu contraseña."}

@router.post("/restablecer-contrasena/{token}")
def restablecer_contra(token: str, request: ResetPasswordRequest, db: Session = Depends(get_db)):
    return restablecer_contrasena(token, request.nueva_contrasena, db)

@router.get("/confirmar/{token}")
def confirmar_usuario(token: str, db: Session = Depends(get_db)):
    return confirmar_usuario_service(token, db)
