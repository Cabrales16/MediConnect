from flask import Blueprint, render_template, session, redirect, url_for, flash
from app import get_db  

bp = Blueprint('main', __name__)

@bp.route('/index')
def index():  
    if 'usuario' not in session:
        flash("Debes iniciar sesión para acceder a esta página", "warning")
        return redirect(url_for('auth.login'))  # importante: usar 'auth.login' si se usa blueprint en auth

    usuario = session['usuario']
    return render_template('index.html', usuario=usuario)


@bp.route('/index_Medico')
def index_Medico():
    if 'usuario' not in session:
        flash("Debes iniciar sesión para acceder a esta página", "warning")
        return redirect(url_for('auth.login'))

    usuario = session['usuario']
    return render_template('index_Medico.html', usuario=usuario)


@bp.route('/index_administrador')
def index_Administrador():
    if 'usuario' not in session:
        return redirect(url_for('auth.login'))

    usuario = session['usuario']

    # Obtener todos los médicos (usuarios con id_rol = 2)
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Usuario WHERE id_rol = 2")
    medicos = cursor.fetchall()

    return render_template('index_Administrador.html', usuario=usuario, medicos=medicos)