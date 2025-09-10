from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SENDGRID_API_KEY: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"  # Puedes cambiarlo si quieres

    class Config:
        env_file = ".env"  # Carga desde el archivo .env
        env_file_encoding = "utf-8"

# Instancia global para usar en toda la app
settings = Settings()