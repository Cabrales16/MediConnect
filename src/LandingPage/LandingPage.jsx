import React from "react";
import logo from "./LandingPageImages/Logo.png";
import PersonasImage from "./LandingPageImages/CaractImage.png"

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
      <header className="flex justify-between items-center px-10 py-4 relative z-10 bg-white/80">
        {/* Logo de la pagina */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 bg-transparent" />
          <span style={{ position: 'relative', top: '-1px' }} className="text-black font-bold text-xl">
            Medi<span className="text-green-500">Connect</span>
          </span>
        </div>

        <nav className="flex space-x-10 text-black font-semibold">
          <a href="#" className="hover:text-green-500">Inicio</a>
          <a href="#" className="hover:text-green-500">Nosotros</a>
          <a href="#" className="hover:text-green-500">Servicios</a>
          <a href="#" className="hover:text-green-500">Contacto</a>
        </nav>

        <div className="flex gap-3">
          {/* Botón registrarse */}
        <button className="bg-white text-green-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 border-1 border-green-500">
          ¡Registrarse!
        </button>
        
        {/* Botón iniciar sesión */}
        <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600">
          Iniciar sesión
        </button>
        </div>

        
      </header>

      {/* Contenido principal */}
      <div className="grid grid-cols-2 px-10 mt-10 relative z-10 pt-12">
       
        <div className="text-black text-center max-w-md mx-auto mt-20 space-y-2">
          <h1 className="text-6xl font-bold">BIENVENIDOS</h1>
          <h2 className="text-4xl font-semibold">RESERVA TU CITA</h2>
          <p className="text-lg text-justify">
            Facilita tu salud con Mediconnect. Reserva tu cita médica en línea de forma rápida y segura, sin filas ni esperas. 
    Accede a especialistas confiables cuando lo necesites y lleva el control de tus consultas desde cualquier dispositivo.
          </p>
        </div>

        {/* Imágenes lado derecho */}
        <div className="flex justify-center items-center space-x-6">
         <img src={PersonasImage} alt="FotoHome" className="w-150 pt-8" />
        </div>
      </div>
    </div>
  );
}
