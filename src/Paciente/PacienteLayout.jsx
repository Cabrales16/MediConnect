// src/layouts/PacienteLayout.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Menu/SideBar";
import InicioCont from "./pages/InicioCont";
import CitasCont from "./pages/CitasCont";
import PlanillaCont from "./pages/PlanillaCont";
import FamiliaresCont from "./pages/FamiliaresCont";
import IndMedicasCont from "./pages/IndMedicasCont";

export default function PacienteLayout() {
  return (
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
            {/* Importante: rutas relativas */}
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<InicioCont />} />
            <Route path="citas" element={<CitasCont />} />
            <Route path="planilla" element={<PlanillaCont />} />
            <Route path="familiares" element={<FamiliaresCont />} />
            <Route path="indicaciones" element={<IndMedicasCont />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
