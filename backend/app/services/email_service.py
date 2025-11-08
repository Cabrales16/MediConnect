from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.core.config import settings
from app.models.usuario import Usuario
from sqlalchemy.orm import Session
import certifi
import os
# Asegurar que SendGrid use el certificado correcto
os.environ['SSL_CERT_FILE'] = certifi.where()

import base64
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
from sqlalchemy.orm import Session
from app.models import Usuario
from app.core.config import settings


def enviar_email(db: Session, destinatario: str, asunto: str, contenido_html: str, archivo_adjunto: str = None):
    usuario = db.query(Usuario).filter(Usuario.correo == destinatario).first()
    if not usuario:
        print(f"❌ No se encontró el usuario con el correo: {destinatario}")
        return False

    try:
        print(f"🔑 API Key: {settings.SENDGRID_API_KEY[:10]}...")
        print(f"📧 Enviando desde: andrescabrales322@gmail.com")
        print(f"📧 Enviando a: {destinatario}")

        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        message = Mail(
            from_email=("andrescabrales322@gmail.com", "Soporte Euipomed"),
            to_emails=destinatario,
            subject=asunto,
            html_content=contenido_html
        )

        # 📎 Adjuntar archivo PDF si existe
        if archivo_adjunto:
            try:
                with open(archivo_adjunto, "rb") as f:
                    archivo_data = f.read()
                    encoded_file = base64.b64encode(archivo_data).decode()
                    attachedFile = Attachment(
                        FileContent(encoded_file),
                        FileName(archivo_adjunto.split("/")[-1]),
                        FileType("application/pdf"),
                        Disposition("attachment")
                    )
                    message.attachment = attachedFile
                    print(f"📎 Archivo adjuntado: {archivo_adjunto}")
            except Exception as e:
                print(f"⚠️ No se pudo adjuntar el archivo: {e}")

        respuesta = sg.send(message)
        print(f"✅ Correo enviado a {destinatario}, status: {respuesta.status_code}")
        return True

    except Exception as e:
        print(f"❌ Error al enviar el correo: {e}")
        print(f"❌ Tipo de error: {type(e)}")
        return False
