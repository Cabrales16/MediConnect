from fastapi import APIRouter, Depends, UploadFile, Form
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.terapia import guardar_archivo_terapia, obtener_terapias, eliminar_terapia, actualizar_toda_terapia
from app.schemas.crearTerapia import CrearTerapia

router = APIRouter(prefix="/terapia", tags=["Terapia"])

@router.post("/subir", response_model=CrearTerapia)
async def subir_terapia(
    nombre: str = Form(...),
    file: UploadFile = Form(...),
    id_admin: int = Form(...),
    db: Session = Depends(get_db)
):
    """
    Endpoint para subir un archivo de terapia.
    """
    terapia = guardar_archivo_terapia(file, db, id_admin, nombre)
    return terapia

@router.get("/ver", response_model=list[CrearTerapia])
def listar_terapias(db: Session = Depends(get_db)):
    return obtener_terapias(db)

@router.delete("/eliminar/{id_terapia}")
def borrar_terapia(id_terapia: int, db: Session = Depends(get_db)):
    eliminar_terapia(db, id_terapia)
    return {"detail": "Terapia eliminada exitosamente"}

@router.put("/actualizar/{id_terapia}", response_model=CrearTerapia)
def actualizar_terapia(
    id_terapia: int,
    nombre: str = Form(...),
    estado: str = Form(...),
    file: UploadFile | None = None,
    db: Session = Depends(get_db)
):
    terapia_actualizada = actualizar_toda_terapia(db, id_terapia, nombre, estado, file)
    return terapia_actualizada