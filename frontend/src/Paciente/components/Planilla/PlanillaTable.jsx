import React from "react";

export default function PlanillaTable({
  mode = "por",
  data = [],
  porTomar = [],
  tomadas = [],
  onViewDetails,
}) {
  // ✅ Si "data" viene vacío (por compatibilidad), usa fallback antiguo
  const rows = data.length > 0 ? data : mode === "por" ? porTomar : tomadas;

  // Mapear estado de BD → UI
  const formatEstado = (estado) => {
    switch (estado) {
      case "PROGRAMADA":
        return "Programada";
      case "CANCELADA":
        return "Cancelada";
      case "COMPLETADA":
        return "Completada";
      default:
        return estado;
    }
  };

  const getEstadoClasses = (estado) => {
    if (estado === "CANCELADA") {
      return "bg-red-100 text-red-700";
    }

    return "bg-green-100 text-green-700";
  };

  return (
    <div>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-sm border-b border-gray-300">
              <th className="px-6 py-3 text-black">Tipo de cita</th>
              <th className="px-6 py-3 text-black">Fecha</th>
              <th className="px-6 py-3 text-black">Hora</th>
              <th className="px-6 py-3 text-black">Estado</th>
              <th className="px-6 py-3 text-black pl-9">Acción</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((r) => (
                <tr
                  key={r.id_cita}
                  className="border-t border-gray-200 hover:bg-green-50 transition"
                >
                  <td className="px-6 py-2 text-black w-1/4">
                    {r.especialidad_medico || "General"}
                  </td>
                  <td className="px-6 py-2 text-green-700 w-1/4">
                    {r.fechaReadable || r.fecha}
                  </td>
                  <td className="px-6 py-2 text-green-700">{r.hora}</td>
                  <td className="px-6 py-2 w-1/5">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getEstadoClasses(
                        r.estado_cita
                      )}`}
                    >
                      {formatEstado(r.estado_cita)}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => onViewDetails(r)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay citas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}