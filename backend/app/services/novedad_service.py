import os
from datetime import datetime
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from app.models.novedad import Novedad
from app.schemas.novedad import NovedadBase, NovedadCreate
UPLOAD_DIR = "app/static/novedades"

def obtener_todas_novedades(db: Session):
    # Consultar todas las novedades en la base de datos
    novedades = db.query(Novedad).all()

    # Si no hay resultados, lanzar excepción
    if not novedades:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontraron novedades registradas."
        )

    # Convertir los objetos ORM a esquemas Pydantic
    return [NovedadBase.from_orm(novedad) for novedad in novedades]



# ✅ CREAR NOVEDAD
def crear_novedad(db: Session, data: NovedadCreate, imagen: UploadFile):
    try:
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        # Crear nombre único
        nombre_imagen = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{imagen.filename}"
        ruta_imagen = os.path.join(UPLOAD_DIR, nombre_imagen)

        # Guardar imagen
        with open(ruta_imagen, "wb") as buffer:
            buffer.write(imagen.file.read())

        # URL pública
        url_imagen = f"http://127.0.0.1:8000/static/novedades/{nombre_imagen}"

        # Crear novedad
        nueva_novedad = Novedad(
            id_admin=data.id_admin,
            titulo=data.titulo,
            descripcion=data.descripcion,
            src=url_imagen
        )

        db.add(nueva_novedad)
        db.commit()
        db.refresh(nueva_novedad)

        return NovedadBase.from_orm(nueva_novedad)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la novedad: {str(e)}")


# ❌ ELIMINAR NOVEDAD
def eliminar_novedad(db: Session, id_novedad: int):
    novedad = db.query(Novedad).filter(Novedad.id_novedad == id_novedad).first()
    if not novedad:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")

    # Eliminar imagen asociada si existe
    if novedad.src:
        # Extraer nombre del archivo
        nombre_archivo = novedad.src.split("/")[-1]
        ruta_archivo = os.path.join(UPLOAD_DIR, nombre_archivo)

        if os.path.exists(ruta_archivo):
            os.remove(ruta_archivo)

    # Eliminar novedad de la base de datos
    db.delete(novedad)
    db.commit()

    return {"mensaje": "Novedad eliminada correctamente"}



def obtener_info_novedad(db: Session, id_novedad: int):
    info = db.query(Novedad).filter(Novedad.id_novedad == id_novedad).first()
    if not info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró la información de la novedad."
        )
    return NovedadBase.from_orm(info)

#✅ ACTUALIZAR NOVEDAD
def actualizar_novedad(db: Session, id_novedad: int, data: NovedadCreate, imagen: UploadFile = None):
    novedad = db.query(Novedad).filter(Novedad.id_novedad == id_novedad).first()
    if not novedad:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")

    # ✅ Actualizar campos de texto
    novedad.titulo = data.titulo
    novedad.descripcion = data.descripcion
    novedad.id_admin = data.id_admin

    # ✅ Si se proporciona una nueva imagen, actualizarla
    if imagen:
        try:
            os.makedirs(UPLOAD_DIR, exist_ok=True)

            #  Eliminar imagen anterior si existe
            if novedad.src:
                nombre_archivo_antiguo = novedad.src.split("/")[-1]
                ruta_archivo_antiguo = os.path.join(UPLOAD_DIR, nombre_archivo_antiguo)
                if os.path.exists(ruta_archivo_antiguo):
                    os.remove(ruta_archivo_antiguo)

            # Crear nombre único para la nueva imagen
            nombre_imagen = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{imagen.filename}"
            ruta_imagen = os.path.join(UPLOAD_DIR, nombre_imagen)

            #  Guardar nueva imagen en disco
            with open(ruta_imagen, "wb") as buffer:
                buffer.write(imagen.file.read())

            # Actualizar URL pública de la imagen
            novedad.src = f"http://127.0.0.1:8000/static/novedades/{nombre_imagen}"

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al guardar imagen: {str(e)}")

    # Guardar cambios en la base de datos
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