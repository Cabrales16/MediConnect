from fastapi import APIRouter, Depends, UploadFile, Form
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.terapia import guardar_archivo_terapia, obtener_terapias, eliminar_terapia
from app.schemas.crearTerapia import CrearTerapia

router = APIRouter(prefix="/terapia", tags=["Terapia"])

@router.post("/subir", response_model=CrearTerapia)
async def subir_terapia(
    file: UploadFile,
    id_admin: int = Form(...),
    db: Session = Depends(get_db)
):
    """
    Endpoint para subir un archivo de terapia.
    """
    terapia = guardar_archivo_terapia(file, db, id_admin)
    return terapia

@router.get("/ver", response_model=list[CrearTerapia])
def listar_terapias(db: Session = Depends(get_db)):
    """
    Endpoint para listar todas las terapias.
    """
    terapias = obtener_terapias(db)
    return terapias

@router.delete("/eliminar/{id_terapia}")
def borrar_terapia(id_terapia: int, db: Session = Depends(get_db)):
    """
    Endpoint para eliminar una terapia por su ID.
    """
    eliminar_terapia(db, id_terapia)
    return {"detail": "Terapia eliminada exitosamente"}