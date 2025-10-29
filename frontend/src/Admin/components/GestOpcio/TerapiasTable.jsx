import React from "react";

//Iconos
import agregarIcon from "./GestOpcioIcons/agregarIcon.png"
import editarIcon from "./GestOpcioIcons/editarIcon.png"
import eliminarIcon from "./GestOpcioIcons/eliminarIcon.png"

export default function TerapiasTable({ data, onAdd, onEdit, onDelete }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Terapias</h3>
        <button onClick={onAdd} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex gap-4">
            <img src={agregarIcon} alt="Agregar terapia" className="w-6"/> <p>Agregar</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
        <div className="overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-black">Tipo</th>
                <th className="px-6 py-3 text-left text-black">Frecuencia</th>
                <th className="px-6 py-3 text-left text-black">Duración</th>
                <th className="px-6 py-3 text-left text-black">Objetivos</th>
                <th className="px-6 py-3 text-center text-black w-[160px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="border-t border-gray-300">
                  <td className="px-6 py-4">{t.tipo}</td>
                  <td className="px-6 py-4 text-green-700">{t.frecuencia}</td>
                  <td className="px-6 py-4 text-green-700">{t.duracion}</td>
                  <td className="px-6 py-4 text-green-700">{t.objetivos}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => onEdit(t)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      >
                        <img src={editarIcon} alt="Editar terapia" className="h-5"/>
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      >
                        <img src={eliminarIcon} alt="Eliminar terapia" className="h-5"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay terapias.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
