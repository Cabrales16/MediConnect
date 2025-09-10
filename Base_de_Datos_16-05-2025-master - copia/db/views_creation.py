from sqlalchemy import text
from .database import conn  # Importa la conexión configurada para la base de datos

def crear_vistas():
    vistas_sql = {
        "vista_pacientes": """
        CREATE OR REPLACE VIEW vista_pacientes AS
        SELECT 
            u.id_usuario AS id_paciente,
            u.nombre, 
            u.apellido, 
            u.tipo_documento, 
            u.num_documento, 
            u.correo, 
            u.telefono, 
            u.direccion,
            u.fecha_registro,
            u.estado
        FROM usuario u
        WHERE u.id_rol = 1; -- 1 corresponde a pacientes
        """,

        "vista_medicos": """
        CREATE OR REPLACE VIEW vista_medicos AS
        SELECT 
            u.id_usuario AS id_medico,
            u.nombre, 
            u.apellido, 
            m.especialidad, 
            m.calificacion,
            u.correo, 
            u.telefono, 
            u.direccion,
            h.dia,
            h.hora_inicio,
            h.hora_fin
        FROM usuario u
        JOIN medico m ON u.id_usuario = m.id_medico
        LEFT JOIN horario h ON m.id_medico = h.id_medico
        WHERE u.id_rol = 2; -- 2 corresponde a médicos
        """,

        "vista_administradores": """
        CREATE OR REPLACE VIEW vista_administradores AS
        SELECT 
            u.id_usuario AS id_administrador,
            u.nombre, 
            u.apellido, 
            u.correo, 
            u.telefono, 
            u.direccion
        FROM usuario u
        WHERE u.id_rol = 3; -- 3 corresponde a administradores
        """,

        "vista_planilla": """
        CREATE OR REPLACE VIEW vista_planilla AS
        SELECT 
            c.id_cita,
            c.fecha,
            c.hora,
            c.estado AS estado_cita,
            c.id_hospital,
            p.id_usuario AS id_paciente,
            p.nombre AS nombre_paciente,
            p.apellido AS apellido_paciente,
            p.correo AS correo_paciente,
            m.id_usuario AS id_medico,
            m.nombre AS nombre_medico,
            m.apellido AS apellido_medico,
            med.especialidad AS especialidad_medico,
            med.calificacion AS calificacion_medico
        FROM cita c
        JOIN usuario p ON c.id_paciente = p.id_usuario
        JOIN usuario m ON c.id_medico = m.id_usuario
        JOIN medico med ON m.id_usuario = med.id_medico;
        """
    }

    with conn.connect() as connection:
        for nombre_vista, sql in vistas_sql.items():
            connection.execute(text(sql))
            print(f"Vista '{nombre_vista}' creada o reemplazada correctamente.")

if __name__ == "__main__":
    crear_vistas()
