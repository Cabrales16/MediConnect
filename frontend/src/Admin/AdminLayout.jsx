import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Menu/Sidebar";
import InicioCont from "./pages/GestNovedCont";
import GestUsua from "./pages/GestUsua";
import GestOpcio from "./pages/GestOpcio";
import FaqCont from "./pages/FaqCont";
import ConfigCont from "./pages/ConfigCont";
import PerfilCont from "./pages/PerfilCont";
import EditarPerfilCont from "./pages/EditarPerfilCont";
import NovedadDetalle from "./components/GestNovedades/NovedadDetalle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      </header>

      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className="flex-1 p-4 md:p-6 overflow-auto"
          aria-hidden={sidebarOpen ? "true" : "false"}
        >
          <Routes>
            <Route path="/" element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<InicioCont />} />
            <Route path="novedades/:id" element={<NovedadDetalle />} />
            <Route path="gestion-usuarios" element={<GestUsua />} />
            <Route path="opciones-usuario" element={<GestOpcio />} />
            <Route path="faq" element={<FaqCont />} />
            <Route path="configuracion" element={<ConfigCont />} />
            <Route path="perfil" element={<PerfilCont />} />
            <Route path="perfil/editar" element={<EditarPerfilCont />} />
            <Route path="*" element={<Navigate to="inicio" replace />} />
          </Routes>
        </main>
      </div>

      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}