from flask import Flask
from app.routes.auth import bp as auth_bp
from app.routes.main import bp_main
from app.routes.horarios_Medicos import bp as horariosM_bp
from app.routes.correos import bp as correos_bp
from app.routes.errores import bp as errores_bp
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
app.secret_key = 'clave_secreta'

app.register_blueprint(auth_bp)
app.register_blueprint(bp_main)
app.register_blueprint(horariosM_bp)
app.register_blueprint(correos_bp)
app.register_blueprint(errores_bp)

