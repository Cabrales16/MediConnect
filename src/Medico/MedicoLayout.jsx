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

export default function MedicoLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar: le pasamos toggle para abrir/cerrar en móvil */}
      <header className="w-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      </header>

      <div className="flex flex-1">
        {/* Sidebar: en móvil será overlay basado en sidebarOpen */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main area */}
        <main
          className="flex-1 p-4 md:p-6 overflow-auto"
          // cuando el sidebar overlay está abierto en móvil, podría evitar interacción con main
          aria-hidden={sidebarOpen ? "true" : "false"}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<InicioCont />} />
            <Route path="/inicio/:id" element={<NovedadDetalle />} />
            <Route path="/planilla" element={<PlanillaCont />} />
            <Route path="/faq" element={<FaqCont />} />
            <Route path="/configuracion" element={<ConfigCont />} />
            <Route path="/perfil" element={<PerfilCont />} />
            <Route path="/perfil/editar" element={<EditarPerfilCont />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
