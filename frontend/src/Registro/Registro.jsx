import React, { useState } from "react";
import logo from "./RegistroImages/Logo.png";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Home, CreditCard } from "lucide-react";
import calendario from "./RegistroImages/calendario.jpeg";
import Volver from "./RegistroImages/flechaIconIzq.png";
import { register } from "../services/authService";

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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await register(formData);
      console.log("✅ Registro exitoso:", data);

      alert("Usuario registrado correctamente ✅");
      navigate("/login"); // redirige al login
    } catch (error) {
      console.error("❌ Error en registro:", error);
      alert(
        error.response?.data?.detail || "Error al registrar. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
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
      <div className="relative flex flex-col md:flex-row max-w-6xl w-full shadow-md rounded-2xl overflow-hidden z-10 bg-white">
        {/* Botón volver */}
        <a
          href="/home"
          className="w-2 h-2 absolute flex ml-4 mt-5 items-center"
        >
          <img src={Volver} alt="regresar" /> <p className="pl-3">Volver</p>
        </a>

        {/* Caja izquierda */}
        <div className="w-full md:w-5/12 bg-white flex flex-col items-center justify-start p-8 text-center shadow-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">
            Hola, Bienvenidos!
          </h2>
          <p className="text-gray-600 mt-2 text-sm px-4">
            ¡Bienvenido de nuevo! Nos alegra tenerte aquí, crea tu cuenta para
            continuar.
          </p>
          <img
            src={calendario}
            alt="Calendario"
            className="mt-6 w-full h-40 object-contain rounded-lg"
          />
        </div>

        {/* Caja derecha */}
        <div className="w-full md:w-7/12 bg-green-500 flex items-center justify-center p-6 md:p-10">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
              Regístrate
            </h2>
            <p className="text-center text-gray-600 mb-4 text-sm">
              Ingresa tus datos para crear la cuenta
            </p>

            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              {/* Tipo y número documento */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <select
                    name="tipo_documento"
                    className="flex-1 outline-none bg-transparent cursor-pointer text-sm"
                    value={formData.tipo_documento}
                    onChange={handleChange}
                  >
                    <option value="">Tipo de documento</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="PAS">Pasaporte</option>
                    <option value="RC">Registro civil</option>
                  </select>
                  <CreditCard className="text-gray-400 w-5 h-5 ml-2" />
                </div>

                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="text"
                    name="num_documento"
                    placeholder="Número de documento"
                    value={formData.num_documento}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <User className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Nombres y apellidos */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombres"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <User className="text-gray-400 w-5 h-5 ml-2" />
                </div>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellidos"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <User className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Teléfono y dirección */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <Phone className="text-gray-400 w-5 h-5 ml-2" />
                </div>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <Home className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Correo y contraseña */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <Mail className="text-gray-400 w-5 h-5 ml-2" />
                </div>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1">
                  <input
                    type="password"
                    name="contrasena"
                    placeholder="Contraseña"
                    value={formData.contrasena}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                  />
                  <Lock className="text-gray-400 w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Términos */}
              <div className="flex items-start text-xs text-gray-600">
                <input type="checkbox" id="terms" className="mt-1 mr-2" />
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
                disabled={loading}
                className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium text-sm"
              >
                {loading ? "Registrando..." : "Registrar"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-4">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Inicia Sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
