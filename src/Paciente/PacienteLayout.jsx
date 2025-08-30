import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

export default function PacienteLayout() {


  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Navbar */}
        <header className="w-full">
          <Navbar />
        </header>

        {/* Contenedor principal: Sidebar + Contenido */}
        <div className="flex flex-1">
          {/* Barra lateral */}
          <aside className="bg-white">
            <Sidebar />
          </aside>

          {/* Contenido principal */}
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/faq" element={<FaqCont />} />
              <Route path="/configuracion" element={<ConfigCont />} />
              <Route path="/perfil" element={<PerfilCont />} />
              <Route path="/perfil/editar" element={<EditarPerfilCont />} />
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/inicio" element={<InicioCont />} />
              <Route path="/novedad/:id" element={<NovedadDetalle />} />
              <Route path="/citas" element={<CitasCont />} />
              <Route path="/planilla" element={<PlanillaCont />} />
              <Route path="/familiares" element={<FamiliaresCont />} />
              <Route path="/indicaciones" element={<IndMedicasCont />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}