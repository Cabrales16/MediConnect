from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.usuario import Usuario
from app.core.security import hash_password, verify_password, create_access_token
from app.core.config import settings
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from app.services.email_service import enviar_email
import secrets


def register_user(user_data, db: Session):
    if db.query(Usuario).filter(Usuario.correo == user_data.correo).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Correo ya registrado")

    hashed_pass = hash_password(user_data.contrasena)

    # Generar token único y expiración
    token = secrets.token_urlsafe(32)
    expiracion = datetime.utcnow() + timedelta(hours=24)

    user = Usuario(
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
        estado="PENDIENTE",
        confirmado=False,
        token_confirmacion=token,
        token_expira=expiracion
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Enviar correo de confirmación
    enviar_correo_confirmacion(user, db)

    access_token = create_access_token({"sub": str(user.id_usuario)})
    return user, access_token

def confirmar_usuario_service(token: str, db: Session):
    usuario = db.query(Usuario).filter(Usuario.token_confirmacion == token).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Token inválido o usuario no encontrado")

    if usuario.confirmado:
        return {"msg": "Tu cuenta ya está confirmada."}

    if usuario.token_expira < datetime.utcnow():
        raise HTTPException(status_code=400, detail="El enlace de confirmación ha expirado")

    # ✅ Forzar actualización
    usuario.confirmado = True
    usuario.estado = "ACTIVO"
    usuario.token_confirmacion = None
    usuario.token_expira = None

    db.add(usuario)   #esto asegura que SQLAlchemy lo marque como modificado
    db.commit()
    db.refresh(usuario)

    return {"msg": "Cuenta confirmada con éxito."}


MAX_INTENTOS = 3
TIEMPO_BLOQUEO_MINUTOS = 2

def login_user(credentials, db: Session):
    try:
        user = db.query(Usuario).filter(Usuario.correo == credentials.correo).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario no encontrado"
            )

        # 1) Confirmación de cuenta
        if not getattr(user, "confirmado", False):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Debes confirmar tu cuenta antes de iniciar sesión."
            )

        # 2) Estado ACTIVO / PENDIENTE / SUSPENDIDO
        estado_usuario = getattr(user, "estado", None)

        if estado_usuario is not None:
            # puede ser Enum o string
            if hasattr(estado_usuario, "value"):
                valor_estado = estado_usuario.value.lower()
            else:
                valor_estado = str(estado_usuario).lower()

            if valor_estado == "suspendido":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Tu cuenta está suspendida. Comunícate con el administrador."
                )

            if valor_estado not in ("activo", "pendiente"):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Tu cuenta no está activa."
                )

        # 3) Bloqueo temporal por intentos fallidos
        if getattr(user, "bloqueado_hasta", None) and datetime.utcnow() < user.bloqueado_hasta:
            tiempo_restante = (user.bloqueado_hasta - datetime.utcnow()).seconds // 60
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Cuenta bloqueada. Intenta de nuevo en {tiempo_restante} minutos"
            )

        # 4) Validar contraseña
        if not verify_password(credentials.contrasena, user.contrasena):
            # si es None, empezar desde 0
            user.intentos_fallidos = (user.intentos_fallidos or 0) + 1

            if user.intentos_fallidos >= MAX_INTENTOS:
                user.bloqueado_hasta = datetime.utcnow() + timedelta(minutes=TIEMPO_BLOQUEO_MINUTOS)
                user.intentos_fallidos = 0
                db.commit()
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Cuenta bloqueada por {TIEMPO_BLOQUEO_MINUTOS} minutos"
                )

            db.commit()
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas"
            )

        # 5) Login exitoso
        user.intentos_fallidos = 0
        user.bloqueado_hasta = None
        db.commit()

        # Rol defensivo (por si user.rol es None)
        rol = getattr(user, "rol", None)
        nombre_rol = getattr(rol, "nombre_rol", "Paciente")

        access_token = create_access_token({"sub": user.id_usuario, "rol": nombre_rol.lower()})

        return user, access_token

    except HTTPException:
        # Re-lanzar errores controlados
        raise
    except Exception as e:
        # ⛔️ Solo para DEBUG: que no se oculte el error real
        raise HTTPException(
            status_code=500,
            detail=f"Error interno en login_user: {type(e).__name__}: {e}"
        )

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

    # Generar token
    token = generar_token_email(correo)

    # Usar la URL del frontend en lugar de la del backend
    enlace = f"{settings.FRONTEND_URL}/restablecer/{token}"

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




def generar_serializer_confirmacion():
    return URLSafeTimedSerializer(settings.SECRET_KEY, salt='confirmacion-registro')

def generar_token_confirmacion(correo: str):
    return generar_serializer_confirmacion().dumps(correo)

def verificar_token_confirmacion(token: str, max_age=86400):  # 24h
    try:
        return generar_serializer_confirmacion().loads(token, max_age=max_age)
    except SignatureExpired:
        raise HTTPException(status_code=400, detail="El enlace ha expirado.")
    except BadSignature:
        raise HTTPException(status_code=400, detail="Token inválido.")
    
def enviar_correo_confirmacion(usuario, db: Session):
    enlace = f"{settings.FRONTEND_URL}/bienvenida/{usuario.token_confirmacion}"

    asunto = "Confirma tu cuenta"
    cuerpo_html = f"""
    <h2>¡Bienvenido, {usuario.nombre}!</h2>
    <p>Gracias por registrarte. Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
    <a href="{enlace}">Confirmar cuenta</a>
    <p>Este enlace expirará en 24 horas.</p>
    """

    enviar_email(db, usuario.correo, asunto, cuerpo_html)