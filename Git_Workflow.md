# 🧠 Git Workflow - Proyecto MEDICONNECT

Este documento define el flujo de trabajo estándar para colaborar de forma eficiente en el proyecto MEDICONNECT, que contiene un backend en Python (FastAPI) y un frontend en ReactJS.

---

## 📂 Ramas principales

- `main`: rama estable. Solo contiene código en producción.
- `develop`: rama de integración. Contiene código probado antes de subir a producción.

---

## 🌿 Tipos de ramas

Usa los siguientes prefijos al nombrar tus ramas:

| Tipo       | Prefijo      | Ejemplo                        |
|------------|--------------|--------------------------------|
| Funcionalidad | `feature/`   | `feature/login-frontend`        |
| Corrección  | `fix/`       | `fix/validacion-email`          |
| Hotfix (urgente) | `hotfix/`    | `hotfix/error-en-produccion`   |
| Preparación de versión | `release/`   | `release/v1.0.0`               |

---

## 🧾 Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial limpio y entendible.

### Formato:
<tipo>(módulo): descripción breve

### Tipos más comunes:

- `feat`: nueva funcionalidad
- `fix`: corrección de error
- `docs`: cambios en documentación
- `style`: cambios de estilo (espacios, indentación)
- `refactor`: reestructuración de código sin cambiar comportamiento
- `test`: añadir o mejorar pruebas
- `chore`: tareas menores (build, dependencias)

### Ejemplos:
```bash
git commit -m "feat(login): validación de campos en frontend"
git commit -m "fix(api): corrige error al agendar cita sin médico"
```

---

## 🔁 Frecuencia de push/pull
- ``git pull origin develop``: siempre antes de empezar a trabajar y antes de subir tu rama.

- ``git push origin <tu-rama>``: al menos una vez al día o cuando completes una parte funcional.

- Evita acumular muchos cambios sin subir; ayuda al seguimiento y revisión.

---

## 🔀 Política de Pull Requests (PR)
1. **Toda rama de trabajo debe surgir desde ``develop``**.

2. **Nunca hacer PR directamente a ``main``**.

3. Antes de abrir un PR:

    - Asegúrate de hacer ``pull`` para evitar conflictos.

    - Ejecuta pruebas locales (si aplica).

    - Verifica formato y estilo de código con linters.

4. **Crear el PR hacia ``develop``, incluyendo**:

    - Descripción clara de lo que se hizo.

    - Referencias a tareas o issues (si se usa un gestor como GitHub Issues o Trello).

5. **Revisión requerida por al menos 1 miembro del equipo**.

6. **Merge** se hace solo si:

    - La rama pasa pruebas automáticas (si existen).

    - No hay conflictos.

    - Ha sido aprobada por otro miembro.

---

## ✅ Buenas prácticas
- Divide tus cambios en commits pequeños y significativos.

- Usa nombres de ramas y commits descriptivos.

- No mezcles frontend y backend en el mismo commit si no es necesario.

- Usa ``prettier`` y linters antes de subir (ya configurados en tu proyecto con ``.prettierrc``, ``.eslintrc`` y ``.hintrc``).

---

## 🧪 Deploy
- Solo se realiza deploy desde ``main``.

- Un ``release`` requiere revisión total antes de mezclar con ``main``.

---

## 📌 Ejemplo de flujo resumido
```bash
git checkout develop
git pull
git checkout -b feature/agendamiento-citas

# Trabajas, haces commits...

git add .
git commit -m "feat(agendamiento): permite seleccionar fecha disponible"
git pull origin develop
git push origin feature/agendamiento-citas

# En GitHub o GitLab: crear Pull Request a develop
```
