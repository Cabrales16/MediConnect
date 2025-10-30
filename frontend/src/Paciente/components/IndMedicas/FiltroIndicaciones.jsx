import React from "react";

export default function FiltroIndicaciones({ filtro, setFiltro }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <label className="font-semibold text-gray-700">Mostrar:</label>
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="todas">Todas</option>
        <option value="medicamentos">Medicamentos</option>
        <option value="terapias">Terapias</option>
        <option value="indicaciones">Indicaciones</option>
      </select>
    </div>
  );
}
