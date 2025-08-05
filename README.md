# MediConnect

**MediConnect** es un sistema dividido en dos entornos principales: `Bd` para la gestión de base de datos y `Develop` para el desarrollo de la aplicación. Este proyecto tiene como objetivo brindar una solución médica web organizada y escalable.

---

## ⚙️ Requisitos

- Python 3.10+
- pip
- Entornos virtuales (`venv`)
- Alembic
- SQLAlchemy
- FastAPI (u otro framework según el contenido del `app/`)

---

## 🛠️ Instalación y Uso

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/MediConnect.git
cd MediConnect
```

### 2. Configura los entornos virtuales
Base de Datos (Bd/venv)
```bash
cd Bd
python -m venv venv
venv\Scripts\activate   # En Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
```

Aplicación (Develop/.venv)
```bash
cd ../Develop
python -m venv .venv
.venv\Scripts\activate  # En Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
```
### 3. Variables de entorno

Asegúrate de configurar correctamente el archivo ``.env`` en la carpeta ``Develop``.

### 4. Migraciones
Desde ``Bd/``, ejecuta las migraciones si es necesario:
```bash
alembic upgrade head
```

### 5. Ejecutar la aplicación
```bash
cd Develop
python run.py
```

## 📌 Notas
- Puedes modificar el archivo ``.env`` para cambiar configuraciones como conexión a la base de datos, puertos, etc.
- Recomendado usar ``uvicorn`` si trabajas con FastAPI:
```bash
uvicorn app:app --reload
```

## 🧑‍💻 Autores
Desarrollado por:
- Andres Cabrales Baena
- Juliana Garcia Perez
- Gerson Samuel Sanchez Garcia
- Sofia Segura Guacare
