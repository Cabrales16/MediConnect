import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AgendarCitaModal({ isOpen, onClose, onConfirm, user }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ fecha, hora, motivo });
    toast.success("¡Cita agendada exitosamente!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Agendar cita para {user?.nombre}</h2>

        <div className="space-y-4">
          <input type="date" className="w-full border rounded px-3 py-2" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          <input type="time" className="w-full border rounded px-3 py-2" value={hora} onChange={(e) => setHora(e.target.value)} />
          <textarea placeholder="Motivo" className="w-full border rounded px-3 py-2" rows={3} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancelar</button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Confirmar</button>
        </div>
      </div>
    </div>
  );
}