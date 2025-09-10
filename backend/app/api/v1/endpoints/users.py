from fastapi import APIRouter, Depends
from app.core.deps import get_current_user, get_current_admin
from app.models.usuario import Usuario

router = APIRouter(prefix="/users", tags=["Usuarios"])

@router.get("/me")
def get_me(current_user: Usuario = Depends(get_current_user)):
    return {"usuario": current_user.nombre, "rol": current_user.id_rol}

@router.get("/admin")
def admin_only(current_admin: Usuario = Depends(get_current_admin)):
    return {"mensaje": "Bienvenido, administrador"}
