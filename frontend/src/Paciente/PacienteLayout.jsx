import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Menu/SideBar";
import InicioCont from "./pages/InicioCont";
import CitasCont from "./pages/CitasCont";
import PlanillaCont from "./pages/PlanillaCont";
import FamiliaresCont from "./pages/FamiliaresCont";
import IndMedicasCont from "./pages/IndMedicasCont";
import FaqCont from "./pages/FaqCont";
import ConfigCont from "./pages/ConfigCont";
import PerfilCont from "./pages/PerfilCont";
import EditarPerfilCont from "./pages/EditarPerfilCont";
import NovedadDetalle from "./components/Inicio/NovedadDetalle";
import ListaDoctores from "./components/Citas/MedicosDisponibles/ListaDoctores"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente para manejar rutas no encontradas
function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
      <a 
        href="/paciente/inicio" 
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Ir al inicio
      </a>
    </div>
  );
}

export default function PacienteLayout() {
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
            {/* Ruta exacta para /paciente */}
            <Route index element={<InicioCont />} />
            
            {/* Rutas específicas */}
            <Route path="inicio" element={<InicioCont />} />
            <Route path="inicio/:id" element={<NovedadDetalle />} />
            <Route path="citas" element={<CitasCont />} />
            <Route path="citas/medicos-cita" element={<ListaDoctores />} />
            <Route path="planilla" element={<PlanillaCont />} />
            <Route path="familiares" element={<FamiliaresCont />} />
            <Route path="indicaciones" element={<IndMedicasCont />} />
            <Route path="faq" element={<FaqCont />} />
            <Route path="configuracion" element={<ConfigCont />} />
            <Route path="perfil" element={<PerfilCont />} />
            <Route path="perfil/editar" element={<EditarPerfilCont />} />
            
            {/* Página 404 sin Navigate para evitar bucles */}
            <Route path="*" element={<NotFound />} />
          </Routes>        
        </main>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}