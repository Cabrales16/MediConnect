import React from "react";
import { Link } from "react-router-dom";
import editarIcon from "../GestNovedades/GestNovedadesImages/editarIcon.png";
import eliminarIcon from "../GestNovedades/GestNovedadesImages/eliminarIcon.png";

export default function NovedadCard({ item, onEdit, onDelete }) {
  const imagenSrc =
    item.src?.startsWith("http")
      ? item.src
      : `http://127.0.0.1:8000/static/uploads/novedades/${item.src || "placeholder.jpg"}`;

  return (
    <div
      key={item.id_novedad}
      className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden flex flex-col transition-all hover:shadow-md hover:scale-[1.01]"
    >
      {/* Imagen */}
      <img
        src={imagenSrc}
        alt={item.titulo || "Imagen de novedad"}
        className="h-40 w-full object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Título truncado a una línea */}
        <h3 className="text-lg font-semibold mb-2 text-gray-800 truncate">
          {item.titulo}
        </h3>

        {/* Descripción truncada a dos líneas con puntos suspensivos */}
        <p className="text-gray-600 text-sm flex-grow overflow-hidden text-ellipsis line-clamp-2">
          {item.descripcion}
        </p>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/admin/novedades/${item.id_novedad}`}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition-all text-center"
          >
            Ver más
          </Link>

          <button
            onClick={() => onEdit(item.id_novedad)}
            className="flex items-center justify-center w-12 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm transition-all"
            title="Editar novedad"
          >
            <img src={editarIcon} alt="Editar novedad" className="w-6" />
          </button>

          <button
            onClick={() => onDelete(item.id_novedad)}
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
