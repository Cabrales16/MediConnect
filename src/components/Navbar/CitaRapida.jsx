import React from "react";
import agendarIcon from "./NavbarIcons/agendarIcon.png";

export default function QuickAppointmentButton() {
  return (
    <a
      href="/quick-appointment"
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-500 text-white font-medium shadow-sm hover:bg-green-600 transition"
      aria-label="Cita rápida"
    >
      <img src={agendarIcon} alt="" className="w-6 h-6" />
      <span className="whitespace-nowrap">Cita rápida</span>
    </a>
  );
}
