from fastapi import APIRouter, Depends, UploadFile, Form
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.novedad import NovedadCreate, NovedadBase, NovedadUpdateResponse
from app.services import novedad_service

router = APIRouter(prefix="/novedades", tags=["Novedades"])

@router.get("/ver")
def ver_todas_novedades(db: Session = Depends(get_db)):
    return novedad_service.obtener_todas_novedades(db)

@router.post("/crear", response_model=NovedadBase)
def crear_novedad(
    id_admin: int = Form(...),
    titulo: str = Form(...),
    descripcion: str = Form(...),
    imagen: UploadFile = Form(...),
    db: Session = Depends(get_db)
):
    data = NovedadCreate(id_admin=id_admin, titulo=titulo, descripcion=descripcion)
    return novedad_service.crear_novedad(db, data, imagen)


# ❌ Eliminar novedad
@router.delete("/eliminar/{id_novedad}")
def eliminar_novedad(id_novedad: int, db: Session = Depends(get_db)):
    return novedad_service.eliminar_novedad(db, id_novedad)


@router.get("/info/{id_novedad}", response_model=NovedadBase)
def obtener_info(id_novedad: int, db: Session = Depends(get_db)):
    return novedad_service.obtener_info_novedad(db, id_novedad)

@router.put("/actualizar/{id_novedad}", response_model=NovedadUpdateResponse)
def actualizar_novedad(
    id_novedad: int,
    id_admin: int = Form(...),
    titulo: str = Form(...),
    descripcion: str = Form(...),
    imagen: UploadFile = Form(None),
    db: Session = Depends(get_db)
):
    data = NovedadCreate(id_admin=id_admin, titulo=titulo, descripcion=descripcion)
    return novedad_service.actualizar_novedad(db, id_novedad, data, imagen)

