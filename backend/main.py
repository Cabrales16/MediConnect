from fastapi import FastAPI
from app.api.v1.endpoints import auth  # o donde tengas tu router

app = FastAPI()

app.include_router(auth.router)
