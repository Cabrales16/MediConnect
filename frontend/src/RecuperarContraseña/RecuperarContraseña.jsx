import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import calendario from "./RecuperarContraseñaImages/calendario.jpeg";
import Volver from "./RecuperarContraseñaImages/flechaIconIzq.png";
import { recuperarContrasena } from "../services/authService";

export default function RecuperarContrasena() {
  const [enviado, setEnviado] = useState(false);
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recuperarContrasena(correo);
      toast.success("📩 Se ha enviado un correo para restablecer tu contraseña.", {
        position: "bottom-left",
        theme: "colored",
      });
      setEnviado(true);
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error al enviar el correo. Verifica tu dirección e inténtalo nuevamente.", {
        position: "bottom-left",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 overflow-hidden px-3 md:px-6">
        {/* Efectos de fondo */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute -top-10 left-0 w-[400px] h-[250px] bg-green-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute -bottom-10 right-0 w-[400px] h-[250px] bg-green-600 rounded-full blur-3xl"
        />

        {/* Caja principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Botón volver */}
          <a
            href="/login"
            className="absolute top-5 left-5 flex items-center gap-1 text-xs md:text-sm text-gray-600 hover:text-green-600 transition"
          >
            <img src={Volver} alt="regresar" className="w-3 md:w-3.5 opacity-80" />
            <span>Volver</span>
          </a>

          {/* Izquierda */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 text-center border-r border-gray-200"
          >
            <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-3">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-gray-600 text-xs md:text-sm mb-4 px-4">
              No te preocupes. Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecerla de forma segura.
            </p>
            <motion.img
              src={calendario}
              alt="Calendario"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-xs h-44 object-contain"
            />
          </motion.div>

          {/* Derecha */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-green-500 flex items-center justify-center p-8 md:p-10"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-md w-full">
              <h2 className="text-xl md:text-2xl font-bold text-green-600 text-center mb-5">
                Recuperar contraseña
              </h2>

              {enviado ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 border border-green-300 text-green-700 text-sm md:text-base p-4 rounded-lg text-center"
                >
                  ✅ Te hemos enviado un correo con las instrucciones para recuperar tu contraseña.  
                  <br /> Puede tardar unos segundos en llegar.
                </motion.div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs md:text-sm text-gray-700 mb-2 font-medium">
                      Correo electrónico
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
                      <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="flex-1 outline-none text-xs md:text-sm bg-transparent"
                        required
                      />
                      <Mail className="text-gray-400 w-5 h-5 ml-2 shrink-0" />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 md:py-2.5 rounded-full hover:bg-green-600 transition font-medium text-sm md:text-base shadow-md"
                  >
                    Enviar enlace
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="bottom-left" autoClose={3500} theme="colored" />
    </>
  );
}