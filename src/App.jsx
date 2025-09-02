import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PacienteLayout from "./Paciente/PacienteLayout";
import Home from "./LandingPage/LandingPage";
import Login from "./InicioSesion/InicioSesion";
import Register from "./Registro/Registro"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing pública */}
        <Route path="/home" element={<Home />} />
        <Route index element={<Navigate to="/home" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas / app del paciente */}
        {/* PacienteLayout ya NO debe incluir BrowserRouter */}
        <Route path="/*" element={<PacienteLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
