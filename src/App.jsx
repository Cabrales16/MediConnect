import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PacienteLayout from "./Paciente/PacienteLayout.jsx";
import MedicoLayout from "./Medico/MedicoLayout";
import AdminLayout from "./Admin/AdminLayout";
import Login from "./InicioSesion/InicioSesión";

export default function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Simulación: aquí deberías obtener el rol real desde contexto, localStorage o backend
  const userRole = "paciente"; // "medico", "admin" o null si no hay sesión

  return (
    <Router>
      <Routes>
        {/* Página de Login */} 
        <Route path="/login" element={<Login />} />

        {/* Layouts por rol */}
        {userRole === "paciente" && (
          <Route path="/paciente/*" element={<PacienteLayout />} />
        )}
        {userRole === "medico" && (
          <Route path="/medico/*" element={<MedicoLayout />} />
        )}
        {userRole === "admin" && (
          <Route path="/admin/*" element={<AdminLayout />} />
        )}

        {/* Fallback: redirige según el rol o al login */}
        <Route
          path="*"
          element={
            userRole ? (
              <Navigate to={`/${userRole}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
