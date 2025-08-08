print("Ejecutando Flask...")

from app import create_app

app = create_app()

if __name__ == '__main__':
    print("Servidor iniciado")
    app.run(debug=True)
