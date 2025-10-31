import os
from datetime import datetime
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.crearTerapia import CrearTerapia
from app.models.crearTerapia import CrearTerapia
from app.models.usuario import Usuario

UPLOAD_DIRECTORY = "app/static/terapias"

def guardar_archivo_terapia(file: UploadFile, db: Session, id_admin: int) -> CrearTerapia:
    # Verificar si el administrador existe
    admin = db.query(Usuario).filter(Usuario.id_usuario == id_admin).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Administrador no encontrado")

    # Crear el directorio si no existe
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)

    # Generar un nombre de archivo único
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"terapia_{id_admin}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)

    # Guardar el archivo en el sistema de archivos
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Crear la entrada en la base de datos
    nueva_terapia = CrearTerapia(
        id_admin=id_admin,
        estado="Activa",
        archivo=file_path
    )
    db.add(nueva_terapia)
    db.commit()
    db.refresh(nueva_terapia)

    return nueva_terapia

def obtener_terapias(db: Session):
    terapias = db.query(CrearTerapia).all()
    return terapias

def eliminar_terapia(db: Session, id_terapia: int):
    terapia = db.query(CrearTerapia).filter(CrearTerapia.id_terapia == id_terapia).first()
    if not terapia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Terapia no encontrada")

    # Eliminar el archivo del sistema de archivos
    if os.path.exists(terapia.archivo):
        os.remove(terapia.archivo)

    # Eliminar la entrada de la base de datos
    db.delete(terapia)
    db.commit()

def actualizar_toda_terapia(db: Session, id_terapia: int, estado: str, archivo: str):
    terapia = db.query(CrearTerapia).filter(CrearTerapia.id_terapia == id_terapia).first()
    if not terapia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Terapia no encontrada")

    terapia.estado = estado
    terapia.archivo = archivo

    db.commit()
    db.refresh(terapia)
    return terapia