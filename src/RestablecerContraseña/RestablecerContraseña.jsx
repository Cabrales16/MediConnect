import React, { useState } from "react";
import { Lock } from "lucide-react";
import calendario from "./RestablecerContraseñaImages/calendario.jpeg"

export default function RestablecerContrasena() {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmar) {
      setMensaje("Las contraseñas no coinciden.");
    } else {
      setMensaje("✅ Tu contraseña ha sido restablecida con éxito.");
    }
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
      <div className="relative flex max-w-3xl w-full shadow-2xl rounded-3xl overflow-hidden z-10 bg-white">
        {/* Caja izquierda con ilustración */}
        <div className="w-1/2 bg-white flex items-center justify-center p-6">
          <img
            src={calendario}
            alt="Calendario"
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Caja derecha con formulario */}
        <div className="w-1/2 bg-green-500 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
            <h2 className="text-xl font-bold text-center mb-6">
              Restablecer contraseña
            </h2>

            {mensaje ? (
              <div className="bg-green-100 border border-green-300 text-green-700 text-sm p-4 rounded-lg text-center mb-4">
                {mensaje}
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Nueva Contraseña:
                </label>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="password"
                    placeholder="Introduce tu nueva contraseña"
                    className="flex-1 outline-none text-sm"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Confirmar contraseña:
                </label>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    className="flex-1 outline-none text-sm"
                    required
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm"
              >
                Restablecer Contraseña
              </button>
            </form>

            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Volver al inicio de sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
