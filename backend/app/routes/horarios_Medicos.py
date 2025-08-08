from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from app import get_db

bp = Blueprint('horariosM', __name__)



# Ruta para obtener los horarios de un médico específico
@bp.route('/horarios/<int:id_medico>')
def horarios_medico(id_medico):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT dia, hora_inicio, hora_fin FROM horario WHERE id_medico = %s", (id_medico,))
    horarios = cursor.fetchall()
    return render_template('horarios_medicos.html', horarios=horarios, id_medico=id_medico)


@bp.route('/citas/<int:id_medico>/<dia>')
def ver_citas_dia(id_medico, dia):
    db = get_db()
    cursor = db.cursor()
    dias_es_en = {
    'lunes': 'Monday',
    'martes': 'Tuesday',
    'miercoles': 'Wednesday',
    'miércoles': 'Wednesday',
    'jueves': 'Thursday',
    'viernes': 'Friday',
    'sabado': 'Saturday',
    'sábado': 'Saturday',
    'domingo': 'Sunday'
}

    dia_ingles = dias_es_en.get(dia.lower())

    if not dia_ingles:
        flash("Día inválido", "danger")
        return redirect(url_for('main.index_Medico'))

    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            c.id_paciente,               
            c.fecha, 
            c.hora, 
            u.nombre, 
            u.apellido, 
            c.tipo_cita, 
            c.estado, 
            h.nombre AS hospital
        FROM cita c
        JOIN usuario u ON c.id_paciente = u.id_usuario
        JOIN hospital h ON c.id_hospital = h.id_hospital
        WHERE c.id_medico = %s AND DAYNAME(c.fecha) = %s
    """, (id_medico, dia_ingles))

    citas = cursor.fetchall()
    print("Día recibido en la URL:", dia)
    print("Día traducido a inglés:", dia_ingles)
    
    return render_template('citas_dia.html', citas=citas, dia=dia, id_medico=id_medico)


@bp.route('/historial/<int:id_paciente>')
def historial_paciente(id_paciente):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Obtener datos del paciente desde la vista
    cursor.execute("SELECT nombre_paciente AS nombre, apellido_paciente AS apellido FROM vista_planilla WHERE id_paciente = %s LIMIT 1", (id_paciente,))
    paciente = cursor.fetchone()

    if not paciente:
        flash("Paciente no encontrado", "danger")
        return redirect(url_for('main.index_Medico'))

    # Obtener datos desde la vista como historial
    cursor.execute("""
        SELECT fecha, tipo_cita AS diagnostico, estado_cita AS tratamiento, ubicacion AS observaciones
        FROM vista_planilla
        WHERE id_paciente = %s
    """, (id_paciente,))
    
    historial = cursor.fetchall()

    return render_template('historial.html', historial=historial, paciente=paciente)