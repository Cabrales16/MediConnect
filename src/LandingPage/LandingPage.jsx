import React from "react";
import logo from "./LandingPageImages/Logo.png";
import PersonasImage from "./LandingPageImages/CaractImage.png";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-green-500 overflow-hidden">
      {/* Mancha curva esquina superior izquierda */}
      <svg
        className="absolute -top-[40px] left-0 w-[500px] h-[300px] text-white"
        viewBox="0 0 320 180"
        fill="currentColor"
      >
        <path d="M0,100 Q60,40 120,60 Q200,80 280,20 Q300,10 320,0 L0,0 Z" />
      </svg>

      {/* Mancha curva esquina inferior derecha mas abajo */}
      <svg
        className="absolute -bottom-[40px] right-0 w-[500px] h-[300px] text-white"
        viewBox="0 0 320 180"
        fill="currentColor"
      >
        <g transform="scale(-1,-1) translate(-320,-180)">
          <path d="M0,100 Q60,40 120,60 Q200,80 280,20 Q300,10 320,0 L0,0 Z" />
        </g>
      </svg>

      {/* Header */}
      <header className="flex justify-between items-center px-10 py-4 relative z-10 bg-white/80">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 bg-transparent" />
          <span
            style={{ position: "relative", top: "-1px" }}
            className="text-black font-bold text-xl"
          >
            Medi<span className="text-green-500">Connect</span>
          </span>
        </div>

        <nav className="flex space-x-10 text-black font-semibold">
          <a href="#inicio" className="hover:text-green-500">
            Inicio
          </a>
          <a href="#nosotros" className="hover:text-green-500">
            Nosotros
          </a>
          <a href="#servicios" className="hover:text-green-500">
            Servicios
          </a>
          <a href="#contacto" className="hover:text-green-500">
            Contacto
          </a>
        </nav>

        <div className="flex gap-3">
          <button className="bg-white text-green-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 border border-green-500">
            ¡Registrarse!
          </button>
          <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600">
            Iniciar sesión
          </button>
        </div>
      </header>

      {/* Hero / Inicio */}
      <section id="inicio" className="grid grid-cols-2 px-10 mt-10 relative z-10 pt-12">
        <div className="text-black text-center max-w-md mx-auto mt-20 space-y-4">
          <h1 className="text-6xl font-bold">BIENVENIDOS</h1>
          <h2 className="text-4xl font-semibold">RESERVA TU CITA</h2>
          <p className="text-lg text-justify">
            Facilita tu salud con MediConnect. Reserva tu cita médica en línea
            de forma rápida y segura, sin filas ni esperas. Accede a
            especialistas confiables cuando lo necesites y lleva el control de
            tus consultas desde cualquier dispositivo.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-6">
          <img src={PersonasImage} alt="FotoHome" className="w-150 pt-8" />
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white py-20 px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Sobre Nosotros</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            En MediConnect creemos que la salud es un derecho y debe ser accesible para todos. 
            Nacimos con el propósito de eliminar las barreras que dificultan el acceso a servicios médicos de calidad. 
            Nuestra plataforma conecta pacientes con especialistas de manera simple, rápida y confiable, 
            optimizando tiempos y asegurando atención personalizada.
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-gray-50 py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-500">
                Agendamiento de Citas
              </h3>
              <p className="text-gray-700">
                Reserva tu cita médica en segundos con especialistas de todas
                las áreas, evitando filas y largas esperas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-500">
                Historia Clínica Digital
              </h3>
              <p className="text-gray-700">
                Accede a tu historial médico en cualquier momento y compártelo
                de forma segura con tu especialista.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-500">
                Notificaciones y Recordatorios
              </h3>
              <p className="text-gray-700">
                Recibe alertas sobre tus próximas consultas y mantente al día
                con tus tratamientos y chequeos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-green-600 py-20 px-10 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
          <p className="mb-10 text-lg">
            ¿Tienes dudas o deseas más información? Nuestro equipo está listo
            para ayudarte.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre completo"
              className="p-3 rounded-lg text-black"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="p-3 rounded-lg text-black"
            />
            <textarea
              placeholder="Escribe tu mensaje"
              className="col-span-2 p-3 rounded-lg text-black h-32"
            />
            <button className="col-span-2 bg-white text-green-600 font-semibold py-3 rounded-lg hover:bg-gray-200 transition">
              Enviar Mensaje
            </button>
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
