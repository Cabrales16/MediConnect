import React, { useState } from "react";
import PaginacionOpcio from "./PaginacionOpcio";
import agregarIcon from "./GestOpcioIcons/agregarIcon.png";
import editarIcon from "./GestOpcioIcons/editarIcon.png";
import eliminarIcon from "./GestOpcioIcons/eliminarIcon.png";
import { API_BASE_URL } from "../../../config";

export default function TerapiasTable({ data, onAdd, onEdit, onDelete }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  const totalItems = data.length;
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
  const indexInicio = (paginaActual - 1) * itemsPorPagina;
  const datosPaginados = data.slice(indexInicio, indexInicio + itemsPorPagina);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Terapias</h3>
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex gap-4"
        >
          <img src={agregarIcon} alt="Agregar terapia" className="w-6" />
          <p>Agregar</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
        <div className="overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-black">Nombre</th>
                <th className="px-6 py-3 text-left text-black">Estado</th>
                <th className="px-6 py-3 text-left text-black">Archivo</th>
                <th className="px-6 py-3 text-center text-black w-[160px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.length > 0 ? (
                datosPaginados.map((t) => (
                  <tr key={t.id_terapia} className="border-t border-gray-300">
                    <td className="px-6 py-4">{t.nombre}</td>
                    <td className="px-6 py-4 text-green-700">{t.estado}</td>
                    <td className="px-6 py-4">
                      {t.archivo ? (
                      <a
                        href={`${API_BASE_URL}/static/terapias/${t.archivo.split("/").pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Ver archivo
                      </a>

                      ) : (
                        <span className="text-gray-500">Sin archivo</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => onEdit(t)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                        >
                          <img src={editarIcon} alt="Editar terapia" className="h-5" />
                        </button>
                        <button
                          onClick={() => onDelete(t.id_terapia)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        >
                          <img src={eliminarIcon} alt="Eliminar terapia" className="h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No hay terapias registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PaginacionOpcio
          totalItems={totalItems}
          itemsPorPagina={itemsPorPagina}
          paginaActual={paginaActual}
          onPageChange={setPaginaActual}
        />
      </div>
    </div>
  );
}