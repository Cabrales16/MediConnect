// src/components/UI/ReportErrorModal.jsx
import React, { useState, useEffect } from "react";

export default function ReportErrorModal({ isOpen, onClose }) {
  const [errorType, setErrorType] = useState("");
  const [description, setDescription] = useState("");

  // Bloquear scroll en body cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reporte enviado:", { errorType, description });
    // Lógica para enviar a backend o localStorage
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose} // Cerrar al hacer clic fuera del modal
      ></div>

      {/* Contenido del modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">Reportar un error</h2>
        <form onSubmit={handleSubmit}>
          {/* Tipo de error */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo de error
          </label>
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

          {/* Descripción */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Descripción breve
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            rows="4"
            placeholder="Describe lo que ocurrió..."
            required
          />

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
