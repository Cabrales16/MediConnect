import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Menu/SideBar";
import InicioCont from "./components/Inicio/InicioCont";
import CitasCont from "./components/Citas/CitasCont";
import PlanillaCont from "./components/Planilla/PlanillaCont";
import FamiliaresCont from "./components/Familiares/FamiliaresCont";
import IndMedicasCont from "./components/IndMedicas/IndMedicasCont";

export default function App() {
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
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/inicio" element={<InicioCont />} />
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
