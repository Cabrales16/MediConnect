# app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # SendGrid
    SENDGRID_API_KEY: str
    FROM_EMAIL: str = "ssegur403@gmail.com"  # Campo que faltaba
    FROM_NAME: str = "Euipomed Support"             # Campo que faltaba
    
    # Frontend
    FRONTEND_URL: str = "http://localhost:5173"     # ✅ valor por defecto
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"  # Permitir campos extra

# Instancia global
settings = Settings()
