from fastapi import FastAPI
from app.api.v1.endpoints import auth, horarios, historial, error, perfil, familiar,  perfilUsua, citas, novedad, medico
from fastapi.staticfiles import StaticFiles

app = FastAPI()

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
app.mount("/static", StaticFiles(directory="app/static"), name="static")

#habilitado para permitir que el frontend (que corre en otro puerto, normalmente 5173) pueda acceder.
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)