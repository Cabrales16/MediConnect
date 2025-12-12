# app/core/config.py
import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # SendGrid
    SENDGRID_API_KEY: str
    FROM_EMAIL: str = "ssegur403@gmail.com"
    FROM_NAME: str = "Euipomed Support"

    # Frontend
    FRONTEND_URL: str = "http://localhost:5173"

    # Backend base URL (para construir URLs públicas de archivos)
    BACKEND_BASE_URL: str = "http://127.0.0.1:8000"

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"  # Permitir campos extra

    # Helper para construir la lista de orígenes CORS
    def cors_origins(self) -> list[str]:
        default_origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://cabrales16.github.io",
            "https://cabrales16.github.io/MediConnect",
        ]

        extra_origins_env = os.getenv("FRONTEND_ORIGINS", "")
        extra_origins = [
            origin.strip()
            for origin in extra_origins_env.split(",")
            if origin.strip()
        ]

        return list(set(default_origins + extra_origins))


# Instancia global de Settings
settings = Settings()

# Alias de módulo para compatibilidad con imports antiguos
BACKEND_BASE_URL = settings.BACKEND_BASE_URL


# (Opcional) si en algún punto usaste `from app.core.config import get_cors_origins`
def get_cors_origins() -> list[str]:
    return settings.cors_origins()
