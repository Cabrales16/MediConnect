import React from "react";

export default function UsuaTable({ mode = "pacientes", pacientes = [], medicos = [], onViewDetails }) {
  const rows = mode === "pacientes" ? pacientes : medicos;

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="px-6 py-3 font-semibold text-gray-700">Nombre</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Apellido</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Tipo de doc.</th>
            <th className="px-6 py-3 font-semibold text-gray-700">N° de doc.</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Acción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-gray-200 hover:bg-green-50 transition">
              <td className="px-6 py-3">{r.nombre}</td>
              <td className="px-6 py-3">{r.apellido}</td>
              <td className="px-6 py-3">{r.tipoDoc}</td>
              <td className="px-6 py-3">{r.numDoc}</td>
              <td className="px-6 py-3">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => onViewDetails(r)}
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                No hay usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
