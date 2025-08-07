## Estándares de Codificación

### 1. Reglas para nombrar variables, clases y métodos

- **Variables y métodos en Python:**  
  Se debe utilizar `snake_case` (todo en minúsculas y separado por guion bajo), por ejemplo:  
  `mi_perfil()`

- **Clases en Python:**  
  Se debe usar `PascalCase` (cada palabra inicia con mayúscula), por ejemplo:  
  `EstadoCitaSeguridad`

- **Variables y funciones en React:**  
  Se debe usar `camelCase` (la primera palabra en minúscula y las siguientes con mayúscula), por ejemplo:  
  `miPerfil`

---

### 2. Comentarios y documentación interna

- **Comentarios de línea:**  
  Usar `#` en Python y `//` en React para explicar líneas de código.

- **Docstrings en Python:**  
  Usar triple comilla para documentar módulos, clases y funciones. Incluir los parámetros (`Args`) y lo que retorna (`Returns`).  
  Ejemplo:

  ```python
  def obtener_usuarios_activos():
      \"\"\"
      Obtiene una lista de todos los usuarios que están activos en el sistema.

      Returns:
          list: Una lista de objetos de usuario.
      \"\"\"
      pass
Comentarios en bloque (React):
Usar /* ... */ para comentarios más extensos.

---

### 3. Identación y estilos de código
- **Identación:**
  Usar 4 espacios para Python y 2 espacios para JavaScript/React.
  Evitar el uso de tabulaciones.

- **Longitud de línea:**
  Limitar la longitud de las líneas a un máximo de 79 caracteres en Python y 80 en React para mantener la legibilidad.

- **Importaciones en React:**
  Agrupar las importaciones en el siguiente orden:

  1. Bibliotecas externas
  2. Componentes
  3. Utilidades y estilos

  Ejemplo:

  ```js
  // Importaciones externas
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  // Importaciones de componentes
  import ListaDeUsuarios from './components/ListaDeUsuarios';

  // Importaciones de utilidades/estilos
  import './estilos.css';
  ```
  
---

### Ejemplos de malas prácticas que deben evitarse
#### 1. Mal manejo de sangría
```py
from db import Base
    from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship

class Medicamento(Base):
    __tablename__ = 'Medicamento'
    id_medicamento = Column(Integer, primary_key=True, autoincrement=True)
            nombre = Column(String(100), nullable=False)
    medicaciones = relationship("Medicacion", back_populates="medicamento")

```
#### 2. Mal nombramiento de variables, clases y métodos
- Variables en Python:
  ```py
  mi_Perfil()
  ```
- Clases en Python:
  ```py
  EstadocitaSeguridad
  ```
- Variables y funciones en React:
  ```js
  Miperfil
  ```
#### Mal manejo de espacios en blanco
  ```py
  @bp.route('/reportar_error', methods=['POST'])
  def reportar_error():
    db = get_db()
    if 'usuario' not in session:
        flash("Debes iniciar sesión para reportar un error.", "danger")
        return redirect(url_for('main.login'))
    
    id_usuario = session['usuario']['id']
    mensaje = request.form['mensaje']
    
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO error_tecnico (id_usuario, mensaje) VALUES (%s, %s)",
        (id_usuario, mensaje)
    )
    db.commit()
    
    flash("¡Tu error fue reportado con éxito! Nuestro equipo lo revisará pronto.", "success")
    return redirect(url_for('main.index_Medico'))
  ```
