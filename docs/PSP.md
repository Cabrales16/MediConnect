# 🩺📊 PSP - MediConnect

## 1. Introducción

**MediConnect** es un sistema web orientado a la gestión de servicios médicos, que incluye funcionalidades como agendamiento de citas, manejo de usuarios, administración clínica, módulos para pacientes, médicos y administradores, entre otros.

Además del desarrollo funcional, el proyecto aplicó el **Personal Software Process (PSP)** con el propósito de mejorar:

- La planificación del trabajo
- La precisión en las estimaciones
- La calidad del software
- La reducción y control de defectos
- La productividad individual del desarrollador

Este documento describe cómo se integraron **herramientas informáticas de apoyo** dentro del proyecto para sustentar el método PSP, tomando como base la estructura real del repositorio y el proceso utilizado por el equipo.

---

## 2. Aplicación del PSP en el Proyecto

El PSP se integró en todas las etapas de desarrollo:

1. **Planificación**  
2. **Diseño**  
3. **Codificación**  
4. **Compilación y Pruebas**  
5. **Registro de tiempos y defectos**  
6. **Análisis posterior (Postmortem)**

Estas actividades están directamente relacionadas con las carpetas del proyecto:

- `backend/` → API, validaciones, seguridad  
- `bd/` → modelos SQL, migraciones Alembic  
- `frontend/` → módulos Paciente, Médico, Admin, Login, Registro, Agendamiento, etc.  
- `docs/` → evidencias, métricas PSP y capturas del proceso  

---

## 3. Herramientas Digitales Utilizadas

### 🧩 3.1 Gestión del Proyecto – **JIRA**

Para el control del proyecto se utilizó **JIRA**, donde se administraron:

- Historias de usuario y épicas  
- Subtareas por módulo (Paciente, Médico, Admin, etc.)  
- Estimaciones iniciales  
- Flujo de trabajo (To Do → In Progress → Code Review → Done)  
- Registro de incidencias (defectos)  
- Sprint Planning, Daily y Review  

En relación con el PSP, JIRA fue fundamental para:

- Comparar **estimaciones vs. tiempo real**
- Registrar defectos con trazabilidad
- Controlar el avance real de cada integrante
- Mantener evidencia del proceso mediante boards

---

### 📊 3.2 Métricas y Análisis – **Excel**

Aunque JIRA gestionaba los sprints, las métricas PSP se elaboraron con **Excel**, principalmente para controlar:

- Tiempos reales por fase PSP  
- Estimaciones de cada desarrollador  
- Registro de defectos: tipo, fase, tiempo de resolución  
- Comparación entre tiempo estimado y real  
- Productividad por módulo  
- Gráficos comparativos para análisis post-implementación

En Excel se llevaron formatos como:

- Plantilla PSP de tiempos  
- Plantilla PSP de defectos  
- Hoja de cálculo de post-análisis  
- Gráficos de tendencia (tiempos, defectos, productividad)

---

### 🕒 3.3 Registro de Tiempo (Time Logging)

Los tiempos se registraron mediante:

- **Work Logged en JIRA**
- **Registros manuales PSP en Excel**

Cada actividad PSP incluyó:

| Fase PSP | Qué se registró |
|----------|------------------|
| Planificación | Estimación inicial por módulo |
| Diseño | Tiempo de diagramación y organización de BD/API |
| Codificación | Tiempo real por componente o endpoint |
| Compilación | Errores detectados en ejecución |
| Pruebas | Validación funcional completa |
| Posanálisis | Desviaciones y mejoras |

---

### 🐞 3.4 Control de Defectos (Defect Tracking)

La gestión de defectos se realizó mediante:

- **Issues en JIRA**
- Registro del PSP en Excel (para análisis estadístico)

Cada defecto incluía:

- Descripción técnica  
- Módulo afectado (Frontend/Backend/BD)  
- Fase donde se introdujo  
- Fase donde se detectó  
- Severidad  
- Tiempo invertido en corregirlo  
- Evidencia (capturas dentro del directorio `docs/`)  

Patrones detectados:

- La mayoría de defectos fueron del **frontend**, especialmente en manejo de estados y formularios.  
- El backend presentó defectos relacionados con validaciones y consultas SQL.  
- Muchos defectos recurrentes fueron eliminados al mejorar el diseño inicial en BD.  

---

## 4. Aplicación del PSP sobre la estructura del proyecto

### 📁 `frontend/`
Los módulos Paciente, Médico, Admin, Agendamiento y Login se separaron en tareas individuales en JIRA.  
Las estimaciones se realizaron en Excel y los defectos se registraron como issues.

### 📁 `backend/`
Las tareas del API se gestionaron como historias técnicas, incluyendo endpoints, validaciones y controladores.

### 📁 `bd/`
Las migraciones y ajustes en SQL se registraron como actividades de diseño y corrección dentro del PSP.

### 📁 `docs/`
Incluye capturas, métricas, análisis PSP y evidencia del flujo de trabajo digital.

---

## 5. Resultados del Uso del PSP

Gracias a la integración PSP + JIRA + Excel, se lograron:

- ✔ Estimaciones cada vez más precisas (reducción de desviación entre 20% y 40%)  
- ✔ Reducción significativa de defectos recurrentes  
- ✔ Mejor planificación por módulos y subtareas  
- ✔ Mayor productividad en frontend y backend  
- ✔ Evidencia documental completa en `docs/`  
- ✔ Análisis cuantitativo claro para auditorías o entregas académicas  

---

## 6. Conclusión

El uso del **Personal Software Process**, junto con herramientas como **JIRA** y **Excel**, convirtió a MediConnect en un proyecto no solo funcional, sino también **medido**, **controlado**, y **documentado con rigurosidad**.  
El proceso permitió mejorar la calidad del código, optimizar tiempos y obtener métricas reales del desempeño, logrando un flujo de desarrollo profesional y eficiente.
