## Estandares de codificación
1. Reglas para nombrar variables, clases y metodos
    - Variables y metodos en python: Se deve utilisas snake_case(se deve escribir en minusca todo y con ralla al piso para separar) como por ejemplo: mi_perfil()
    - Clases en python: Se deve usar PascalCase(Se deve enpesar con mayuscula) como por ejemplo: EstadoCitaSeguridad
    - Variables y funciones en React:Se deve usr camelCase(la primera palabrsa va en minuscula la segunda empiesa en mayuscula) como por ejemplo miPerfil
      
---

2. Comentarios y documentacion interna:
    - Comentarios de linea:usar # para comentar en python y para React // escribiendo lago que explique la linea de codigo
    - Doctrings en python:Usar triple comilla(""") para documentar modulos, clases y funciones. los parametros (Args) y los devielve el retrun
    ```py
    def obtener_usuarios_activos():
    
    # Obtiene una lista de todos los usuarios que están activos en el sistema.

    Returns:
        list: Una lista de objetos de usuario.
    ```   
   - Lógica para obtener usuarios pass
   - Comentarios en bloque (React): Susa /*....*/ Para comentarios mas extensos en archivos de React
     
---

3. Identificacio y estilos de codigo:
    -Identificacion:Usar 4 espacios para la identificacion de python y 2 espacios para la identificacion de JavaScript/React. Evitar el uso de tabulacion  
    -Longitud de linea:Limitar longitud de las lineas maximo de 79 caacteres en Python y 80 en React, Para mantener legibilidad
    -Importaciones en Rect:Agrupar las importaciones. primero las bibliotecas externas, luego los componentes finalmente los archivos de utilidades y estilos como por ejemplo.

        // Importaciones externas
        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        
        // Importaciones de componentes
        import ListaDeUsuarios from './components/ListaDeUsuarios';
        
        // Importaciones de utilidades/estilos
        import './estilos.css';

        ejemplo de las cosas que no se deven hacer
---
1. mal manejo de sangria
    from db import Base
        from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
    from sqlalchemy.orm import relationship
    class Medicamento(Base):
        __tablename__ = 'Medicamento'
        id_medicamento = Column(Integer, primary_key=True, autoincrement=True)
                nombre = Column(String(100), nullable=False)
        medicaciones = relationship("Medicacion", back_populates="medicamento")
2.mal nombramiento de variables, clases y metodos
    -Variables en python
        mi_Perfil()
    -Clases en python
        EstadocitaSeguridad
    -Variables y funciones en React
        Miperfil
4.Mal manejo de epacios 
    @bp.route('/reportar_error', methods=['POST'])
    def reportar_error():
        db = get_db()
        if 'usuario' not in session:


            flash("Debes iniciar sesión para reportar un error.", "danger")
            return redirect(url_for('main.login'))



        id_usuario = session['usuario']['id'] 
        mensaje = request.form['mensaje']




        cursor = db.cursor()
        cursor.execute("INSERT INTO error_tecnico (id_usuario, mensaje) VALUES (%s, %s)", (id_usuario, mensaje))
        db.commit()
        flash("¡Tu error fue reportado con éxito! Nuestro equipo lo revisara pronto.", "success")
        return redirect(url_for('main.index_Medico'))


        





    

