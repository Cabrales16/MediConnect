import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { login } from "../services/authService"; 

import logo from "./IniciopSesionImages/Logo.png";
import calendario from "./IniciopSesionImages/calendario.jpeg";
import Volver from "./IniciopSesionImages/flechaIconIzq.png"

export default function Login() {

  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
    const data = await login(correo, contrasena); 
    
    // Guardar token y rol
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("rol", data.rol);
    localStorage.setItem("id_usuario", data.id_usuario);
    localStorage.setItem("correo", data.correo);
    localStorage.setItem("nombre", data.nombre);

    // Redirigir según el rol
    if (data.rol === "Paciente") {
      navigate("/paciente/inicio"); 
    } else if (data.rol === "Médico") {
      navigate("/medico/inicio");
    } else if (data.rol === "Administrador") {
      navigate("/admin/inicio");
    } else {
      navigate("/"); // fallback
    }
  } catch (err) {
    setError("Credenciales incorrectas o error de servidor");
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-green-200 overflow-hidden">
      {/* SVG decorativos */}

      <div className="relative flex flex-col md:flex-row max-w-4xl w-full shadow-md rounded-2xl overflow-hidden z-10 my-15">
        <a href="/home" className="w-2 h-2 absolute flex ml-4 mt-5 items-center">
          <img src={Volver} alt="regresar" /> <p className="pl-3">Volver</p>
        </a>

        {/* Lado izquierdo */}
        <div className="md:w-1/2 bg-white flex flex-col items-center justify-start p-6 text-center shadow-lg">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Hola, Bienvenido!</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Ingresa tus datos para continuar en MediConnect.
          </p>
          <img
            src={calendario}
            alt="Calendario"
            className="mt-6 w-full h-40 object-contain rounded-lg"
          />
        </div>

        {/* Lado derecho (formulario) */}
        <div className="md:w-1/2 bg-green-500 flex items-center justify-center p-4 pl-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm md:-translate-x-6 my-6 py-15">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Inicia sesión
            </h2>
            <p className="text-center text-gray-600 mb-4 text-sm">
              Accede a tu cuenta para continuar
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="flex-1 outline-none text-sm"
                  required
                />
                <Mail className="text-gray-400 w-5 h-5 ml-2" />
              </div>

              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="flex-1 outline-none text-sm"
                  required
                />
                <Lock className="text-gray-400 w-5 h-5 ml-2" />
              </div>

              {error && (
                <p className="text-red-500 text-xs text-center">{error}</p>
              )}

              <div className="text-right">
                <a
                  href="/login/recuperar"
                  className="text-xs text-blue-500 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm"
              >
                Iniciar sesión
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-4">
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="text-blue-500 font-medium hover:underline"
              >
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}