# backend/main.py
import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import (
    auth,
    horarios,
    historial,
    error,
    perfil,
    familiar,
    perfilUsua,
    citas,
    novedad,
    medico,
    medicamentos,
    terapia,
    medicacion,
    indicacion,
    hospital,
)

app = FastAPI()

# Crear el directorio si no existe
os.makedirs("app/static/terapias", exist_ok=True)

# Archivos estáticos
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# =========================
# ✅ CORS totalmente abierto (para demo)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # permite cualquier origen
    allow_credentials=False,    # obligatorio poner False si usamos "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar rutas
app.include_router(auth.router)
app.include_router(horarios.router)
app.include_router(historial.router)
app.include_router(error.router)
app.include_router(perfil.router)
app.include_router(familiar.router)
app.include_router(perfilUsua.router)
app.include_router(citas.router)
app.include_router(novedad.router)
app.include_router(medico.router)
app.include_router(medicamentos.router)
app.include_router(terapia.router)
app.include_router(medicacion.router)
app.include_router(indicacion.router)
app.include_router(hospital.router)
