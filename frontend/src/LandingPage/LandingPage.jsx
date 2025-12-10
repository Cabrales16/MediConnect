import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaBell, FaHeartbeat } from "react-icons/fa";
import logo from "./LandingPageImages/Logo.png";
import PersonasImage from "./LandingPageImages/CaractImage.png";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Quita el scroll global y activa uno interno solo en este componente
  useEffect(() => {
    document.body.style.overflow = "hidden"; // bloquea scroll del navegador
    return () => {
      document.body.style.overflow = "auto"; // lo restaura al salir
    };
  }, []);

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden text-gray-900 scroll-smooth">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="MediConnect logo" className="w-10 h-10" />
            <span className="font-extrabold text-xl select-none">
              Medi<span className="text-green-500">Connect</span>
            </span>
          </div>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#inicio" className="hover:text-green-500 transition">Inicio</a>
            <a href="#nosotros" className="hover:text-green-500 transition">Nosotros</a>
            <a href="#servicios" className="hover:text-green-500 transition">Servicios</a>
            <a href="#contacto" className="hover:text-green-500 transition">Contacto</a>
          </nav>

          {/* BOTONES */}
          <div className="hidden md:flex gap-3">
            <Link
              to="/register"
              className="border border-green-500 text-green-500 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition"
            >
              ¡Registrarse!
            </Link>
            <Link
              to="/login"
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Iniciar sesión
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden bg-green-500 text-white p-2 rounded-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  mobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
            <div className="flex flex-col items-center py-4 space-y-3">
              <a href="#inicio" className="hover:text-green-500" onClick={() => setMobileOpen(false)}>Inicio</a>
              <a href="#nosotros" className="hover:text-green-500" onClick={() => setMobileOpen(false)}>Nosotros</a>
              <a href="#servicios" className="hover:text-green-500" onClick={() => setMobileOpen(false)}>Servicios</a>
              <a href="#contacto" className="hover:text-green-500" onClick={() => setMobileOpen(false)}>Contacto</a>
              <div className="flex gap-3 pt-3">
                <Link
                  to="/register"
                  className="border border-green-500 text-green-500 px-4 py-2 rounded-md"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CONTENIDO SCROLLEABLE */}
      <div className="pt-20">
        {/* HERO */}
        <section
          id="inicio"
          className="pt-8 pb-16 md:pt-20 bg-gradient-to-br from-green-500 via-green-400 to-green-300 text-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-3">
                Cuida tu salud con <br />{" "}
                <span className="text-white">MediConnect</span>
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Agenda tus citas médicas en segundos, recibe recordatorios y lleva
                tu historial clínico contigo a donde vayas.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  to="/register"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  ¡Empieza ahora!
                </Link>
                <a
                  href="#nosotros"
                  className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Saber más
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center md:justify-end"
            >
              <img
                src={PersonasImage}
                alt="Personas usando MediConnect"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" className="bg-white py-20 px-6 md:px-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-green-600 mb-6"
            >
              Sobre Nosotros
            </motion.h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              En MediConnect creemos que la salud debe ser accesible, rápida y
              confiable. Conectamos pacientes con médicos de calidad, eliminando
              barreras y haciendo que el cuidado médico sea simple y seguro.
            </p>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="bg-gray-50 py-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-12">
              Nuestros Servicios
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaCalendarAlt size={32} className="text-green-500 mb-4" />,
                  title: "Agendamiento de Citas",
                  desc: "Reserva tus citas fácilmente con especialistas disponibles 24/7.",
                },
                {
                  icon: <FaUserMd size={32} className="text-green-500 mb-4" />,
                  title: "Historia Clínica Digital",
                  desc: "Consulta tu historial médico en cualquier momento y compártelo con tu médico.",
                },
                {
                  icon: <FaBell size={32} className="text-green-500 mb-4" />,
                  title: "Notificaciones y Recordatorios",
                  desc: "Recibe alertas automáticas sobre tus próximas consultas y tratamientos.",
                },
                {
                  icon: <FaHeartbeat size={32} className="text-green-500 mb-4" />,
                  title: "Atención Personalizada",
                  desc: "Nuestro sistema aprende de tus necesidades para ofrecerte la mejor experiencia.",
                },
              ].map((srv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition-transform"
                >
                  {srv.icon}
                  <h3 className="text-xl font-semibold mb-2 text-green-600">
                    {srv.title}
                  </h3>
                  <p className="text-gray-700">{srv.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="bg-green-600 text-white py-20 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contáctanos
            </h2>
            <p className="mb-8 text-lg">
              ¿Tienes dudas o sugerencias? Escríbenos, queremos escucharte.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre completo" className="p-3 rounded-lg text-black w-full bg-white focus:ring-2 focus:ring-green-300" />
              <input type="email" placeholder="Correo electrónico" className="p-3 rounded-lg text-black w-full bg-white focus:ring-2 focus:ring-green-300" />
              <textarea placeholder="Escribe tu mensaje" className="col-span-1 md:col-span-2 p-3 rounded-lg text-black h-32 bg-white focus:ring-2 focus:ring-green-300"></textarea>
              <button className="col-span-1 md:col-span-2 bg-white text-green-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
          © 2025 MediConnect — Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}