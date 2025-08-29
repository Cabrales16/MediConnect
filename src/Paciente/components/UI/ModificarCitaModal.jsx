import React, { useState } from "react";

export default function ModificarCitaModal({ cita, onCancel, onSave }) {
  const [fecha, setFecha] = useState(cita.fecha || "");
  const [hora, setHora] = useState(cita.hora || "");
  const [direccion, setDireccion] = useState(cita.direccion || "");

  // Opciones de direcciones de ejemplo
  const direcciones = [
    "Calle 123, Bogotá",
    "Av. Siempre Viva 45",
    "Cll 50 #20-10",
    "Cra 15 #45-67",
    "Transv. 90 #10-20"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...cita, fecha, hora, direccion });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Modificar cita</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Hora */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hora
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Dirección (menú desplegable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <select
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="" disabled>
                Selecciona una dirección
              </option>
              {direcciones.map((dir, idx) => (
                <option key={idx} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
