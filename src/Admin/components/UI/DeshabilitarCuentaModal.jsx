import React from "react";

export default function DeshabilitarCuentaModal({ isOpen, onClose, onConfirm, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Deshabilitar cuenta</h2>
        <p className="text-sm text-gray-700 mb-4">
          ¿Estás seguro que deseas deshabilitar la cuenta de <strong>{user?.nombre} {user?.apellido}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Deshabilitar</button>
        </div>
      </div>
    </div>
  );
}
