from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.usuario import Usuario
from app.models.medico import Medico 

def obtener_Usuarios(db: Session):
    usuarios_db = (
        db.query(
            Usuario.id_rol.label("id_rol"),
            Usuario.num_documento.label("num_documento"),   
            Usuario.nombre.label("nombre"),
            Usuario.apellido.label("apellido")
        )
        .all()
    )

    if not usuarios_db:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return [
        {
            "id_rol": u.id_rol,
            "num_documento": u.num_documento,
            "nombre": u.nombre,
            "apellido": u.apellido,
        }
        for u in usuarios_db
    ]



def obtener_pacientes_administrador_medico(db: Session, id_usuario: int):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Paciente o Administrador
    if usuario.id_rol in [1, 3]:
        obtener_paciente = (
            db.query(
                Usuario.fecha_registro,
                Usuario.id_rol.label("id_rol"),
                Usuario.nombre.label("nombre"),
                Usuario.apellido.label("apellido"),
                Usuario.tipo_documento.label("tipo_documento"),
                Usuario.num_documento.label("num_documento"),
                Usuario.telefono.label("telefono"),
                Usuario.genero.label("genero"),
                Usuario.correo.label("correo"),
                Usuario.direccion.label("direccion"),
                Usuario.fecha_nacimiento.label("fecha_nacimiento"),
            )
            .filter(Usuario.id_usuario == id_usuario)
            .all()
        )

        return [
            {
                "fecha_registro": p.fecha_registro,
                "id_rol": p.id_rol,
                "nombre": p.nombre,
                "apellido": p.apellido,
                "tipo_documento": p.tipo_documento,
                "num_documento": p.num_documento,
                "telefono": p.telefono,
                "genero": p.genero,
                "correo": p.correo,
                "direccion": p.direccion,
                "fecha_nacimiento": p.fecha_nacimiento,
            }
            for p in obtener_paciente
        ]

    # Médico
    elif usuario.id_rol == 2:
        obtener_medico = (
            db.query(
                Usuario.fecha_registro,
                Usuario.id_rol.label("id_rol"),
                Usuario.nombre.label("nombre"),
                Usuario.apellido.label("apellido"),
                Usuario.tipo_documento.label("tipo_documento"),
                Usuario.num_documento.label("num_documento"),
                Usuario.telefono.label("telefono"),
                Usuario.genero.label("genero"),
                Usuario.correo.label("correo"),
                Usuario.direccion.label("direccion"),
                Usuario.fecha_nacimiento.label("fecha_nacimiento"),
                Medico.especialidad.label("especialidad"),
                Medico.calificacion.label("calificacion"),
            )
            .join(Medico, Medico.id_medico == Usuario.id_usuario)
            .filter(Usuario.id_usuario == id_usuario)
            .first()
        )
    
        if not obtener_medico:
            raise HTTPException(status_code=404, detail="Médico no encontrado")
    
        return {
            "fecha_registro": obtener_medico.fecha_registro,
            "id_rol": obtener_medico.id_rol,
            "nombre": obtener_medico.nombre,
            "apellido": obtener_medico.apellido,
            "tipo_documento": obtener_medico.tipo_documento,
            "num_documento": obtener_medico.num_documento,
            "telefono": obtener_medico.telefono,
            "genero": obtener_medico.genero,
            "correo": obtener_medico.correo,
            "direccion": obtener_medico.direccion,
            "fecha_nacimiento": obtener_medico.fecha_nacimiento,
            "especialidad": obtener_medico.especialidad,
            "calificacion": obtener_medico.calificacion,
        }