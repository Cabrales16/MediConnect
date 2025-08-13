from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioLogin, Token
from app.core.security import hash_password, verify_password, create_access_token
import traceback

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/register", response_model=Token)
def register(user_data: UsuarioCreate, db: Session = Depends(get_db)):
    try:
        if db.query(Usuario).filter(Usuario.correo == user_data.correo).first():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Correo ya registrado")

        hashed_pass = hash_password(user_data.contrasena)
        new_user = Usuario(
            id_rol=1,
            nombre=user_data.nombre,
            apellido=user_data.apellido,
            tipo_documento=user_data.tipo_documento,
            num_documento=user_data.num_documento,
            correo=user_data.correo,
            telefono=user_data.telefono,
            genero=user_data.genero,
            direccion=user_data.direccion,
            contrasena=hashed_pass,
            fecha_nacimiento=user_data.fecha_nacimiento,
            estado="ACTIVO"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        access_token = create_access_token({"sub": new_user.id_usuario})
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        traceback.print_exc()  # Esto imprime el error completo en consola
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/login", response_model=Token)
def login(credentials: UsuarioLogin, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.correo == credentials.correo).first()
    if not user or not verify_password(credentials.contrasena, user.contrasena):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")

    access_token = create_access_token({"sub": user.id_usuario})
    return {
        "access_token": access_token,
        "token_type": "bearer"  
    }
