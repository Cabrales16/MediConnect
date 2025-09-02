import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import logo from "./IniciopSesionImages/Logo.png";
import calendario from "./IniciopSesionImages/calendario.jpeg";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login exitoso
    // aquí podrías validar credenciales, llamar a API, guardar token, etc.
    navigate("/inicio"); // ← redirige a la sección principal del PacienteLayout
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-green-200 overflow-hidden">
      {/* ... (tu UI existente, SVGs, layout) ... */}

      <div className="relative flex flex-col md:flex-row max-w-4xl w-full shadow-md rounded-3xl overflow-hidden z-10">
        {/* Lado izquierdo */}
        <div className="md:w-1/2 bg-white flex flex-col items-center justify-start p-6 text-center shadow-lg">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Hola, Bienvenido!</h2>
          <p className="text-gray-600 mt-2 text-sm">Ingresa tus datos para continuar en MediConnect.</p>

          <img src={calendario} alt="Calendario" className="mt-6 w-full h-40 object-contain rounded-lg" />
        </div>

        {/* Lado derecho (formulario) */}
        <div className="md:w-1/2 bg-green-500 flex items-center justify-center p-4 pl-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm md:-translate-x-6">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Inicia sesión</h2>
            <p className="text-center text-gray-600 mb-4 text-sm">Accede a tu cuenta para continuar</p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                <input type="text" placeholder="Número de documento" className="flex-1 outline-none text-sm" />
                <User className="text-gray-400 w-5 h-5 ml-2" />
              </div>

              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                <input type="email" placeholder="Correo electrónico" className="flex-1 outline-none text-sm" />
                <Mail className="text-gray-400 w-5 h-5 ml-2" />
              </div>

              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                <input type="password" placeholder="Contraseña" className="flex-1 outline-none text-sm" />
                <Lock className="text-gray-400 w-5 h-5 ml-2" />
              </div>

              <div className="text-right">
                <a href="#" className="text-xs text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm">
                Iniciar sesión
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-4">
              ¿No tienes cuenta?{" "}
              <a href="#" className="text-blue-500 font-medium hover:underline">Regístrate</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
