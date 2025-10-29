import React from "react";
import agregarIcon from "./GestOpcioIcons/agregarIcon.png";
import editarIcon from "./GestOpcioIcons/editarIcon.png";
import eliminarIcon from "./GestOpcioIcons/eliminarIcon.png";

export default function MedicamentosTable({ data, onAdd, onEdit, onDelete }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Medicamentos</h3>
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex gap-4"
        >
          <img src={agregarIcon} alt="Agregar medicamento" className="w-6" />
          <p>Agregar</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
        <div className="overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-black">Nombre</th>
                <th className="px-6 py-3 text-left text-black">Presentación</th>
                <th className="px-6 py-3 text-left text-black">Unidad de Medida</th>
                <th className="px-6 py-3 text-center text-black w-[160px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m) => {
                const id = m.id_medicamento ?? m.id; // 👈 fallback por si backend devuelve "id"
                return (
                  <tr key={id} className="border-t border-gray-300">
                    <td className="px-6 py-4">{m.nombre}</td>
                    <td className="px-6 py-4">{m.presentacion}</td>
                    <td className="px-6 py-4">{m.unidad_medida}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => onEdit(m)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                          title="Editar medicamento"
                        >
                          <img src={editarIcon} alt="Editar" className="h-5" />
                        </button>
                        <button
                          onClick={() => onDelete(id)} // 👈 aseguramos que reciba el ID correcto
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          title="Eliminar medicamento"
                        >
                          <img src={eliminarIcon} alt="Eliminar" className="h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {data.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No hay medicamentos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
