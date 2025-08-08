from flask import Blueprint, request, jsonify, current_app, render_template, url_for, redirect, flash
import os
from sendgrid import SendGridAPIClient  
from sendgrid.helpers.mail import Mail
from itsdangerous import URLSafeTimedSerializer as Serializer
from werkzeug.security import generate_password_hash
from app import get_db  
import certifi
import urllib3
from dotenv import load_dotenv
load_dotenv() 



bp = Blueprint('correos', __name__)

# Configuración de SendGrid
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
os.environ['SSL_CERT_FILE'] = certifi.where()
print("🔐 SENDGRID_API_KEY:", SENDGRID_API_KEY)
# Función para generar serializer dentro del contexto
def generar_serializer():
    return Serializer(current_app.secret_key, salt='password-reset-salt')

# Ruta AJAX para verificar si el correo existe
@bp.route('/verificar_correo', methods=['POST'])
def verificar_correo():
    data = request.get_json()
    correo = data.get('correo')

    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE correo = %s", (correo,))
    existe = cursor.fetchone() is not None

    return jsonify({'existe': existe})

# Función para enviar correos
def enviar_email(destinatario, asunto, contenido_html):
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        message = Mail(
            from_email='dgersonsamuel080@gmail.com',
            to_emails=destinatario,
            subject=asunto,
            html_content=contenido_html
        )
        respuesta = sg.send(message)
        print("✅ Correo enviado:", respuesta.status_code)
    except Exception as e:
        print("❌ Error al enviar el correo:", e)

# Ruta para recuperar contraseña
@bp.route('/recuperar_contrasena', methods=['GET', 'POST'])
def recuperar_contrasena():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    if request.method == 'POST':
        correo = request.form['correo']
        cursor.execute("SELECT * FROM usuario WHERE correo = %s", (correo,))
        usuario = cursor.fetchone()

        if usuario:
            token = generar_serializer().dumps(correo)
            enlace = url_for('correos.restablecer_contrasena', token=token, _external=True)
            asunto = "Recuperación de contraseña"
            cuerpo = f"""
            <p>Hola, hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p>Si no solicitaste esto, puedes ignorar este correo.</p>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="{enlace}">Restablecer contraseña</a>
            """
            enviar_email(correo, asunto, cuerpo)
            flash("Te hemos enviado un correo para recuperar tu contraseña.", "success")
        else:
            flash("El correo electrónico no está registrado.", "error")

    return render_template('recuperar_contrasena.html')

# Ruta para restablecer contraseña
@bp.route('/restablecer_contrasena/<token>', methods=['GET', 'POST'])
def restablecer_contrasena(token):
    try:
        correo = generar_serializer().loads(token, max_age=3600)
    except:
        flash("El enlace ha expirado o es inválido.", "error")
        return redirect(url_for('auth.recuperar_contrasena'))

    db = get_db()
    cursor = db.cursor()

    if request.method == 'POST':
        nueva_contrasena = request.form['nueva_contrasena']
        contrasena_segura = generate_password_hash(nueva_contrasena)
        cursor.execute("UPDATE usuario SET contrasena = %s WHERE correo = %s", (contrasena_segura, correo))
        db.commit()
        flash("Tu contraseña ha sido restablecida con éxito.", "success")
        return redirect(url_for('auth.login'))  

    return render_template('restablecer_contrasena.html')

