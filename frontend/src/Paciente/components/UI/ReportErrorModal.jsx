import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ReportErrorModal({ isOpen, onClose }) {
  const [errorType, setErrorType] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reporte enviado:", { errorType, description });
    toast.success("¡Gracias por reportar el error!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">Reportar un error</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Tipo de error</label>
          <select
            value={errorType}
            onChange={(e) => setErrorType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="funcionalidad">Error de funcionalidad</option>
            <option value="interfaz">Error en la interfaz</option>
            <option value="rendimiento">Problema de rendimiento</option>
            <option value="otro">Otro</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-700">Descripción breve</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            rows="4"
            placeholder="Describe lo que ocurrió..."
            required
          />

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" onClick={() => {
            }} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
