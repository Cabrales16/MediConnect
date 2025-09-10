import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agendarIcon from "./NavbarIcons/agendarIcon.png";
import ModifcarDatosModal from "../UI/ModificarDatosModal.jsx";

export default function ModificarDatos() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = (tipoCita) => {
    setIsOpen(false);

    // Redirigir con datos prellenados
    navigate("/citas", {
      state: {
        tipoCita,
        selectedDate: "2025-08-30", // 30 de agosto 2025
        hora: {
          tipo: "especifica",
          inicio: "08:00",
          am_pm: "AM",
        },
        ubicacion: "Sede Principal",
      },
    });
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
        <span className="hidden md:inline whitespace-nowrap">Modificar datos</span>
      </button>

      <ModifcarDatosModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
