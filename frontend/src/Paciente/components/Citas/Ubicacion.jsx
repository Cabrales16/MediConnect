// 📁 Ubicacion.jsx
import React, { useEffect, useState } from "react";
import { getTodosHospitales } from "../../../services/hospitalService"; // Ajusta la ruta si cambia

export default function Ubicacion({ ubicacion, setUbicacion, disabled }) {
  const [hospitales, setHospitales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarHospitales = async () => {
      try {
        const data = await getTodosHospitales();
        setHospitales(data || []);
      } catch (err) {
        console.error("❌ Error al obtener hospitales:", err);
        setError("No se pudieron cargar los hospitales.");
      } finally {
        setCargando(false);
      }
    };
    cargarHospitales();
  }, []);

  if (cargando) {
    return <p className="text-gray-500">Cargando hospitales...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!hospitales.length) {
    return <p className="text-gray-500">No hay hospitales registrados.</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold">Seleccione la ubicación</h3>
      <select
        value={ubicacion}
        onChange={(e) => setUbicacion(Number(e.target.value))}
        disabled={disabled}
        className={`p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 focus:border-green-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="" disabled>
          -- Selecciona un hospital --
        </option>
        {hospitales.map((h) => (
          <option key={h.id_hospital} value={h.id_hospital}>
            {h.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
