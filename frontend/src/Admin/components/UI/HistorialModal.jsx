import React from "react";

export default function HistorialModal({ isOpen, onClose, user, historial = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Historial de {user?.nombre}</h2>

        <div className="max-h-80 overflow-auto border rounded p-3">
          {historial.length > 0 ? (
            historial.map((item, i) => (
              <div key={i} className="border-b py-2">
                <p className="text-sm text-gray-600">{item.fecha}</p>
                <p className="font-medium">{item.descripcion}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No hay historial disponible</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
