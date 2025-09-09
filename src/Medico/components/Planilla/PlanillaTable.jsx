import React from "react";

export default function PlanillaTable({
  mode = "por",
  porTomar = [],
  tomadas = [],
  onViewDetails,
  onAsignar,
}) {
  const rows = mode === "por" ? porTomar : tomadas;

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="px-6 py-3 font-semibold text-gray-700">Tipo de cita</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Fecha</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Hora</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Estado</th>
            <th
              colSpan={2}
              className="px-6 py-3 font-semibold text-gray-700 text-center"
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-8 text-center text-gray-400"
              >
                No hay citas.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-gray-200 hover:bg-green-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-900">{r.tipo}</td>
                <td className="px-6 py-3 text-green-600">
                  {r.fechaReadable || r.fecha}
                </td>
                <td className="px-6 py-3">{r.hora}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.estado === "Programada"
                        ? "bg-green-100 text-green-700"
                        : r.estado === "Completada"
                        ? "bg-green-100 text-green-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {r.estado}
                  </span>
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => onViewDetails(r)}
                  >
                    Ver detalles
                  </button>
                </td>
                {mode === "por" && (
                  <td className="px-6 py-3 text-center">
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => onAsignar(r)}
                    >
                      Asignar indicaciones
                    </button>
                  </td>
                )}
                {mode !== "por" && <td></td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
