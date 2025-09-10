from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Listar todos los usuarios con paginación
@router.get("/usuarios/", response_model=list[schemas.UsuarioRead])
def leer_usuarios(skip: int = 0, limit: int = 70, db: Session = Depends(get_db)):
    return db.query(models.Usuario).offset(skip).limit(limit).all()

# Listar pacientes
@router.get("/pacientes/", response_model=list[schemas.UsuarioRead])
def obtener_pacientes(db: Session = Depends(get_db)):
    pacientes = db.query(models.Usuario).filter(models.Usuario.rol_id == 1).all()
    if not pacientes:
        raise HTTPException(status_code=404, detail="No se encontraron pacientes")
    return pacientes

# Listar médicos
@router.get("/medicos/", response_model=list[schemas.UsuarioRead])
def obtener_medicos(db: Session = Depends(get_db)):
    medicos = db.query(models.Usuario).filter(models.Usuario.rol_id == 2).all()
    if not medicos:
        raise HTTPException(status_code=404, detail="No se encontraron médicos")
    return medicos

# Listar administradores
@router.get("/administradores/", response_model=list[schemas.UsuarioRead])
def obtener_administradores(db: Session = Depends(get_db)):
    admins = db.query(models.Usuario).filter(models.Usuario.rol_id == 3).all()
    if not admins:
        raise HTTPException(status_code=404, detail="No se encontraron administradores")
    return admins

# Crear paciente
@router.post("/pacientes/", response_model=schemas.UsuarioRead)
def crear_paciente(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return crear_usuario_por_rol(usuario, 1, db)  # rol_id=1 para pacientes

# Crear médico
@router.post("/medicos/", response_model=schemas.UsuarioRead)
def crear_medico(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return crear_usuario_por_rol(usuario, 2, db)  # rol_id=2 para médicos

# Crear administrador
@router.post("/administradores/", response_model=schemas.UsuarioRead)
def crear_administrador(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return crear_usuario_por_rol(usuario, 3, db)  # rol_id=3 para administradores

# Función interna para creación con validación y asignación de rol fija
def crear_usuario_por_rol(usuario: schemas.UsuarioCreate, rol_id: int, db: Session):
    if db.query(models.Usuario).filter(models.Usuario.num_documento == usuario.num_documento).first():
        raise HTTPException(status_code=400, detail="El número de documento ya está registrado")
    if db.query(models.Usuario).filter(models.Usuario.correo == usuario.correo).first():
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    nuevo_usuario = models.Usuario(
        nombre=usuario.nombre,
        apellido=usuario.apellido,
        tipo_documento=usuario.tipo_documento,
        num_documento=usuario.num_documento,
        correo=usuario.correo,
        telefono=usuario.telefono,
        genero=usuario.genero,
        direccion=usuario.direccion,
        contrasena=usuario.contrasena,  # Recuerda hashear en producción
        fecha_registro=usuario.fecha_registro,
        estado=usuario.estado,
        fecha_nacimiento=usuario.fecha_nacimiento,
        rol_id=rol_id,
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

