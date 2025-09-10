import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PacienteLayout from "./Paciente/PacienteLayout";
import MedicoLayout from "./Medico/MedicoLayout"
import Home from "./LandingPage/LandingPage";
import Login from "./InicioSesion/InicioSesion";
import Register from "./Registro/Registro"
import RecuperarContrasena from "./RecuperarContraseña/RecuperarContraseña"
import RestablecerContrasena from "./RestablecerContraseña/RestablecerContraseña"
import PrivateRoute from "./InicioSesion/PrivateRoute"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing pública */}
        <Route path="/home" element={<Home />} />
        <Route index element={<Navigate to="/home" replace />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/recuperar" element={<RecuperarContrasena />} />
        <Route path="/restablecer" element={<RestablecerContrasena />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas / app del paciente */}
        {/* PacienteLayout ya NO debe incluir BrowserRouter */}
        
        <Route path="/paciente/*" element={<PrivateRoute rol="Paciente"> <PacienteLayout /> </PrivateRoute>} />
        <Route path="/medico/*" element={<PrivateRoute rol="Médico"> <MedicoLayout /> </PrivateRoute>} />
        <Route path="/admin/*" element={<PrivateRoute rol="Administrador"> <MedicoLayout /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
