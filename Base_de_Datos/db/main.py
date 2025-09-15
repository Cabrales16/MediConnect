from fastapi import FastAPI
from db.views import router as usuarios_router
from db import models, database

app = FastAPI()

# Crear las tablas
models.Base.metadata.create_all(bind=database.conn)

# Ruta principal para verificar que la API funciona
@app.get("/")
def root():
    return {"mensaje": "API funcionando correctamente"}

# Crear las tablas en la base de datos (si no existen)
models.Base.metadata.create_all(bind=database.engine)


# Incluir el router de usuarios
app.include_router(usuarios_router)

