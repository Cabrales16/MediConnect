import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import calendario from "./RestablecerContraseñaImages/calendario.jpeg";
import Volver from "./RestablecerContraseñaImages/flechaIconIzq.png";
import { restablecerContrasena } from "../services/authService";

export default function RestablecerContrasena() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      toast.error("⚠️ Las contraseñas no coinciden.", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    try {
      await restablecerContrasena(token, password);
      setExito(true);
      toast.success("✅ Contraseña restablecida correctamente.", {
        position: "bottom-left",
        theme: "colored",
      });

      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al restablecer la contraseña. Inténtalo de nuevo.", {
        position: "bottom-left",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 overflow-hidden px-3 md:px-6">
        {/* Fondos decorativos */}
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

          {/* Lado izquierdo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 text-center border-r border-gray-200"
          >
            <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-3">
              Restablece tu contraseña
            </h2>
            <p className="text-gray-600 text-xs md:text-sm mb-4 px-4">
              Introduce tu nueva contraseña para acceder nuevamente a tu cuenta.
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

          {/* Lado derecho */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-green-500 flex items-center justify-center p-8 md:p-10"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-md w-full">
              <h2 className="text-xl md:text-2xl font-bold text-green-600 text-center mb-5">
                Nueva contraseña
              </h2>

              {exito ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 border border-green-300 text-green-700 text-sm md:text-base p-4 rounded-lg text-center"
                >
                  ✅ Tu contraseña ha sido restablecida correctamente.
                  <br />
                  Redirigiendo al inicio de sesión...
                </motion.div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Nueva contraseña */}
                  <div>
                    <label className="block text-xs md:text-sm text-gray-700 mb-2 font-medium">
                      Nueva contraseña
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
                      <input
                        type="password"
                        placeholder="Introduce tu nueva contraseña"
                        className="flex-1 outline-none text-xs md:text-sm bg-transparent"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Lock className="text-gray-400 w-5 h-5 ml-2 shrink-0" />
                    </div>
                  </div>

                  {/* Confirmar */}
                  <div>
                    <label className="block text-xs md:text-sm text-gray-700 mb-2 font-medium">
                      Confirmar contraseña
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
                      <input
                        type="password"
                        placeholder="Repite la nueva contraseña"
                        className="flex-1 outline-none text-xs md:text-sm bg-transparent"
                        required
                        value={confirmar}
                        onChange={(e) => setConfirmar(e.target.value)}
                      />
                      <Lock className="text-gray-400 w-5 h-5 ml-2 shrink-0" />
                    </div>
                  </div>

                  {/* Botón */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 md:py-2.5 rounded-full hover:bg-green-600 transition font-medium text-sm md:text-base shadow-md"
                  >
                    Restablecer contraseña
                  </motion.button>
                </form>
              )}

              {!exito && (
                <div className="text-center mt-4">
                  <a
                    href="/login"
                    className="text-xs md:text-sm text-blue-600 hover:underline"
                  >
                    Volver al inicio de sesión
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ToastContainer position="bottom-left" autoClose={3500} theme="colored" />
    </>
  );
}