import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agendarIcon from "./NavbarIcons/agendarIcon.png";
import ModificarDatosModal from "../UI/ModificarDatosModal";

export default function ModificarDatos() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Cierra el modal y redirige al home del médico
    setIsOpen(false);
    navigate("/medico/inicio");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-500 text-white font-medium shadow-sm hover:bg-green-600"
      >
        {/* Icono visible siempre */}
        <img
          src={agendarIcon}
          alt="Modificar datos"
          className="w-6 h-6"
        />

        {/* Texto visible solo en pantallas medianas o mayores */}
        <span className="hidden md:inline whitespace-nowrap">
          Modificar datos
        </span>
      </button>

      {isOpen && (
        <ModificarDatosModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
