import React from "react";
import { toast } from "react-toastify";

export default function ConfirmModal({ title, description, onCancel, onConfirm }) {
  // Bloquea scroll mientras el modal esté montado

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white p-6 rounded-2xl w-full max-w-md shadow-lg z-10">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border">
            Cancelar
          </button>

          <button onClick={() => {
            onConfirm();
            toast.error("Cita cancelada con éxito");
          }} className="px-4 py-2 bg-red-600 text-white rounded-md">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
