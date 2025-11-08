import React from "react";

export default function BarraBusquedaOpcio({ valor, onChange }) {
  return (
    <div className="flex-1">
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar opción (medicamento o terapia)..."
        className="w-full px-4 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}
