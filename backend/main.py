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

# ✅ Crear el directorio si no existe
os.makedirs("app/static/terapias", exist_ok=True)

# ✅ Montar los archivos estáticos
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# =========================
# ✅ Configuración de CORS
# =========================

# Puedes definir ORÍGENES extra desde variables de entorno en Railway, por ejemplo:
# FRONTEND_ORIGINS="https://cabrales16.github.io,https://cabrales16.github.io/MediConnect"
extra_origins_env = os.getenv("FRONTEND_ORIGINS", "")

extra_origins = [
    origin.strip()
    for origin in extra_origins_env.split(",")
    if origin.strip()
]

# Orígenes por defecto (DEV + GitHub Pages)
default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://cabrales16.github.io",
    "https://cabrales16.github.io/MediConnect",
]

origins = list(set(default_origins + extra_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Registrar las rutas
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
