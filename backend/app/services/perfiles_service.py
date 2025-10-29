from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.usuario import Usuario
from app.models.medico import Medico
from app.schemas.perfiles import (
    UsuarioResponseGene,
    PacienteAdmResponse,
    MedicoResponseTar,
    EstadoUsuarioResponse,
    CambiarRol,
    CambiarDatosUsuario
)


def obtener_Usuarios(db: Session):
    usuarios_db = (
        db.query(
            Usuario.id_rol.label("id_rol"),
            Usuario.num_documento.label("num_documento"),
            Usuario.nombre.label("nombre"),
            Usuario.apellido.label("apellido"),
        ).all()
    )

    if not usuarios_db:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios")

    return [
        UsuarioResponseGene(
            id_rol=u.id_rol,
            num_documento=u.num_documento,
            nombre=u.nombre,
            apellido=u.apellido,
        )
        for u in usuarios_db
    ]


def obtener_por_rol(db: Session, id_rol: int):
    """
    Retorna los usuarios filtrados por rol:
    1 = Administrador
    2 = Médico
    3 = Paciente
    """
    if id_rol not in [1, 2, 3]:
        raise HTTPException(status_code=400, detail="Rol no válido")

    # Paciente o Administrador
    if id_rol in [1, 3]:
        usuarios = (
            db.query(
                Usuario.id_usuario,
                Usuario.fecha_registro,
                Usuario.id_rol,
                Usuario.nombre,
                Usuario.apellido,
                Usuario.tipo_documento,
                Usuario.num_documento,
                Usuario.telefono,
                Usuario.genero,
                Usuario.correo,
                Usuario.direccion,
                Usuario.fecha_nacimiento,
                Usuario.id_rol
            )
            .filter(Usuario.id_rol == id_rol)
            .all()
        )

        if not usuarios:
            raise HTTPException(status_code=404, detail="No se encontraron usuarios con este rol")

        return [
            PacienteAdmResponse(
                id_usuario=u.id_usuario,
                nombre=u.nombre,
                apellido=u.apellido,
                tipo_documento=u.tipo_documento,
                num_documento=u.num_documento,
                correo=u.correo,
                telefono=u.telefono,
                genero=u.genero,
                direccion=u.direccion,
                fecha_nacimiento=u.fecha_nacimiento,
                fecha_registro=u.fecha_registro,
                id_rol=u.id_rol
            )
            for u in usuarios
        ]

    # Médico
    elif id_rol == 2:
        medicos = (
            db.query(
                Usuario.id_usuario,
                Usuario.fecha_registro,
                Usuario.nombre,
                Usuario.apellido,
                Usuario.tipo_documento,
                Usuario.num_documento,
                Usuario.correo,
                Usuario.telefono,
                Usuario.genero,
                Usuario.direccion,
                Usuario.fecha_nacimiento,
                Medico.especialidad,
                Medico.calificacion,
                Usuario.id_rol
            )
            .join(Medico, Medico.id_medico == Usuario.id_usuario)
            .filter(Usuario.id_rol == id_rol)
            .all()
        )

        if not medicos:
            raise HTTPException(status_code=404, detail="No se encontraron médicos")

        return [
            MedicoResponseTar(
                id_usuario=m.id_usuario,
                fecha_registro=m.fecha_registro,
                nombre=m.nombre,
                apellido=m.apellido,
                tipo_documento=m.tipo_documento,
                num_documento=m.num_documento,
                correo=m.correo,
                telefono=m.telefono,
                genero=m.genero,
                direccion=m.direccion,
                fecha_nacimiento=m.fecha_nacimiento,
                especialidad=m.especialidad,
                calificacion=m.calificacion,
                id_rol=m.id_rol
            )
            for m in medicos
        ]

def cambiar_rol(db:Session, nuevo_rol:CambiarRol, id_usuario:int):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.id_rol = nuevo_rol.id_rol
    db.commit()
    db.refresh(usuario)
    return {"mensaje": "Rol actualizado correctamente", "id_usuario": usuario.id_usuario, "nuevo_rol": usuario.id_rol}

def cambiar_datos_usuario(db:Session, nuevos_datos:CambiarDatosUsuario, id_usuario:int):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if nuevos_datos.nombre is not None:
        usuario.nombre = nuevos_datos.nombre
    if nuevos_datos.apellido is not None:
        usuario.apellido = nuevos_datos.apellido
    if nuevos_datos.correo is not None:
        usuario.correo = nuevos_datos.correo

    db.commit()
    db.refresh(usuario)
    return {"mensaje": "Datos del usuario actualizados correctamente", "id_usuario": usuario.id_usuario}

def cambiar_estado_usuario(db:Session, nuevo_estado:EstadoUsuarioResponse, id_usuario:int):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.estado = nuevo_estado.estado
    db.commit()
    db.refresh(usuario)
    return {"mensaje": "Estado del usuario actualizado correctamente", "id_usuario": usuario.id_usuario, "estado": usuario.estado}