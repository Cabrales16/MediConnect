from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.core.config import settings
from app.models.usuario import Usuario
from sqlalchemy.orm import Session
import certifi
import os
# Asegurar que SendGrid use el certificado correcto
os.environ['SSL_CERT_FILE'] = certifi.where()

def enviar_email(db: Session, destinatario: str, asunto: str, contenido_html: str):
    usuario = db.query(Usuario).filter(Usuario.correo == destinatario).first()
    if not usuario:
        print(f"❌ No se encontró el usuario con el correo: {destinatario}")
        return False

    try:
        print(f"🔑 API Key: {settings.SENDGRID_API_KEY[:10]}...")  # Debug
        print(f"📧 Enviando desde: dgersonsamuel080@gmail.com")
        print(f"📧 Enviando a: {destinatario}")

        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        message = Mail(
            from_email=("dgersonsamuel080@gmail.com", 'Soporte Euipomed'),
            to_emails=destinatario,
            subject=asunto,
            html_content=contenido_html
        )

        respuesta = sg.send(message)
        print(f"✅ Correo enviado a {destinatario}, status: {respuesta.status_code}")
        return True

    except Exception as e:
        print(f"❌ Error al enviar el correo: {e}")
        print(f"❌ Tipo de error: {type(e)}")
        return False