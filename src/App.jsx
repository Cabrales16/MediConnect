import React, { useEffect } from "react";
import RestablecerContraseña from "./RestablecerContraseña/RestablecerContraseña"


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

    <RestablecerContraseña />
  
    
    </>
  );
}