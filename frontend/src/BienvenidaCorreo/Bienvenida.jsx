import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmarCuenta } from "../services/authService"; 
import Logo from "./BienvenidaCorreoImages/Logo.png";
import Medico from "./BienvenidaCorreoImages/medico.jpg";

export default function BienvenidoMediconnect() {
  const { token } = useParams();
  const [estado, setEstado] = useState("cargando"); 

  useEffect(() => {
    const confirmar = async () => {
      try {
        await confirmarCuenta(token);
        setEstado("confirmado");
      } catch (err) {
        setEstado("error");
      }
    };
    confirmar();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-40 -z-10"></div>

        <img src={Logo} alt="Mediconnect Logo" className="mx-auto w-28 mb-4" />

        {estado === "cargando" && (
          <h1 className="text-xl font-bold text-gray-600">
            Confirmando tu cuenta...
          </h1>
        )}

        {estado === "confirmado" && (
          <>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
              ¡Bienvenido a <span className="text-green-600">Mediconnect</span>!
            </h1>

            <p className="text-gray-600 mb-6">
              Tu registro se ha completado correctamente.  
              Ahora podrás agendar tus{" "}
              <span className="font-semibold text-green-500">citas médicas</span>,  
              consultar tus historiales y recibir recordatorios para nunca perder una cita.
            </p>

            <div className="flex justify-center mb-6">
              <img
                src={Medico}
                alt="Agendamiento de citas médicas"
                className="w-48 rounded-xl shadow-md"
              />
            </div>

            <div className="bg-gray-50 rounded-xl shadow-inner p-5 text-left mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                ¿Qué puedes hacer ahora?
              </h2>
              <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                <li>Agenda tu primera cita médica en segundos</li>
                <li>Revisa el calendario de tus próximos turnos</li>
                <li>Conéctate con médicos y especialistas</li>
                <li>Activa recordatorios para no olvidar tus citas</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-xl shadow">
                <h3 className="font-bold text-green-600 mb-2">Atención 24/7</h3>
                <p className="text-gray-600 text-sm">
                  Agenda tus citas en cualquier momento
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl shadow">
                <h3 className="font-bold text-blue-600 mb-2">Historial en línea</h3>
                <p className="text-gray-600 text-sm">
                  Consulta tu historial médico fácilmente
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl shadow">
                <h3 className="font-bold text-blue-600 mb-2">Recordatorios</h3>
                <p className="text-gray-600 text-sm">Notificaciones para nunca olvidar</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl shadow">
                <h3 className="font-bold text-green-600 mb-2">Conexión directa</h3>
                <p className="text-gray-600 text-sm">Accede a médicos y especialistas</p>
              </div>
            </div>

            <a
              href="/login"
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-green-700 transition"
            >
              Ir al Inicio de Sesión
            </a>
          </>
        )}

        {/* Estado error */}
        {estado === "error" && (
          <>
            <h1 className="text-3xl font-extrabold text-red-600 mb-3">
              Enlace no válido ❌
            </h1>

            <p className="text-gray-600 mb-6">
              El enlace de confirmación ha{" "}
              <span className="font-semibold text-red-500">caducado</span> o ya fue
              utilizado. Solicita un nuevo enlace para poder registrarte
              correctamente.
            </p>

            <div className="bg-red-50 rounded-xl shadow-inner p-5 text-left mb-8">
              <h2 className="text-lg font-semibold text-red-700 mb-3">
                ¿Qué hacer ahora?
              </h2>
              <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                <li>Verifica que tu correo esté escrito correctamente</li>
                <li>Solicita un nuevo enlace de confirmación</li>
                <li>Si ya confirmaste, inicia sesión normalmente</li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="/register"
                className="px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 transition"
              >
                Ir al Registro
              </a>
              <a
                href="/login"
                className="px-6 py-3 bg-gray-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-gray-700 transition"
              >
                Ir al Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

