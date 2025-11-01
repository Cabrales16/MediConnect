import React from "react";

export default function UsuaTable({
  mode = "pacientes",
  pacientes = [],
  medicos = [],
  usuarios = [],
  data = null,
  onViewDetails,
}) {

  let rows = [];

  if (Array.isArray(data)) {
    rows = data;
  } else {
    if (mode === "pacientes") {
      rows = pacientes;
    } else if (mode === "medicos") {
      rows = medicos;
    } else {
      rows = usuarios;
    }
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="px-6 py-3 font-semibold text-gray-700">Nombre</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Apellidos</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Correo</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Teléfono</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Acción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id_usuario ?? r.id ?? `${r.correo ?? r.nombre}-${Math.random()}`}
              className="border-t border-gray-200 hover:bg-green-50 transition"
            >
              <td className="px-6 py-3">{r.nombre}</td>
              <td className="px-6 py-3">{r.apellido}</td>
              <td className="px-6 py-3">{r.correo}</td>
              <td className="px-6 py-3">{r.telefono}</td>
              <td className="px-6 py-3">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => onViewDetails && onViewDetails(r)}
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