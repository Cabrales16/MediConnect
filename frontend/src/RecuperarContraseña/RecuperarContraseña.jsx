import React, { useState } from "react";
import { Mail } from "lucide-react";
import calendario from "./RecuperarContraseñaImages/calendario.jpeg";
import Volver from "./RecuperarContraseñaImages/flechaIconIzq.png"

export default function RecuperarContrasena() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true); // Cambia al estado "mensaje enviado"
  };

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
      <div className="relative flex max-w-3xl w-full shadow-md rounded-2xl overflow-hidden z-10 bg-white">
        <a href="/login" className="w-2 h-2 absolute flex ml-4 mt-5 items-center">
          <img src={Volver} alt="regresar" /> <p className="pl-3">Volver</p>
        </a>
        {/* Caja izquierda (con la ilustración) */}
        <div className="w-1/2 bg-white flex items-center justify-center p-6">
          <img
            src={calendario}
            alt="Calendario"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* Caja derecha */}
        <div className="w-1/2 bg-green-500 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
            <h2 className="text-xl font-bold text-center mb-4">
              Recuperar contraseña
            </h2>

            {/* Si ya envió, mostramos el mensaje */}
            {enviado ? (
              <div className="bg-green-100 border border-green-300 text-green-700 text-sm p-4 rounded-lg text-center">
                Te hemos enviado un correo para recuperar tu contraseña.  
                Puede hasta durar un minuto en llegar.
              </div>
            ) : (
              // Formulario
              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm text-gray-700 mb-1">
                  Ingresa tu correo electrónico:
                </label>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="email"
                   
                    className="flex-1 outline-none text-sm"
                    required
                  />
                  <Mail className="text-gray-400 w-5 h-5 ml-2" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
