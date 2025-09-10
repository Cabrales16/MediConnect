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
              <th className="px-6 py-3 text-green-700">Fecha</th>
              <th className="px-6 py-3 text-green-700">Hora</th>
              {mode === "tomadas" && <th className="px-6 py-3 text-green-700">Médico</th>}
              <th className="px-6 py-3 text-green-700">Estado</th>
              <th className="px-6 py-3 text-green-700">Acción</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-6 py-4 text-black align-top w-1/3">{r.tipo}</td>
                <td className="px-6 py-4 text-green-700 align-top">{r.fechaReadable || r.fecha}</td>
                <td className="px-6 py-4 text-green-700 align-top">{r.hora}</td>
                {mode === "tomadas" && <td className="px-6 py-4 text-green-700 align-top">{r.medico}</td>}
                <td className="px-6 py-4 text-green-700 align-top">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">{r.estado || "Tomada"}</span>
                </td>
                <td className="px-6 py-4 text-green-700 align-top">
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
