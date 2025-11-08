from sqlalchemy.orm import Session 
from fastapi import HTTPException
from app.models.medicacion import Medicacion, EstadoMedicacion
from app.models.medicamento import Medicamento
from app.models.usuario import Usuario
from app.schemas.medicacion import MedicacionBase
from app.models.terapia import Terapia as AsignarTerapiaModel
from app.services.email_service import enviar_email
from app.models.familiar import Familiar


def crear_medicacion_service(db: Session, medicacion_data: MedicacionBase):
    """Crea una nueva medicación y notifica por correo a los familiares del paciente."""

    paciente = db.query(Usuario).filter(Usuario.id_usuario == medicacion_data.id_paciente).first()
    medico = db.query(Usuario).filter(Usuario.id_usuario == medicacion_data.id_medico).first()
    
    if not paciente or not medico:
        raise HTTPException(status_code=404, detail="Paciente o médico no encontrado")

    medicamento = db.query(Medicamento).filter(Medicamento.id_medicamento == medicacion_data.id_medicamento).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")

    nueva_medicacion = Medicacion(
        id_paciente=medicacion_data.id_paciente,
        id_medico=medicacion_data.id_medico,
        id_medicamento=medicacion_data.id_medicamento,
        dosis=medicacion_data.dosis,
        fecha_inicio=medicacion_data.fecha_inicio,
        fecha_fin=medicacion_data.fecha_fin,
        estado=EstadoMedicacion.ACTIVA
    )

    db.add(nueva_medicacion)
    db.commit()
    db.refresh(nueva_medicacion)

    # 📩 Enviar correos a familiares
    familiares = db.query(Familiar).filter(Familiar.id_paciente == medicacion_data.id_paciente).all()

    for familiar in familiares:
        if familiar.tipo_novedad and familiar.tipo_novedad.descripcion:
            descripcion = familiar.tipo_novedad.descripcion.lower()

            if "toda informacion" in descripcion or "medicacion" in descripcion or "medicamento" in descripcion:
                asunto = "Nueva medicación asignada"
                cuerpo = f"""
                    <h2>Estimado(a) {familiar.nombre},</h2>
                    <p>Le informamos que se ha asignado una nueva medicación para el paciente 
                    <b>{paciente.nombre} {paciente.apellido}</b>, asociado a usted.</p>

                    <p><b>Detalles de la medicación:</b></p>
                    <ul>
                        <li><b>Médico:</b> {medico.nombre} {medico.apellido}</li>
                        <li><b>Medicamento:</b> {medicamento.nombre}</li>
                        <li><b>Dosis:</b> {nueva_medicacion.dosis}</li>
                        <li><b>Inicio:</b> {nueva_medicacion.fecha_inicio}</li>
                        <li><b>Fin:</b> {nueva_medicacion.fecha_fin}</li>
                    </ul>

                    <p>Por favor, no responda a este correo. Para más información comuníquese con nuestro centro de atención.</p>
                    <p>Atentamente,<br><b>Equipo de MediConnect</b></p>
                """

                enviar_email(
                    db=db,
                    destinatario=familiar.correo,
                    asunto=asunto,
                    contenido_html=cuerpo   # ✅ corregido
                )

                print(f"📧 Correo enviado a {familiar.nombre} ({familiar.correo})")
            else:
                print(f"⚪ Familiar {familiar.nombre} no cumple condición de notificación ({descripcion})")
        else:
            print(f"⚠️ Familiar {familiar.nombre} sin tipo de novedad asociado")

    return nueva_medicacion

def obtener_medicacion_por_paciente(db: Session, id_paciente: int):
    """
    Retorna la lista de medicaciones de un paciente con nombres del médico y medicamento.
    """
    meds = (
        db.query(
            Medicacion,
            Usuario.nombre.label("medico_nombre"),
            Medicamento.nombre.label("medicamento_nombre")
        )
        .join(Usuario, Usuario.id_usuario == Medicacion.id_medico)
        .join(Medicamento, Medicamento.id_medicamento == Medicacion.id_medicamento)
        .filter(Medicacion.id_paciente == id_paciente)
        .all()
    )

    result = []
    for medicacion, medico_nombre, medicamento_nombre in meds:
        result.append(
            {
                **medicacion.__dict__,
                "medico_nombre": medico_nombre,
                "medicamento_nombre": medicamento_nombre
            }
        )
    return result