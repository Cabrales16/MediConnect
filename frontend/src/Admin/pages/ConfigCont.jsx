import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importa useNavigate
import Breadcrumb from "../components/UI/Breadcrumb";
import ThemeToggle from "../components/UI/ThemeToggle";
import PrivacyToggle from "../components/UI/PrivacyToggle";

export default function ConfiguracionCont() {
  const navigate = useNavigate(); // 👈 inicializa el hook

  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Configuración" },
  ];

  const [activeTab, setActiveTab] = useState("perfil");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/home"); // o a la pantalla de login
  };
  
    useEffect(() => {
      // Block scroll
      document.body.style.overflow = "hidden";
      return () => {
        // Unblock scroll on cleanup
        document.body.style.overflow = "";
      };
    }, []);
    
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-4">Configuración</h2>
        <p className="text-sm text-gray-600 mb-6">
          Ajusta tu perfil, preferencias y opciones de privacidad en MediConnect.
        </p>

        {/* Tabs */}
        <div className="border-b border-gray-300 flex space-x-8 mb-6">
          {[
            { key: "perfil", label: "Perfil" },
            { key: "tema", label: "Tema" },
            { key: "privacidad", label: "Privacidad" },
            { key: "soporte", label: "Soporte y ayuda" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`pb-2 font-medium ${
                activeTab === tab.key
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido según pestaña */}
        {activeTab === "perfil" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Perfil y datos del usuario
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Las siguientes opciones te dirigirán a la acción que desees respecto a tu perfil.
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-400 divide-y w-full max-w-lg">
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-800 font-medium">Ver/editar perfil</span>
                <button
                  onClick={() => navigate("/admin/perfil")} // 👈 redirige al perfil
                  className="px-4 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                >
                  Seleccionar
                </button>
              </div>

                <div className="flex justify-between items-center p-4">
                  <span className="text-gray-800 font-medium">Cerrar sesión</span>
                  <button
                    className="px-4 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                    onClick={handleLogout}
                  >
                    Seleccionar
                  </button>
                </div>
            </div>
          </div>
        )}

        {activeTab === "tema" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Tema</h3>
            <p className="text-gray-600 text-sm mb-4">
              Personaliza los colores y la apariencia de la aplicación.
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-400 w-full max-w-lg">
              <ThemeToggle />
            </div>
          </div>
        )}

        {activeTab === "privacidad" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Privacidad</h3>
            <p className="text-gray-600 text-sm mb-4">
              Configura la visibilidad de tus datos y permisos de acceso.
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-400 w-full max-w-lg">
              <PrivacyToggle />
            </div>
          </div>
        )}

        {activeTab === "soporte" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Soporte y ayuda</h3>
            <p className="text-gray-600 text-sm mb-4">
              Accede a preguntas frecuentes, manual de usuario o consulta los términos y condiciones.
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-400 divide-y w-full max-w-lg">
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-800 font-medium">Centro de ayuda (FAQ)</span>
                <a
                  href="/faq"
                  className="px-4 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                >
                  Seleccionar
                </a>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-800 font-medium">Términos y condiciones</span>
                <button
                  className="px-4 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                >
                  <a href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx" target="_blank" rel="noopener noreferrer">Seleccionar</a>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
