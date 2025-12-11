# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    # ====== SENDGRID ======
    SENDGRID_API_KEY: str
    FROM_EMAIL: str = "ssegur403@gmail.com"
    FROM_NAME: str = "Euipomed Support"

    # ====== FRONTEND ======
    # URL principal del frontend (DEV)
    FRONTEND_URL: str = "http://localhost:5173"

    # Orígenes adicionales (Railway puede inyectar varios)
    FRONTEND_ORIGINS: str = ""  # CSV: "https://a.com,https://b.com"

    # ====== BACKEND ======
    BACKEND_BASE_URL: str = "http://127.0.0.1:8000"  # para imágenes/URLs públicas

    # ====== SECURITY ======
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    # ====== CONFIG ======
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"  # permite que Railway envíe más variables

    # ====== FUNCIONES UTILES ======
    def cors_origins(self) -> List[str]:
        """Genera lista de orígenes válidos para CORS."""
        defaults = [
            self.FRONTEND_URL,
            "http://127.0.0.1:5173",
            "https://cabrales16.github.io",
            "https://cabrales16.github.io/MediConnect",
        ]

        extras = [
            origin.strip()
            for origin in self.FRONTEND_ORIGINS.split(",")
            if origin.strip()
        ]

        # Evitar duplicados con set()
        return list(set(defaults + extras))


@lru_cache()
def get_settings():
    return Settings()

# Instancia global
settings = get_settings()
