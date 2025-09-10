import React from "react";

export default function PlanillaTable({ mode = "por", porTomar = [], tomadas = [], onViewDetails }) {
  const rows = mode === "por" ? porTomar : tomadas;

  return (
    <div>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-sm">
              <th className="px-6 py-3 text-black">Tipo de cita</th>
              <th className="px-6 py-3 text-black">Fecha</th>
              <th className="px-6 py-3 text-black">Hora</th>
              <th className="px-6 py-3 text-black">Estado</th>
              <th className="px-6 py-3 text-black pl-9">Acción</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-300 hover:bg-green-50">
                <td className="px-6 py-2 text-black  w-1/4">{r.tipo}</td>
                <td className="px-6 py-2 text-green-700 w-1/4">{r.fechaReadable || r.fecha}</td>
                <td className="px-6 py-2 text-green-700">{r.hora}</td>
                
                <td className="px-6 py-2 text-green-700 w-1/5">
                  <span className="px-2 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{r.estado || "Tomada"}</span>
                </td>
                <td className="px-6 p-4 text-green-700">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => onViewDetails(r)}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay citas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
