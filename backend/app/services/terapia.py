import os
from datetime import datetime
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from app.models.crearTerapia import CrearTerapia
from app.models.usuario import Usuario
from app.schemas.crearTerapia import AsignarTerapiaBase
from app.models.terapia import Terapia as AsignarTerapiaModel
from app.services.email_service import enviar_email
from app.models.familiar import Familiar
# Carpeta física donde se guardan los archivos
UPLOAD_DIRECTORY = "app/static/terapias"


def guardar_archivo_terapia(file: UploadFile, db: Session, id_admin: int, nombre: str) -> CrearTerapia:
    """Guarda un archivo PDF y su registro en BD."""
    admin = db.query(Usuario).filter(Usuario.id_usuario == id_admin).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Administrador no encontrado")

    os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"terapia_{id_admin}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)

    # Guardar archivo físico
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # ✅ Guardar solo la ruta relativa, sin /static/
    relative_path = f"terapias/{filename}"

    nueva_terapia = CrearTerapia(
        id_admin=id_admin,
        nombre=nombre,
        estado="Activa",
        archivo=relative_path
    )
    db.add(nueva_terapia)
    db.commit()
    db.refresh(nueva_terapia)
    
    return nueva_terapia


def obtener_terapias(db: Session):
    """Obtiene todas las terapias."""
    return db.query(CrearTerapia).all()


def eliminar_terapia(db: Session, id_terapia: int):
    """Elimina una terapia y su archivo asociado."""
    terapia = db.query(CrearTerapia).filter(CrearTerapia.id_terapia == id_terapia).first()
    if not terapia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Terapia no encontrada")

    # Eliminar archivo físico
    file_path = os.path.join("app/static", terapia.archivo)
    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(terapia)
    db.commit()


def actualizar_toda_terapia(db: Session, id_terapia: int, nombre: str, estado: str, file: UploadFile):
    """Actualiza una terapia con nuevo archivo."""
    terapia = db.query(CrearTerapia).filter(CrearTerapia.id_terapia == id_terapia).first()
    if not terapia:
        raise HTTPException(status_code=404, detail="Terapia no encontrada")

    # Eliminar archivo anterior
    if terapia.archivo:
        old_path = os.path.join("app/static", terapia.archivo)
        if os.path.exists(old_path):
            os.remove(old_path)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"terapia_{id_terapia}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # ✅ Guardar solo la ruta relativa
    relative_path = f"terapias/{filename}"

    terapia.nombre = nombre
    terapia.estado = estado
    terapia.archivo = relative_path

    db.commit()
    db.refresh(terapia)
    return terapia

# crud.py


