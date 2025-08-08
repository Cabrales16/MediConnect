from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from app import get_db  

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['GET', 'POST'])
def register():
    mensaje = None

    db = get_db()
    cursor = db.cursor()

    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        tipo_documento = request.form['tipo_documento']
        num_documento = request.form['num_documento']
        correo = request.form['correo']
        telefono = request.form['telefono']
        genero = request.form['genero']
        direccion = request.form['direccion']
        contrasena = request.form['contrasena']
        fecha_nacimiento = request.form['fecha_nacimiento']

        cursor.execute("SELECT * FROM usuario WHERE correo = %s", (correo,))
        usuario_existente = cursor.fetchone()

        if usuario_existente:
            mensaje = "Este correo ya está registrado."
        else:
            contrasena_segura = generate_password_hash(contrasena)
            cursor.execute("""
                INSERT INTO usuario (
                    id_rol, nombre, apellido, tipo_documento, num_documento,
                    correo, telefono, genero, direccion, contrasena,
                    fecha_registro, estado, fecha_nacimiento
                )
                VALUES (
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    CURDATE(), 'ACTIVO', %s
                )
            """, (
                1, nombre, apellido, tipo_documento, num_documento,
                correo, telefono, genero, direccion, contrasena_segura,
                fecha_nacimiento
            ))
            db.commit()
            return redirect(url_for('main.index'))

    return render_template('register.html', mensaje=mensaje)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contrasena = request.form['contrasena']

        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario WHERE correo = %s", (correo,))
        user = cursor.fetchone()

        if user:
            if check_password_hash(user['contrasena'], contrasena):
                session['usuario'] = {
                    'id': user['id_usuario'],
                    'nombre_completo': f"{user['nombre']} {user['apellido']}",
                    'correo': user['correo'],
                    'id_rol': user['id_rol']
                }
                flash("Inicio de sesión exitoso", "success")

                                # Redirigir según el rol
                if user['id_rol'] == 1:
                    return redirect(url_for('main.index'))
                elif user['id_rol'] == 2:
                    return redirect(url_for('main.index_Medico'))
                elif user['id_rol'] == 3:
                    return redirect(url_for('main.index_Administrador'))
                else:
                    return redirect(url_for('auth.login'))
            else:
                flash("Contraseña incorrecta", "danger")
        else:
            flash("Correo no registrado", "danger")

    return render_template('login.html')

@bp.route('/mi_perfil')
def mi_perfil():
    if 'usuario' not in session:
        flash("Debes iniciar sesión para acceder a tu perfil", "warning")
        return redirect(url_for('auth.login'))
    
    usuario = session['usuario']
    return render_template('mi_perfil.html', usuario=usuario)

@bp.route('/pagina_principal')
def pagina_principal():
    if 'usuario' not in session:
        return redirect(url_for('auth.login'))

    user = session['usuario']
    
    if user['id_rol'] == 2:
        return redirect(url_for('main.index_Medico'))  
    elif user['id_rol'] == 3:
        return redirect(url_for('main.index_Administrador'))
    else:
        return redirect(url_for('main.index'))



    
@bp.route('/logout')
def logout():
    session.clear()
    flash("Has cerrado sesión exitosamente.", "info")
    return redirect(url_for('auth.login'))