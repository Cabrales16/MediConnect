from flask import Flask
import mysql.connector

db = None

def create_app():
    app = Flask(__name__)
    app.secret_key = 'tu_clave_secreta'

    global db
    db = mysql.connector.connect(
        host="127.0.0.1",
        port=3307,
        user="root",
        password="admin",
        database="agendamiento_de_citas"
    )

    from .routes import auth, horarios_Medicos, correos, errores, main
    app.register_blueprint(horarios_Medicos.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(correos.bp)
    app.register_blueprint(errores.bp)
    app.register_blueprint(main.bp)




    return app

def get_db():
    global db
    return db
