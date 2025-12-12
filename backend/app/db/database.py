import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ============================
#  Configuración de la BD
# ============================

# 1) Intentar leer de la variable de entorno DATABASE_URL (Producción)
raw_db_url = os.getenv("DATABASE_URL")

# 2) Si no existe (entorno local), usar tu BD local
if not raw_db_url:
    raw_db_url = "mysql+pymysql://root:admin@localhost:3315/agendamiento_de_citas"

# 3) Si por algún motivo Railway entrega "mysql://", lo convertimos a "mysql+pymysql://"
if raw_db_url.startswith("mysql://"):
    raw_db_url = raw_db_url.replace("mysql://", "mysql+pymysql://", 1)

SQLALCHEMY_DATABASE_URL = raw_db_url

# ============================
#  Engine y sesión
# ============================

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,   # evita conexiones muertas
    pool_recycle=3600,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependencia para usar en FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
