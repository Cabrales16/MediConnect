import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ rol, children }) {
  const token = localStorage.getItem("token");
  const userRol = localStorage.getItem("rol");

  // Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no coincide, redirigir a home
  if (rol && userRol !== rol) {
    return <Navigate to="/home" replace />;
  }


  // Si todo está bien, renderizar el layout
  return children;
}
