import React from "react";
import logo from "./IniciopSesionImages/Logo.png";
import { User, Mail, Lock } from "lucide-react";
import calendario from "./IniciopSesionImages/calendario.jpeg"


export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-green-200 overflow-hidden">
      {/* Fondos decorativos */}
      <svg
        className="absolute -top-10 left-0 w-[500px] h-[300px] text-green-500"
        viewBox="0 0 320 180"
        fill="currentColor"
      >
        <path d="M0,100 Q60,40 120,60 Q200,80 280,20 Q300,10 320,0 L0,0 Z" />
      </svg>

      <svg
        className="absolute -bottom-10 right-0 w-[500px] h-[300px] text-green-500"
        viewBox="0 0 320 180"
        fill="currentColor"
      >
        <g transform="scale(-1,-1) translate(-320,-180)">
          <path d="M0,100 Q60,40 120,60 Q200,80 280,20 Q300,10 320,0 L0,0 Z" />
        </g>
      </svg>

      {/* Caja principal */}
      <div className="relative flex max-w-3xl w-full shadow-2xl rounded-5xl overflow-hidden z-10">
        {/* Caja izquierda (blanca) */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-start p-6 text-center shadow-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">Hola, Bienvenidos!</h2>
          <p className="text-gray-600 mt-2 text-sm">
            ¡Bienvenido de nuevo! Nos alegra tenerte aquí, ingresa para continuar.
          </p>
     
          <img
            src={calendario}
            alt="Calendario"
            className="mt-6 w-full h-40 object-contain rounded-lg"
          />
        </div>

        {/* Caja derecha */}
        <div className="w-1/2 bg-green-500 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full -translate-x-13">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Inicia sesión
            </h2>
            <p className="text-center text-gray-600 mb-4 text-sm">
              Accede a tu cuenta para continuar.
            </p>

            <form className="space-y-3">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                <input
                  type="text"
                  placeholder="Número de documento"
                  className="flex-1 outline-none text-sm"
                />
                <User className="text-gray-400 w-5 h-5 ml-2" />
              </div>

         
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="flex-1 outline-none text-sm"
                />
                <Mail className="text-gray-400 w-5 h-5 ml-2" />
              </div>

             
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="flex-1 outline-none text-sm"
                />
                <Lock className="text-gray-400 w-5 h-5 ml-2" />
              </div>

              {/* Enlace */}
              <div className="text-right">
                <a href="#" className="text-xs text-blue-500 hover:underline">
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
              <a href="#" className="text-blue-500 font-medium hover:underline">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
