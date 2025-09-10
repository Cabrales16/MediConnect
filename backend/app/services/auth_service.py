from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.usuario import Usuario
from app.core.security import hash_password, verify_password, create_access_token
from app.core.config import settings
from itsdangerous import URLSafeTimedSerializer,BadSignature, SignatureExpired
from app.services.email_service import enviar_email
from datetime import datetime

def register_user(user_data, db: Session):
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

    token = create_access_token({"sub": new_user.id_usuario})
    return token



def login_user(credentials, db: Session):
    user = db.query(Usuario).filter(Usuario.correo == credentials.correo).first()
    if not user or not verify_password(credentials.contrasena, user.contrasena):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")

    nombre_rol = user.rol.nombre_rol.lower()
    access_token = create_access_token({"sub": user.id_usuario, "rol": nombre_rol})

    return user, access_token


# Crear serializador
def generar_serializer():
    return URLSafeTimedSerializer(settings.SECRET_KEY, salt='recuperar-contrasena')

# Generar token seguro
def generar_token_email(correo: str):
    return generar_serializer().dumps(correo)

# Verificar token (con tiempo de expiración)
def verificar_token_email(token: str, max_age=600):
    try:
        return generar_serializer().loads(token, max_age=max_age)
    except SignatureExpired:
        raise HTTPException(status_code=400, detail="El enlace ha expirado.")
    except BadSignature:
        raise HTTPException(status_code=400, detail="Token inválido.")
    
# Enviar correo de recuperación
def enviar_correo_recuperacion(correo: str, db: Session):
    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    token = generar_token_email(correo)
    enlace = f"http://localhost:8000/auth/restablecer-contrasena/{token}"

    asunto = "Recuperación de contraseña"
    cuerpo_html = f"""
    <p>Hola {usuario.nombre},</p>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña. 
    Este enlace expirará en <b>10 minutos</b>.</p>
    <a href="{enlace}">Restablecer contraseña</a>
    <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
    """

    enviar_email(db, correo, asunto, cuerpo_html)
    return {"msg": "Correo de recuperación enviado."}

# Restablecer contraseña usando el token
def restablecer_contrasena(token: str, nueva_contrasena: str, db: Session):
    correo = verificar_token_email(token)  # aquí ya valida expiración

    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    usuario.contrasena = hash_password(nueva_contrasena)
    db.commit()
    return {"msg": "Contraseña restablecida con éxito."}

