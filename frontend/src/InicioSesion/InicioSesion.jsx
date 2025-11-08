import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { login } from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./IniciopSesionImages/Logo.png";
import calendario from "./IniciopSesionImages/calendario.jpeg";
import Volver from "./IniciopSesionImages/flechaIconIzq.png";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (bloqueado) {
      toast.error("🚫 Tu cuenta está temporalmente bloqueada por múltiples intentos fallidos", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await login(correo, contrasena);

      // Guardar datos del usuario
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("id_usuario", data.id_usuario);
      localStorage.setItem("correo", data.correo);
      localStorage.setItem("nombre", data.nombre);

      toast.success(`👋 Bienvenido, ${data.nombre}!`, {
        position: "bottom-left",
        theme: "colored",
      });

      // Redirección según rol
      setTimeout(() => {
        if (data.rol === "Paciente") navigate("/paciente/inicio");
        else if (data.rol === "Médico") navigate("/medico/inicio");
        else if (data.rol === "Administrador") navigate("/admin/inicio");
        else navigate("/");
      }, 1000);

      setIntentos(0);
    } catch (err) {
      const nuevosIntentos = intentos + 1;
      setIntentos(nuevosIntentos);
      setLoading(false);

      if (nuevosIntentos >= 3) {
        setBloqueado(true);
        toast.error("🔒 Tu cuenta ha sido bloqueada por seguridad (3 intentos fallidos)", {
          position: "bottom-left",
          theme: "colored",
        });
      } else {
        toast.error("⚠️ Credenciales incorrectas o error de servidor", {
          position: "bottom-left",
          theme: "colored",
        });
        setError("Credenciales incorrectas");
      }
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 overflow-hidden px-4">
        <ToastContainer position="bottom-left" autoClose={4000} theme="colored" />

        {/* Fondo decorativo */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute -top-12 left-0 w-[500px] h-[300px] bg-green-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute -bottom-12 right-0 w-[500px] h-[300px] bg-green-600 rounded-full blur-3xl"
        />

        {/* Contenedor principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col md:flex-row max-w-5xl w-full shadow-2xl rounded-2xl overflow-hidden z-10 bg-white"
        >
          {/* Botón volver */}
          <button
            onClick={() => navigate("/home")}
            className="absolute top-5 left-5 flex items-center gap-1 text-xs md:text-sm text-gray-600 hover:text-green-600 transition"
          >
            <img src={Volver} alt="regresar" className="w-3.5 md:w-4 opacity-80" />
            <span>Volver</span>
          </button>

          {/* Lado izquierdo */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 w-full bg-white flex flex-col items-center justify-center p-10 text-center border-r border-gray-200"
          >
            <img src={logo} alt="Logo MediConnect" className="w-20 h-20 mb-4" />
            <h2 className="text-2xl font-bold text-green-600">¡Bienvenido de nuevo!</h2>
            <p className="text-gray-600 mt-3 text-sm px-6">
              Ingresa tus datos para continuar en <strong>MediConnect</strong> y gestionar tu salud.
            </p>
            <motion.img
              src={calendario}
              alt="Calendario"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 w-full max-w-xs h-44 object-contain rounded-lg"
            />
          </motion.div>

          {/* Lado derecho */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 w-full bg-green-500 flex items-center justify-center p-8 md:p-12"
          >
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-green-600 text-center mb-2">
                Iniciar sesión
              </h2>
              <p className="text-center text-gray-600 mb-6 text-sm">
                Accede a tu cuenta para continuar
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Campo correo */}
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="flex-1 outline-none text-sm bg-transparent"
                    required
                  />
                  <Mail className="text-gray-400 w-5 h-5 ml-2 shrink-0" />
                </div>

                {/* Campo contraseña */}
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-400 transition">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="flex-1 outline-none text-sm bg-transparent"
                    required
                  />
                  <Lock className="text-gray-400 w-5 h-5 ml-2 shrink-0" />
                </div>

                {error && (
                  <p className="text-red-500 text-xs text-center">{error}</p>
                )}

                <div className="text-right">
                  <a
                    href="/login/recuperar"
                    className="text-xs text-green-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm shadow-md"
                  disabled={bloqueado || loading}
                >
                  {loading ? "Verificando..." : "Iniciar sesión"}
                </motion.button>
              </form>

              <p className="text-center text-xs text-gray-600 mt-4">
                ¿No tienes cuenta?{" "}
                <a
                  href="/register"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Regístrate
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}