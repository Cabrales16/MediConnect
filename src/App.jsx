import React, { useEffect } from "react";
import PacienteLayout from "./Paciente/PacienteLayout";
import Home from "./LandingPage/LandingPage";

export default function App() {
  // Bloquear scroll de TODA la app
  useEffect(() => {
    document.body.style.overflow = "hidden"; 
  }, []);

  return (
    <>
      <PacienteLayout />
      {/* <Home /> */}
    </>
  );
}
