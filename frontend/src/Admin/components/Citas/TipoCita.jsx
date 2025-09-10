import React from "react";

export default function TipoCita({ tipoCita, setTipoCita, disabled }) {
  const opciones = [
    "Cita de control",
    "Cita general",
    "Cita odontológica",
    "Cita pediatría",
    "Cita cardiología",
    "Cita dermatología",
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold">Seleccionar tipo de cita</h3>
      <select
        value={tipoCita}
        onChange={(e) => setTipoCita(e.target.value)}
        disabled={disabled}
        className={`p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 focus:border-green-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="" disabled hidden>
          -- Selecciona una opción --
        </option>
        {opciones.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
