#Maneja la conexión a la base de datos y configura el ORM (como SQLAlchemy).
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#connection string:
#representa la base de datos a conectar
SQLALCHEMY_DATABASE_URL = 'mysql+pymysql://root:admin@localhost:3307/agendamiento_de_citas'

#crear el objeto de conexion
conn  = create_engine(SQLALCHEMY_DATABASE_URL)

#la clase base para los modelos
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=conn)

# Dependencia para obtener sesión en otros módulos
def Session():
    return SessionLocal()