import React, { useState } from "react";

export default function CambiarRolModal({ isOpen, onClose, onConfirm, user }) {
  const [rol, setRol] = useState(user?.rol || "Paciente");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Cambiar rol de {user?.nombre}</h2>

        <select className="w-full border rounded px-3 py-2" value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="Paciente">Paciente</option>
          <option value="Médico">Médico</option>
          <option value="Administrador">Administrador</option>
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancelar</button>
          <button onClick={() => onConfirm({ rol })} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Guardar</button>
        </div>
      </div>
    </div>
  );
}
