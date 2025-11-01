import React, { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";

export default function FiltroUsuarios({ filtro, setFiltro }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block mb-6">
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
      >
        <FaFilter className="text-gray-600" />
        <span className="font-medium text-gray-700 capitalize">
          {filtro === "todos" ? "Todos" : filtro}
        </span>
      </button>

      {menuAbierto && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => { setFiltro("todos"); setMenuAbierto(false); }}
            className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${filtro === "todos" ? "text-green-600 font-semibold" : "text-gray-700"}`}
          >
            Todos
          </button>
          <button
            onClick={() => { setFiltro("pacientes"); setMenuAbierto(false); }}
            className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${filtro === "pacientes" ? "text-green-600 font-semibold" : "text-gray-700"}`}
          >
            Pacientes
          </button>
          <button
            onClick={() => { setFiltro("medicos"); setMenuAbierto(false); }}
            className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${filtro === "medicos" ? "text-green-600 font-semibold" : "text-gray-700"}`}
          >
            Médicos
          </button>
        </div>
      )}
    </div>
  );
}
