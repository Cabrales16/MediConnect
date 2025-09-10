
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.perfiles import UsuarioResponseGene, PacienteAdmResponse, MedicoResponseTar
from app.services import perfiles_service
from typing import List, Union

router = APIRouter(prefix="/Usuarios", tags=["Usuarios"])

@router.get("/Usuarios", response_model=List[UsuarioResponseGene])
def get_Usuarios(db: Session = Depends(get_db)):
    return perfiles_service.obtener_Usuarios(db)

@router.get("/PaAdm/{id_usuario}", response_model=Union[List[PacienteAdmResponse], MedicoResponseTar])
def get_paciente(id_usuario: int, db: Session = Depends(get_db)):
    return perfiles_service.obtener_pacientes_administrador_medico(db, id_usuario)


