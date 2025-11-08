from fastapi import APIRouter, Depends, UploadFile, Form, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.terapia import guardar_archivo_terapia, obtener_terapias, eliminar_terapia, actualizar_toda_terapia, asignar_terapia, obtener_terapias, obtener_terapias_paciente
from app.schemas.crearTerapia import CrearTerapia, AsignarTerapiaBase, AsignarTerapiaResponse, CrearTerapiaResponse, TerapiaResponse
from typing import List

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

@router.post("/asignar", response_model=AsignarTerapiaResponse)
def asignar_terapia_endpoint(
    asignar_data: AsignarTerapiaBase,
    db: Session = Depends(get_db)
):
    return asignar_terapia(db, asignar_data)

@router.get("/todas", response_model=List[CrearTerapiaResponse])
def listar_terapias(db: Session = Depends(get_db)):
    """Retorna la lista de terapias disponibles."""
    return obtener_terapias(db)

@router.get("/paciente/{id_usuario}", response_model=list[TerapiaResponse])
def listar_terapias_paciente(id_usuario: int, db: Session = Depends(get_db)):
    terapias = obtener_terapias_paciente(db, id_usuario)
    if not terapias:
        raise HTTPException(status_code=404, detail="El paciente no tiene terapias asignadas")
    return terapias