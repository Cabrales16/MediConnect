from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.familiar import Familiar
from app.models.usuario import Usuario
from app.models.tipo_Novedad import TipoNovedad
from app.schemas.familiares import FamiliarCreate

def obtener_familiares_por_usuario(db: Session, id_paciente: int):
    familiares = (
        db.query(Familiar, TipoNovedad.descripcion.label("tipo"))
        .join(TipoNovedad, Familiar.id_info == TipoNovedad.id_info)
        .filter(Familiar.id_paciente == id_paciente)
        .all()
    )
    if not familiares:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontraron familiares para este usuario"
        )

    return [
        {
            "id_familiar": f.Familiar.id_familiar,
            "nombre": f.Familiar.nombre,
            "correo": f.Familiar.correo,
            "tipo": f.tipo
        }
        for f in familiares
    ]


def crear_familiar(db: Session, id_paciente: int, familiar_data: FamiliarCreate):
    paciente = db.query(Usuario).filter(Usuario.id_usuario == id_paciente).first()
    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el paciente especificado"
        )

    nuevo_familiar = Familiar(
        nombre=familiar_data.nombre,
        correo=familiar_data.correo,
        id_info=familiar_data.id_info,
        id_paciente=id_paciente
    )
    db.add(nuevo_familiar)
    db.commit()
    db.refresh(nuevo_familiar)

    info = db.query(TipoNovedad).filter(TipoNovedad.id_info == nuevo_familiar.id_info).first()

    return {
        "id_familiar": nuevo_familiar.id_familiar,
        "nombre": nuevo_familiar.nombre,
        "correo": nuevo_familiar.correo,
        "tipo": info.descripcion if info else None
    }
def eliminar_familiar(db: Session, id_familiar: int):
    familiar = db.query(Familiar).filter(Familiar.id_familiar == id_familiar).first()
    if not familiar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el familiar especificado"
        )

    db.delete(familiar)
    db.commit()
    return {"detail": "Familiar eliminado exitosamente"}

def actualizar_familiar(db: Session, id_familiar: int, familiar_data: FamiliarCreate):
    familiar = db.query(Familiar).filter(Familiar.id_familiar == id_familiar).first()
    if not familiar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el familiar especificado"
        )

    # Actualizar datos
    familiar.nombre = familiar_data.nombre
    familiar.correo = familiar_data.correo
    familiar.id_info = familiar_data.id_info

    db.commit()
    db.refresh(familiar)

    # Obtener la descripción del tipo de novedad
    info = db.query(TipoNovedad).filter(TipoNovedad.id_info == familiar.id_info).first()

    return {
        "id_familiar": familiar.id_familiar,
        "nombre": familiar.nombre,
        "correo": familiar.correo,
        "tipo": info.descripcion if info else None
    }
