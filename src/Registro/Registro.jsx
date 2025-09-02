import React from "react";
import logo from "./RegistroImages/Logo.png";
import { User, Mail, Lock, Phone, Home, CreditCard } from "lucide-react";
import calendario from "./RegistroImages/calendario.jpeg";

export default function Register() {
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
      <div className="relative flex max-w-6xl w-full shadow-2xl rounded-2xl overflow-hidden z-10">
        {/* Caja izquierda (blanca) */}
        <div className="w-5/12 bg-white flex flex-col items-center justify-start p-8 text-center shadow-lg">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Hola, Bienvenidos!</h2>
          <p className="text-gray-600 mt-2 text-sm px-4">
            ¡Bienvenido de nuevo! Nos alegra tenerte aquí, crea tu cuenta para continuar.
          </p>

          <img
            src={calendario}
            alt="Calendario"
            className="mt-6 w-full h-40 object-contain rounded-lg"
          />
        </div>

        {/* Caja derecha (verde con blanco dentro) */}
        <div className="w-7/12 bg-green-500 flex items-center justify-center p-10">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
              Registrate
            </h2>
            <p className="text-center text-gray-600 mb-4 text-sm">
              Ingresa tus datos para crear la cuenta
            </p>

            <form className="space-y-4 text-sm">
              {/* Tipo y número documento */}
              <div className="flex gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <select
                    className="flex-1 outline-none bg-transparent cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Tipo de documento
                    </option>
                    <option value="dni">Cedula de Ciudadania</option>
                    <option value="dni">Tarjeta de identidad</option>
                    <option value="passport">Pasaporte</option>
                    <option value="other">Registro civil</option>
                  </select>
                  <CreditCard className="text-gray-400 w-5 h-5 ml-2" />
                </div>

                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="text"
                    placeholder="Número de documento"
                    className="flex-1 outline-none text-sm"
                  />
                  <User className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Nombres y apellidos */}
              <div className="flex gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="text"
                    placeholder="Nombres"
                    className="flex-1 outline-none text-sm"
                  />
                  <User className="text-gray-400 w-5 h-5 ml-2" />
                </div>

                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="text"
                    placeholder="Apellidos"
                    className="flex-1 outline-none text-sm"
                  />
                  <User className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Teléfono y dirección */}
              <div className="flex gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="flex-1 outline-none text-sm"
                  />
                  <Phone className="text-gray-400 w-5 h-5 ml-2" />
                </div>

                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="text"
                    placeholder="Dirección"
                    className="flex-1 outline-none text-sm"
                  />
                  <Home className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Correo y contraseña */}
              <div className="flex gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="email"
                    placeholder="Correo"
                    className="flex-1 outline-none text-sm"
                  />
                  <Mail className="text-gray-400 w-5 h-5 ml-2" />
                </div>

                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 focus-within:ring-2 focus-within:ring-green-400">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="flex-1 outline-none text-sm"
                  />
                  <Lock className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Términos */}
              <div className="flex items-center text-xs text-gray-600">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="select-none">
                  Estoy de acuerdo con los{" "}
                  <a href="#" className="text-blue-600 underline">
                    términos y condiciones
                  </a>
                  .*
                </label>
              </div>

              {/* Botón registrar */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm"
              >
                Registrar
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-4">
              Ya tienes cuenta?{" "}
              <a href="" className="text-blue-600 font-medium hover:underline">
                Inicia Sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
