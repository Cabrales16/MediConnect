import React from "react";

export default function PaginacionPlanilla({
  totalItems,
  itemsPorPagina,
  paginaActual,
  onPageChange,
}) {
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
  if (totalPaginas <= 1) return null;

  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) paginas.push(i);

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
        className={`px-3 py-1 rounded-lg border ${
          paginaActual === 1
            ? "text-gray-400 border-gray-200"
            : "text-green-600 border-green-400 hover:bg-green-50"
        }`}
      >
        ← Anterior
      </button>

      {paginas.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded-lg border ${
            paginaActual === num
              ? "bg-green-500 text-white border-green-600"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className={`px-3 py-1 rounded-lg border ${
          paginaActual === totalPaginas
            ? "text-gray-400 border-gray-200"
            : "text-green-600 border-green-400 hover:bg-green-50"
        }`}
      >
        Siguiente →
      </button>
    </div>
  );
}