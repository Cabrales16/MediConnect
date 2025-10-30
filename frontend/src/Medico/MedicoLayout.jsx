import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Menu/SideBar";
import InicioCont from "./pages/InicioCont";
import PlanillaCont from "./pages/PlanillaCont";
import FaqCont from "./pages/FaqCont";
import ConfigCont from "./pages/ConfigCont";
import PerfilCont from "./pages/PerfilCont";
import EditarPerfilCont from "./pages/EditarPerfilCont";
import NovedadDetalle from "./components/Inicio/NovedadDetalle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MedicoLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar con botón hamburguesa */}
      <header className="w-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Fondo oscuro cuando el sidebar está abierto en móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Contenido principal */}
        <main
          className={`flex-1 p-4 md:p-6 overflow-auto transition-all duration-200 ${
            sidebarOpen ? "pointer-events-none md:pointer-events-auto" : ""
          }`}
          aria-hidden={sidebarOpen ? "true" : "false"}
        >
          <Routes>
            <Route index element={<InicioCont />} />
            <Route path="/" element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<InicioCont />} />
            <Route path="inicio/:id" element={<NovedadDetalle />} />
            <Route path="planilla" element={<PlanillaCont />} />
            <Route path="faq" element={<FaqCont />} />
            <Route path="configuracion" element={<ConfigCont />} />
            <Route path="perfil" element={<PerfilCont />} />
            <Route path="perfil/editar" element={<EditarPerfilCont />} />
            <Route path="*" element={<Navigate to="inicio" replace />} />
          </Routes>
        </main>
      </div>

      {/* Notificaciones */}
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}