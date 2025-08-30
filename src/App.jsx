import React, { useEffect } from "react";
import PacienteLayout from "./Paciente/PacienteLayout"
import Home from "./LandingPage/LandingPage"

export default function App() {
  // Esto es para eliminar el scroll de la página
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Elimina scroll
    return () => {
      document.body.style.overflow = ""; // Limpieza si App se desmonta
    };
  }, []);

  return (
    <>

    <PacienteLayout />
    {/* <Home /> */}
    
    </>
  );
}