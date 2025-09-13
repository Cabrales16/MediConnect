import React from "react";

export default function DeleteNovedadModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative text-center">
        <h3 className="text-xl font-semibold mb-4">¿Confirmas eliminar esta novedad?</h3>
        <p className="mb-6 text-gray-700">Esta acción no se puede deshacer.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
