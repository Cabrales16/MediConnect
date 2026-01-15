# 🩺 MediConnect

MediConnect es una aplicación web para la gestión de citas médicas que conecta pacientes, médicos y administradores en una plataforma segura, intuitiva y escalable.

Permite agendar citas, consultar historiales, gestionar familiares y registrar indicaciones médicas, utilizando una arquitectura REST con React en el frontend y FastAPI en el backend.

---

## 🚀 Objetivo del Proyecto

Optimizar la gestión de citas médicas y la interacción entre pacientes y profesionales de la salud mediante una solución digital centralizada, reduciendo tiempos de espera y mejorando el acceso a la información clínica.

---

## 🧩 Alcance (MVP)

La versión actual de MediConnect incluye:

- Registro e inicio de sesión de usuarios
- Paneles diferenciados por rol (Paciente, Médico, Administrador)
- Agendamiento y gestión de citas médicas
- Historial de citas
- Gestión de familiares
- Registro y consulta de indicaciones médicas
- Notificaciones internas y por correo
- Reporte de errores y centro de ayuda
- Seguridad basada en roles

El sistema está diseñado para escalar en futuras iteraciones.

---

## 👥 Actores del Sistema

- **Paciente**: Agenda citas, consulta historial, gestiona familiares y visualiza indicaciones médicas.
- **Médico**: Atiende citas, consulta pacientes y registra indicaciones médicas.
- **Administrador / Soporte**: Administra datos, revisa reportes y gestiona el sistema.

---

## 🏗️ Arquitectura

MediConnect implementa una **arquitectura REST (API RESTful)** que separa:

- Frontend (interfaz gráfica)
- Backend (lógica del negocio)
- Base de datos (persistencia)

Esto facilita la mantenibilidad, la seguridad y la escalabilidad del sistema.

---

## 🛠️ Stack Tecnológico

### Frontend
- React.js
- JavaScript
- HTML5 / CSS3

### Backend
- Python
- FastAPI
- Autenticación JWT

### Base de Datos
- MariaDB / MySQL

### Herramientas
- Git y GitHub
- Jira (SCRUM)
- CI/CD
- Visual Studio Code
- Node.js y Python

---

## 📂 Estructura del Proyecto

MediConnect/

├── backend/

├── frontend/

├── db/

├── docs/

├── README.md

├── Guia_EstandaresCodigo.md

└── Git_Workflow.md


---

## 🔐 Seguridad

- Contraseñas cifradas
- Control de acceso por roles
- Validación de sesión en cada petición
- Manejo de inactividad

---

## 📋 Metodología de Trabajo

El desarrollo se realiza bajo la metodología ágil **SCRUM**, incluyendo planificación por sprints, backlog, reuniones diarias y retrospectivas, con seguimiento en Jira.

---

## ⚙️ Instalación Básica (Entorno Local)

### Requisitos
- Node.js
- Python 3.x
- Git
- MariaDB o MySQL

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👨‍💻 Equipo de Desarrollo
- Andrés Cabrales Baena
- Sofía Segura Guacare
- Gerson Samuel Sánchez García
- Juliana García Pérez

SENA – Centro de Gestión de Mercados, Logística y Tecnologías de la Información

Bogotá, Colombia
