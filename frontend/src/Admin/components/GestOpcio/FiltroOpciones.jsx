import React, { useState, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

export default function FiltroOpciones({ filtro, setFiltro }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const clickFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuAbierto(false);
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  const opciones = [
    { key: "todos", label: "Todos" },
    { key: "medicamentos", label: "Medicamentos" },
    { key: "terapias", label: "Terapias" },
  ];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
      >
        <FaFilter className="text-gray-600" />
        <span className="font-medium text-gray-700 capitalize">
          {opciones.find((o) => o.key === filtro)?.label}
        </span>
      </button>

      {menuAbierto && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {opciones.map((o) => (
            <button
              key={o.key}
              onClick={() => {
                setFiltro(o.key);
                setMenuAbierto(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${
                filtro === o.key
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
