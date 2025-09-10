//Aqui modificas lo necesario de acuerdo a los datos requeridos en la BD bro :D

import React, { useState } from "react";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

export default function ModifcarDatosModal({ isOpen, onClose, onConfirm }) {
  const [ModificarDato, setModificarDato] = useState("");

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modificar datos</h2>

        <select
          value={ModificarDato}
          onChange={(e) => setModificarDato(e.target.value)}
          className="w-full border rounded-lg p-2 mb-6"
        >
          <option value="">-- Selecciona un tipo --</option>
          <option value="Consulta general">Consulta general</option>
          <option value="Pediatría">Pediatría</option>
          <option value="Odontología">Odontología</option>
          <option value="Cardiología">Cardiología</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(ModificarDato)}
            disabled={!ModificarDato}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
