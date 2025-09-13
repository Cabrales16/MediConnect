import React from "react";
import { Link } from "react-router-dom";
import editarIcon from "../GestNovedades/GestNovedadesImages/editarIcon.png"
import eliminarIcon from "../GestNovedades/GestNovedadesImages/eliminarIcon.png"

export default function NovedadCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden flex flex-col">
      <img src={item.img} alt={item.titulo} className="h-40 w-full object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
        <p className="text-gray-600 text-sm flex-grow">{item.descripcion}</p>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/inicio/${item.id}`}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition-all text-center"
          >
            Ver más
          </Link>

          <button
            onClick={onEdit}
            className="flex items-center justify-center w-12 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm transition-all"
            title="Editar novedad"
          >
            <img src={editarIcon} alt="Editar novedad" className="w-6" />
          </button>

          <button
            onClick={onDelete}
            className="flex items-center justify-center w-12 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-all"
            title="Eliminar novedad"
          >
            <img src={eliminarIcon} alt="Eliminar novedad" className="w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
