from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.indicaciones import Indicaciones
from app.models.medico import Medico
from app.models.tipo_Novedad import TipoNovedad
from app.models.familiar import Familiar
from app.schemas.indicacion import CrearIndicacion, IndicacionesPaciente
from app.models.usuario import Usuario
from datetime import datetime
from app.services.email_service import enviar_email


def crear_indicacion(db: Session, indicacion: CrearIndicacion):
    paciente = db.query(Usuario).filter(Usuario.id_usuario == indicacion.id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    medico = db.query(Usuario).filter(Usuario.id_usuario == indicacion.id_medico).first() 
    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")
    indicacion_existente = db.query(Indicaciones).filter(Indicaciones.id_cita == indicacion.id_cita).first()
    if indicacion_existente:
        raise HTTPException(status_code=400, detail="Ya existe una indicación para esta cita")
    

    ahora = datetime.now()
    nueva_indicacion = Indicaciones(
        id_medico=indicacion.id_medico,
        id_paciente=indicacion.id_paciente,
        id_cita=indicacion.id_cita,
        fecha=indicacion.fecha or ahora.date(),  # usa la actual si no la envían
        hora=indicacion.hora or ahora.time(),    # usa la actual si no la envían
        estado="PROGRAMADA",                     # fijo en backend
        observaciones=indicacion.observaciones
    )

    db.add(nueva_indicacion)
    db.commit()
    db.refresh(nueva_indicacion)
    #filtrado de familiares para enviar correos 
    familiares = db.query(Familiar).filter(Familiar.id_paciente == indicacion.id_paciente).all()
    for familiar in familiares:
        if familiar.tipo_novedad and familiar.tipo_novedad.descripcion:
            descripcion = familiar.tipo_novedad.descripcion.lower()
    
            if "toda informacion" in descripcion or "medicacion" in descripcion or "medicación" in descripcion:
                asunto = "Nueva indicación médica registrada"
                cuerpo = f"""
                    <h2>Estimado(a) {familiar.nombre},</h2>
                    <p>Le informamos que se ha registrado una nueva indicación médica para el paciente 
                    <b>{paciente.nombre} {paciente.apellido}</b>, asociado a usted.</p>
    
                    <p><b>Detalles de la indicación:</b></p>
                    <ul>
                        <li><b>Médico:</b> {medico.nombre} {medico.apellido}</li>
                        <li><b>Fecha:</b> {nueva_indicacion.fecha}</li>
                        <li><b>Hora:</b> {nueva_indicacion.hora}</li>
                        <li><b>Observaciones:</b> {nueva_indicacion.observaciones}</li>
                    </ul>
    
                    <p>Por favor, no responda a este correo. Para más información comuníquese con nuestro centro de atención.</p>
                    <p>Atentamente,<br><b>Equipo de MediConnect</b></p>
                """
                enviar_email(db, familiar.correo, asunto, cuerpo)
                print(f"📧 Correo enviado a familiar {familiar.nombre} ({familiar.correo})")
            else:
                print(f"⚪ Familiar {familiar.nombre} no cumple condición de notificación ({descripcion})")
        else:
            print(f"⚠️ Familiar {familiar.nombre} sin tipo de novedad asociado")
    return nueva_indicacion

def obtener_indicaciones_paciente(db: Session, id_paciente: int):
    # 🔹 Hacemos join con la tabla de usuarios (médico)
    resultados = (
        db.query(Indicaciones, Usuario)
        .join(Usuario, Usuario.id_usuario == Indicaciones.id_medico)
        .filter(Indicaciones.id_paciente == id_paciente)
        .all()
    )

    # 🔹 Construimos la lista con el formato del esquema IndicacionesPaciente
    indicaciones_lista = []
    for indicacion, medico in resultados:
        indicaciones_lista.append(
            IndicacionesPaciente(
                id_indicacion=indicacion.id_indicacion,
                id_medico=indicacion.id_medico,
                id_paciente=indicacion.id_paciente,
                id_cita=indicacion.id_cita,
                medico_nombre=f"{medico.nombre} {medico.apellido}",  # 👈 campo requerido
                estado=indicacion.estado,
                observaciones=indicacion.observaciones
            )
        )

    return indicaciones_lista