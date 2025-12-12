import os
from datetime import datetime
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.models.novedad import Novedad
from app.schemas.novedad import NovedadBase, NovedadCreate
from app.core.config import BACKEND_BASE_URL

UPLOAD_DIR = "app/static/novedades"


def obtener_todas_novedades(db: Session):
    novedades = db.query(Novedad).all()

    if not novedades:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontraron novedades registradas.",
        )

    return [NovedadBase.from_orm(novedad) for novedad in novedades]


def crear_novedad(db: Session, data: NovedadCreate, imagen: UploadFile):
    try:
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        nombre_imagen = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{imagen.filename}"
        ruta_imagen = os.path.join(UPLOAD_DIR, nombre_imagen)

        with open(ruta_imagen, "wb") as buffer:
            buffer.write(imagen.file.read())

        # 👇 URL pública usando BACKEND_BASE_URL
        url_imagen = f"{BACKEND_BASE_URL}/static/novedades/{nombre_imagen}"

        nueva_novedad = Novedad(
            id_admin=data.id_admin,
            titulo=data.titulo,
            descripcion=data.descripcion,
            src=url_imagen,
        )

        db.add(nueva_novedad)
        db.commit()
        db.refresh(nueva_novedad)

        return NovedadBase.from_orm(nueva_novedad)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la novedad: {str(e)}")


def eliminar_novedad(db: Session, id_novedad: int):
    novedad = db.query(Novedad).filter(Novedad.id_novedad == id_novedad).first()
    if not novedad:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")

    if novedad.src:
        nombre_archivo = novedad.src.split("/")[-1]
        ruta_archivo = os.path.join(UPLOAD_DIR, nombre_archivo)

        if os.path.exists(ruta_archivo):
            os.remove(ruta_archivo)

    db.delete(novedad)
    db.commit()

    return {"mensaje": "Novedad eliminada correctamente"}


def obtener_info_novedad(db: Session, id_novedad: int):
    info = db.query(Novedad).filter(Novedad.id_novedad == id_novedad).first()
    if not info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró la información de la novedad.",
        )
    return NovedadBase.from_orm(info)


def actualizar_novedad(db: Session, id_novedad: int, data: NovedadCreate, imagen: UploadFile = None):
    novedad = db.query(Novedad).filter(Novedad.id_novedad == id_novedad).first()
    if not novedad:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")

    novedad.titulo = data.titulo
    novedad.descripcion = data.descripcion
    novedad.id_admin = data.id_admin

    if imagen:
        try:
            os.makedirs(UPLOAD_DIR, exist_ok=True)

            if novedad.src:
                nombre_archivo_antiguo = novedad.src.split("/")[-1]
                ruta_archivo_antiguo = os.path.join(UPLOAD_DIR, nombre_archivo_antiguo)
                if os.path.exists(ruta_archivo_antiguo):
                    os.remove(ruta_archivo_antiguo)

            nombre_imagen = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{imagen.filename}"
            ruta_imagen = os.path.join(UPLOAD_DIR, nombre_imagen)

            with open(ruta_imagen, "wb") as buffer:
                buffer.write(imagen.file.read())

            novedad.src = f"{BACKEND_BASE_URL}/static/novedades/{nombre_imagen}"

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al guardar imagen: {str(e)}")

    db.commit()
    db.refresh(novedad)

    return {
        "msg": "Novedad actualizada correctamente",
        "novedad": {
            "id_novedad": novedad.id_novedad,
            "titulo": novedad.titulo,
            "descripcion": novedad.descripcion,
            "src": novedad.src,
            "id_admin": novedad.id_admin,
        },
    }
