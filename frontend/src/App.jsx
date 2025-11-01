import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PacienteLayout from "./Paciente/PacienteLayout";
import MedicoLayout from "./Medico/MedicoLayout"
import AdminLayout from "./Admin/AdminLayout"
import Home from "./LandingPage/LandingPage";
import Login from "./InicioSesion/InicioSesion";
import Register from "./Registro/Registro"
import RecuperarContrasena from "./RecuperarContraseña/RecuperarContraseña"
import RestablecerContrasena from "./RestablecerContraseña/RestablecerContraseña"
import PrivateRoute from "./InicioSesion/PrivateRoute"; 
import BienvenidaCorreo from "./BienvenidaCorreo/Bienvenida"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/recuperar" element={<RecuperarContrasena />} />
        <Route path="/restablecer/:token" element={<RestablecerContrasena />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bienvenida/:token" element={<BienvenidaCorreo />} />
        
        <Route path="/paciente/*" element={<PrivateRoute rol="Paciente"> <PacienteLayout /> </PrivateRoute>} />
        <Route path="/medico/*" element={<PrivateRoute rol="Médico"> <MedicoLayout /> </PrivateRoute>} />
        <Route path="/admin/*" element={<PrivateRoute rol="Administrador"> <AdminLayout /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
