import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./LandingPageImages/Logo.png";
import PersonasImage from "./LandingPageImages/CaractImage.png";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-green-500 overflow-hidden">
      {/* SVGs decorativos adaptativos */}
      <svg
        className="absolute -top-10 -left-6 w-40 h-24 md:w-[500px] md:h-[300px] text-white opacity-95"
        viewBox="0 0 320 180"
        fill="currentColor"
        aria-hidden
      >
        <path d="M0,100 Q60,40 120,60 Q200,80 280,20 Q300,10 320,0 L0,0 Z" />
      </svg>

      <svg
        className="absolute -bottom-10 -right-6 w-40 h-24 md:w-[500px] md:h-[300px] text-white opacity-95"
        viewBox="0 0 320 180"
        fill="currentColor"
        aria-hidden
      >
        <g transform="scale(-1,-1) translate(-320,-180)">
          <path d="M0,100 Q60,40 120,60 Q200,80 280,20 Q300,10 320,0 L0,0 Z" />
        </g>
      </svg>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MediConnect logo" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="text-black font-bold text-lg md:text-xl select-none">
              Medi<span className="text-green-500">Connect</span>
            </span>
          </div>

          {/* Nav: hidden on small screens */}
          <nav className="hidden md:flex items-center gap-8 text-black font-semibold">
            <a href="#inicio" className="hover:text-green-500">Inicio</a>
            <a href="#nosotros" className="hover:text-green-500">Nosotros</a>
            <a href="#servicios" className="hover:text-green-500">Servicios</a>
            <a href="#contacto" className="hover:text-green-500">Contacto</a>
          </nav>

          {/* Right buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/registro"
              className="bg-white text-green-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 border border-green-500 text-sm md:text-base"
            >
              ¡Registrarse!
            </Link>

            <Link
              to="/login"
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 text-sm md:text-base"
            >
              Iniciar sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
              aria-label="Abrir menú"
              className="p-2 rounded-md bg-white/90 hover:bg-white text-green-700"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 border-t border-gray-200 shadow-sm">
            <div className="px-6 py-4 flex flex-col gap-3">
              <a href="#inicio" className="text-gray-800 font-medium">Inicio</a>
              <a href="#nosotros" className="text-gray-800 font-medium">Nosotros</a>
              <a href="#servicios" className="text-gray-800 font-medium">Servicios</a>
              <a href="#contacto" className="text-gray-800 font-medium">Contacto</a>

              <div className="pt-3 flex gap-2">
                <Link
                  to="/registro"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 bg-white text-green-600 border border-green-500 rounded-md px-3 py-2 text-center"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 bg-green-600 text-white rounded-md px-3 py-2 text-center"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero / Inicio */}
      <section id="inicio" className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Texto */}
          <div className="mx-auto md:mx-0 text-center md:text-left max-w-xl">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">BIENVENIDOS</h1>
            <h2 className="text-xl md:text-3xl font-semibold mt-2 md:mt-4 text-black">RESERVA TU CITA</h2>

            <p className="mt-4 text-sm md:text-lg text-justify text-black/90">
              Facilita tu salud con MediConnect. Reserva tu cita médica en línea de forma rápida y segura, sin filas ni esperas.
              Accede a especialistas confiables cuando lo necesites y lleva el control de tus consultas desde cualquier dispositivo.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to="/registro"
                className="px-5 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition w-full sm:w-auto text-center"
              >
                Registrarse
              </Link>

              <Link
                to="/login"
                className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition w-full sm:w-auto text-center"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="flex justify-center md:justify-end">
            <img
              src={PersonasImage}
              alt="Personas usando MediConnect"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-6">Sobre Nosotros</h2>
          <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
            En MediConnect creemos que la salud es un derecho y debe ser accesible para todos.
            Nacimos con el propósito de eliminar las barreras que dificultan el acceso a servicios médicos de calidad.
            Nuestra plataforma conecta pacientes con especialistas de manera simple, rápida y confiable, optimizando tiempos y asegurando atención personalizada.
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-gray-50 py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-10">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-green-500">Agendamiento de Citas</h3>
              <p className="text-gray-700 text-sm md:text-base">Reserva tu cita médica en segundos con especialistas de todas las áreas, evitando filas y largas esperas.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-green-500">Historia Clínica Digital</h3>
              <p className="text-gray-700 text-sm md:text-base">Accede a tu historial médico en cualquier momento y compártelo de forma segura con tu especialista.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-green-500">Notificaciones y Recordatorios</h3>
              <p className="text-gray-700 text-sm md:text-base">Recibe alertas sobre tus próximas consultas y mantente al día con tus tratamientos y chequeos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-green-600 py-16 md:py-20 px-6 md:px-10 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Contáctanos</h2>
          <p className="mb-8 text-sm md:text-lg">¿Tienes dudas o deseas más información? Nuestro equipo está listo para ayudarte.</p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre completo" className="p-3 rounded-lg text-black w-full"/>
            <input type="email" placeholder="Correo electrónico" className="p-3 rounded-lg text-black w-full"/>
            <textarea placeholder="Escribe tu mensaje" className="col-span-1 md:col-span-2 p-3 rounded-lg text-black h-32"></textarea>
            <button className="col-span-1 md:col-span-2 bg-white text-green-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition">Enviar Mensaje</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 text-gray-600 text-sm">
        © 2025 MediConnect — Todos los derechos reservados.
      </footer>
    </div>
  );
}
