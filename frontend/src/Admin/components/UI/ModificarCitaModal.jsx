import React, { useState } from "react";

export default function ModificarCitaModal({ isOpen, onClose, cita, onConfirm }) {
  const [fecha, setFecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [motivo, setMotivo] = useState(cita?.motivo || "");
  const [observaciones, setObservaciones] = useState(cita?.observaciones || "");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!fecha || !hora || !motivo) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    onConfirm({
      ...cita,
      fecha,
      hora,
      motivo,
      observaciones,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Modificar Cita</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha *</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hora *</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo *</label>
            <input
              type="text"
              placeholder="Motivo de la cita"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Observaciones</label>
            <textarea
              placeholder="Notas adicionales..."
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              rows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
