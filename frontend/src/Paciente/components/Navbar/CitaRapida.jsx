import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agendarIcon from "./NavbarIcons/agendarIcon.png";
import CitaRapidaModal from "../UI/CitaRapidaModal.jsx";

export default function CitaRapidaButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = (tipoCita) => {
    setIsOpen(false);

    // Redirigir con datos prellenados
    navigate("/paciente/citas", { state: { tipoCita } });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-500 text-white font-medium shadow-sm hover:bg-green-600 transition"
      >
        {/* Icono siempre visible */}
        <img src={agendarIcon} alt="Cita rápida" className="w-6 h-6" />

        {/* Texto solo visible en md+ */}
        <span className="hidden md:inline whitespace-nowrap">Cita rápida</span>
      </button>

      <CitaRapidaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
