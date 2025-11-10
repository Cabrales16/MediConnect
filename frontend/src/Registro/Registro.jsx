import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Home,
  CreditCard,
  IdCard,
  VenusAndMars,
  Calendar,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./RegistroImages/Logo.png";
import calendario from "./RegistroImages/calendario.jpeg";
import Volver from "./RegistroImages/flechaIconIzq.png";
import { register } from "../services/authService";
import ModalConfirmacion from "./ModalConfirmacion";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo_documento: "",
    num_documento: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    correo: "",
    contrasena: "",
    genero: "",
    fecha_nacimiento: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      toast.success("✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.", {
        position: "bottom-left",
      });
      setIsOpen(true);
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || "Error al registrar. Inténtalo nuevamente.";
      toast.error(errorMsg, {
        position: "bottom-left",
        autoClose: 4000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col md:flex-row max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Botón volver */}
          <button
            onClick={() => navigate("/home")}
            className="absolute top-5 left-5 flex items-center gap-1 text-xs md:text-sm text-gray-600 hover:text-green-600 transition"
          >
            <img src={Volver} alt="regresar" className="w-3 md:w-3.5 opacity-80" />
            <span>Volver</span>
          </button>

          {/* Sección izquierda */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 bg-white flex flex-col items-center justify-center p-8 md:p-10 text-center border-r border-gray-200"
          >
            <img src={logo} alt="Logo" className="w-16 h-16 mb-3" />
            <h2 className="text-xl md:text-2xl font-bold text-green-600">
              ¡Bienvenido a MediConnect!
            </h2>
            <p className="text-gray-600 mt-3 text-xs md:text-sm px-4 md:px-6 leading-relaxed">
              Crea tu cuenta para reservar tus citas médicas fácilmente y llevar
              el control de tu salud desde cualquier lugar.
            </p>
            <motion.img
              src={calendario}
              alt="Calendario"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 w-full max-w-xs h-40 md:h-44 object-contain"
            />
          </motion.div>

          {/* Sección derecha */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-7/12 bg-green-500 flex items-center justify-center p-6 md:p-10"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-md w-full">
              <h2 className="text-xl md:text-2xl font-bold text-green-600 text-center mb-1">
                Crear cuenta
              </h2>
              <p className="text-center text-gray-600 mb-5 text-xs md:text-sm">
                Completa la información para registrarte
              </p>

              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm"
                onSubmit={handleSubmit}
              >
                {/* Tipo y número de documento */}
                <InputSelect
                  name="tipo_documento"
                  value={formData.tipo_documento}
                  onChange={handleChange}
                  icon={<CreditCard size={16} />}
                  options={[
                    { value: "", label: "Tipo documento" },
                    { value: "CC", label: "Cédula" },
                    { value: "TI", label: "Tarjeta" },
                    { value: "PAS", label: "Pasaporte" },
                    { value: "RC", label: "Registro civil" },
                  ]}
                />
                <InputField
                  name="num_documento"
                  value={formData.num_documento}
                  placeholder="Número de documento"
                  onChange={handleChange}
                  icon={<IdCard size={16} />}
                />

                {/* Nombre y Apellido */}
                <InputField
                  name="nombre"
                  value={formData.nombre}
                  placeholder="Nombres"
                  onChange={handleChange}
                  icon={<User size={16} />}
                />
                <InputField
                  name="apellido"
                  value={formData.apellido}
                  placeholder="Apellidos"
                  onChange={handleChange}
                  icon={<User size={16} />}
                />

                {/* Género y Fecha */}
                <InputSelect
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  icon={<VenusAndMars size={16} />}
                  options={[
                    { value: "", label: "Género" },
                    { value: "Femenino", label: "Femenino" },
                    { value: "Masculino", label: "Masculino" },
                  ]}
                />
                <InputField
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  icon={<Calendar size={16} />}
                />

                {/* Teléfono (una columna) */}
                <InputField
                  name="telefono"
                  value={formData.telefono}
                  placeholder="Teléfono"
                  onChange={handleChange}
                  icon={<Phone size={16} />}
                />

                {/* Dirección */}
                  <InputField
                    name="direccion"
                    value={formData.direccion}
                    placeholder="Dirección"
                    onChange={handleChange}
                    icon={<Home size={16} />}
                  />

                {/* Correo */}
                <div className="sm:col-span-2">
                  <InputField
                    type="email"
                    name="correo"
                    value={formData.correo}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                    icon={<Mail size={16} />}
                  />
                </div>

                {/* Contraseña */}
                <div className="sm:col-span-2">
                  <InputField
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    placeholder="Contraseña"
                    onChange={handleChange}
                    icon={<Lock size={16} />}
                  />
                </div>

                {/* Términos
                <div className="sm:col-span-2 flex items-start text-[11px] md:text-xs text-gray-600 mt-1">
                  <input type="checkbox" id="terms" className="mt-0.5 mr-2" />
                  <label htmlFor="terms">
                    Acepto los{" "}
                    <a href="#" className="text-green-600 font-semibold">
                      términos y condiciones
                    </a>
                    .
                  </label>
                </div> */}

                {/* Botón */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={loading}
                  className="sm:col-span-2 w-full bg-green-500 text-white py-2 md:py-2.5 rounded-full hover:bg-green-600 transition font-medium shadow-md text-sm md:text-base mt-1"
                >
                  {loading ? "Registrando..." : "Registrar"}
                </motion.button>
              </form>

              <p className="text-center text-xs md:text-sm text-gray-600 mt-4">
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="text-green-600 font-semibold hover:underline">
                  Inicia sesión
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>

        <ModalConfirmacion
          isOpen={isOpen}
          email={formData.correo}
          onClose={() => setIsOpen(false)}
          onResend={() =>
            toast.info(`📩 Correo reenviado a: ${formData.correo}`, {
              position: "bottom-left",
            })
          }
        />
      </div>

      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </>
  );
}

function InputField({ type = "text", name, value, onChange, placeholder, icon }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 md:px-4 md:py-2 w-full focus-within:ring-2 focus-within:ring-green-400 transition">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full outline-none text-xs md:text-sm bg-transparent"
      />
      <span className="text-gray-400 ml-2">{icon}</span>
    </div>
  );
}

function InputSelect({ name, value, onChange, icon, options }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 md:px-4 md:py-2 w-full focus-within:ring-2 focus-within:ring-green-400 transition">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-xs md:text-sm cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="text-gray-400 ml-2">{icon}</span>
    </div>
  );
}