def asignar_terapia(db: Session, data: AsignarTerapiaBase) -> AsignarTerapiaModel:
    """Asigna una terapia a un paciente con un médico y notifica a los familiares."""

    # 🔍 Validaciones
    medico = db.query(Usuario).filter(Usuario.id_usuario == data.id_medico).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")

    paciente = db.query(Usuario).filter(Usuario.id_usuario == data.id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    terapia_base = (
        db.query(CrearTerapia)
        .filter(CrearTerapia.id_terapia == data.id_CrearTerapia)
        .first()
    )
    if not terapia_base:
        raise HTTPException(status_code=404, detail="La terapia base no existe")

    # 🆕 Crear la asignación
    nueva_asignacion = AsignarTerapiaModel(
        id_CrearTerapia=data.id_CrearTerapia,
        id_medico=data.id_medico,
        id_paciente=data.id_paciente,
        estado="ACTIVA",
        inicio=data.inicio,
        fin=data.fin
    )

    db.add(nueva_asignacion)
    db.commit()
    db.refresh(nueva_asignacion)

    # 📩 Enviar correos a familiares
    familiares = db.query(Familiar).filter(Familiar.id_paciente == data.id_paciente).all()
    for familiar in familiares:
        if familiar.tipo_novedad and familiar.tipo_novedad.descripcion:
            descripcion = familiar.tipo_novedad.descripcion.lower()

            if "toda informacion" in descripcion or "terapia" in descripcion:
                asunto = "Nueva terapia asignada"
                cuerpo = f"""
                    <h2>Estimado(a) {familiar.nombre},</h2>
                    <p>Le informamos que se ha asignado una nueva terapia para el paciente 
                    <b>{paciente.nombre} {paciente.apellido}</b>, asociado a usted.</p>

                    <p><b>Detalles de la terapia:</b></p>
                    <ul>
                        <li><b>Médico:</b> {medico.nombre} {medico.apellido}</li>
                        <li><b>Terapia:</b> {terapia_base.nombre}</li>
                        <li><b>Inicio:</b> {nueva_asignacion.inicio}</li>
                        <li><b>Fin:</b> {nueva_asignacion.fin}</li>
                    </ul>

                    <p>Se adjunta el documento PDF con las indicaciones de la terapia.</p>
                    <p>Por favor, no responda a este correo. Para más información comuníquese con nuestro centro de atención.</p>
                    <p>Atentamente,<br><b>Equipo de MediConnect</b></p>
                """

                # 📎 Construir ruta completa del archivo
                ruta_pdf = terapia_base.archivo

                # Evitar duplicar carpeta si ya incluye "terapias/"
                if not ruta_pdf.startswith("app/static"):
                    ruta_pdf = os.path.join("app/static", ruta_pdf)

                # Normalizar separadores de ruta
                ruta_pdf = os.path.normpath(ruta_pdf)

                # ✅ Verificar que el archivo existe antes de enviarlo
                if os.path.exists(ruta_pdf):
                    enviar_email(
                        db,
                        familiar.correo,
                        asunto,
                        cuerpo,
                        archivo_adjunto=ruta_pdf
                    )
                    print(f"📧 Correo enviado a familiar {familiar.nombre} con adjunto {ruta_pdf}")
                else:
                    print(f"⚠️ No se encontró el archivo PDF: {ruta_pdf}")
            else:
                print(f"⚪ Familiar {familiar.nombre} no cumple condición de notificación ({descripcion})")
        else:
            print(f"⚠️ Familiar {familiar.nombre} sin tipo de novedad asociado")

    # ✅ Devolver datos combinados
    return {
        "id_terapia": nueva_asignacion.id_terapia,
        "id_CrearTerapia": terapia_base.id_terapia,
        "id_medico": nueva_asignacion.id_medico,
        "id_paciente": nueva_asignacion.id_paciente,
        "estado": nueva_asignacion.estado,
        "inicio": nueva_asignacion.inicio,
        "fin": nueva_asignacion.fin,
        "nombre": terapia_base.nombre,
        "pdf": terapia_base.archivo
    }




def obtener_terapias(db: Session):
    """Obtiene todas las terapias registradas."""
    terapias = db.query(CrearTerapia).all()
    return terapias

def obtener_terapias_paciente(db: Session, id_usuario: int):
    """Obtiene las terapias asignadas a un paciente específico."""
    terapias = (
        db.query(
            AsignarTerapiaModel.id_terapia,
            CrearTerapia.nombre.label("nombre"),
            CrearTerapia.archivo.label("pdf"),
            AsignarTerapiaModel.estado,
            AsignarTerapiaModel.inicio,
            AsignarTerapiaModel.fin,
            Usuario.nombre.label("nombre_medico"),
        )
        .join(CrearTerapia, CrearTerapia.id_terapia == AsignarTerapiaModel.id_CrearTerapia)
        .join(Usuario, Usuario.id_usuario == AsignarTerapiaModel.id_medico)
        .filter(AsignarTerapiaModel.id_paciente == id_usuario)
        .all()
    )

    # ✅ Convertir cada fila a dict
    return [
        {
            "id_terapia": t.id_terapia,
            "nombre": t.nombre,
            "pdf": t.pdf,
            "estado": t.estado,
            "inicio": t.inicio,
            "fin": t.fin,
            "nombre_medico": t.nombre_medico,
        }
        for t in terapias
    ]
