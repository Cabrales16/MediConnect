# MediConnect

**MediConnect** es un sistema web para la gestión de servicios médicos, diseñado para facilitar la programación de citas, 
el manejo de usuarios (pacientes y médicos) y la administración de información médica. Este proyecto está organizado 
en una arquitectura modular con separación clara entre el **backend**, la **base de datos** y el **frontend**.

---

## 📁 Estructura del Proyecto

📁 MediConnect/

│

├── backend/

│ ├── app/ # Lógica de la aplicación (FastAPI)

│ ├── node_modules/ # Dependencias JS (si aplica)

│ ├── .env # Variables de entorno para backend

│ ├── app.py # Archivo principal de backend

│ ├── requirements.txt # Dependencias del backend

│ └── run.py # Script para ejecutar la app

│

├── bd/

│ ├── alembic/ # Configuración de migraciones

│ ├── db/ # Conexión y lógica de base de datos

│ ├── models/ # Modelos de datos (SQLAlchemy)

│ ├── venv/ # Entorno virtual para base de datos

│ ├── alembic.ini # Configuración de Alembic

│ └── requirements.txt # Dependencias de la base de datos

│

├── docs/ # Documentación

│

├── frontend/

│ └── avance proyecto/

│ ├── Agendamiento de citas/

│ ├── avance/

│ ├── Home/

│ ├── Login/

│ └── Registro/

│

├── Guia_EstandaresCodigo.md # Estándares de codificación

└── README.md


## ⚙️ Requisitos

- Python 3.10+
- pip
- Node.js (si el frontend requiere JS o librerías)
- Entornos virtuales (`venv`)
- Alembic
- SQLAlchemy
- FastAPI
- Uvicorn

---

## 🛠️ Instalación y Uso

### 1. Clona el repositorio

```bash
git clone https://github.com/Cabrales16/MediConnect.git
cd MediConnect
```

### 2. Configura los entornos virtuales
Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Base de Datos
```bash
cd ../bd
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
### 3. Variables de entorno

Crear y configurar correctamente los archivos ``.env`` en:

- ``backend/.env`` para la API.

- ``bd/.env`` si se maneja una configuración separada para la base de datos.

### 4. Migraciones con Alembic
Desde la carpeta ``bd/``, ejecuta las migraciones:
```bash
cd bd
alembic upgrade head
```

### 5. Ejecutar la aplicación
Desde la carpeta ``backend/``:
```bash
cd ../backend
python run.py
```
Y con FastAPI con Uvicorn:
```bash
uvicorn app:app --reload
```
---

## 📌 Notas
- Puedes modificar el archivo ``.env`` para cambiar configuraciones como conexión a la base de datos, puertos, etc.
- Recomendado usar ``uvicorn`` si trabajas con FastAPI:
```bash
uvicorn app:app --reload
```
- El archivo Guia_EstandaresCodigo.md contiene las normas de estilo para el código del equipo.
- Recomendamos trabajar con entornos virtuales separados para evitar conflictos de dependencias.
- La base de datos es gestionada con SQLAlchemy y migraciones Alembic.

---

## 🧑‍💻 Autores
Desarrollado por:
- Andres Cabrales Baena
- Juliana Garcia Perez
- Gerson Samuel Sanchez Garcia
- Sofia Segura Guacare
