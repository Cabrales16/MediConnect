from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from app import get_db

bp = Blueprint('errores', __name__)

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
    flash("¡Tu error fue reportado con éxito! Nuestro equipo lo revisará pronto.", "success")
    return redirect(url_for('main.index_Medico'))