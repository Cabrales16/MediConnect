import React from "react";

export default function FiltroIndicaciones({ filtro, setFiltro }) {
  const opciones = [
    { value: "todas", label: "Todas" },
    { value: "medicamentos", label: "Medicamentos" },
    { value: "terapias", label: "Terapias" },
    { value: "indicaciones", label: "Indicaciones" },
  ];

  return (
    <div className="flex items-center gap-3 mb-6">
      <label className="text-gray-700 font-medium">Filtrar por:</label>
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      >
        {opciones.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
}
