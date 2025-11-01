import os
from datetime import datetime
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from app.models.crearTerapia import CrearTerapia
from app.models.usuario import Usuario

# Carpeta física donde se guardan los archivos
UPLOAD_DIRECTORY = "app/static/terapias"


def guardar_archivo_terapia(file: UploadFile, db: Session, id_admin: int, nombre: str) -> CrearTerapia:
    """Guarda un archivo PDF y su registro en BD."""
    admin = db.query(Usuario).filter(Usuario.id_usuario == id_admin).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Administrador no encontrado")

    os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"terapia_{id_admin}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)

    # Guardar archivo físico
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # ✅ Guardar solo la ruta relativa, sin /static/
    relative_path = f"terapias/{filename}"

    nueva_terapia = CrearTerapia(
        id_admin=id_admin,
        nombre=nombre,
        estado="Activa",
        archivo=relative_path
    )
    db.add(nueva_terapia)
    db.commit()
    db.refresh(nueva_terapia)
    return nueva_terapia


def obtener_terapias(db: Session):
    """Obtiene todas las terapias."""
    return db.query(CrearTerapia).all()


def eliminar_terapia(db: Session, id_terapia: int):
    """Elimina una terapia y su archivo asociado."""
    terapia = db.query(CrearTerapia).filter(CrearTerapia.id_terapia == id_terapia).first()
    if not terapia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Terapia no encontrada")

    # Eliminar archivo físico
    file_path = os.path.join("app/static", terapia.archivo)
    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(terapia)
    db.commit()


def actualizar_toda_terapia(db: Session, id_terapia: int, nombre: str, estado: str, file: UploadFile):
    """Actualiza una terapia con nuevo archivo."""
    terapia = db.query(CrearTerapia).filter(CrearTerapia.id_terapia == id_terapia).first()
    if not terapia:
        raise HTTPException(status_code=404, detail="Terapia no encontrada")

    # Eliminar archivo anterior
    if terapia.archivo:
        old_path = os.path.join("app/static", terapia.archivo)
        if os.path.exists(old_path):
            os.remove(old_path)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"terapia_{id_terapia}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # ✅ Guardar solo la ruta relativa
    relative_path = f"terapias/{filename}"

    terapia.nombre = nombre
    terapia.estado = estado
    terapia.archivo = relative_path

    db.commit()
    db.refresh(terapia)
    return terapia
