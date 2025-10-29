import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import ReportErrorModal from "../components/UI/ReportErrorModal";

export default function FaqCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Centro de ayuda" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      // Block scroll
      document.body.style.overflow = "hidden";
      return () => {
        // Unblock scroll on cleanup
        document.body.style.overflow = "";
      };
    }, []);
    
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-4">Centro de ayuda</h2>
        <p className="text-sm text-gray-600 mb-6">
          Aquí encontrarás guías y respuestas a preguntas frecuentes sobre MediConnect.
        </p>

        {/* Preguntas frecuentes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Preguntas frecuentes</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Encuentra respuestas a las preguntas más comunes sobre el uso de MediConnect.
          </p>
          <button
            className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            type="button"
          >
            <a href="https://www.sena.edu.co/es-co/ciudadano/Paginas/preguntasFrecuentes.aspx" target="_blank" rel="noopener noreferrer">Ver preguntas frecuentes</a>
          </button>
        </div>

        {/* Manual de usuario */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Manual de usuario</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Descarga el manual de usuario en formato PDF para obtener una guía completa
            sobre todas las funciones de MediConnect.
          </p>
          <button
            className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            type="button"
          >
            <a href="https://sava.sena.edu.co/gfvd/manuales/usuario_sava.pdf" target="_blank" rel="noopener noreferrer">Descargar manual (PDF)</a>
          </button>
        </div>

        {/* Reportar un error */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Reportar un error</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Si encuentras algún problema o error en la aplicación, por favor, repórtalo
            para que podamos solucionarlo.
          </p>
          <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Reportar un error
        </button>
      </div>

      <ReportErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}