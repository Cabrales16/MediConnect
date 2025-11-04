// src/components/Planilla/PlanillaTable.jsx
import React, { useState } from "react";

export default function PlanillaTable({ mode = "por", porTomar = [], tomadas = [], onViewDetails }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [rating, setRating] = useState(0);

  const rows = mode === "por" ? porTomar : tomadas;

  const formatEstado = (estado) => {
    switch (estado) {
      case "PROGRAMADA":
        return "Programada";
      case "CANCELADA":
        return "Cancelada";
      case "COMPLETADA":
        return "Completada";
      default:
        return estado;
    }
  };

  const handleOpenModal = (medico) => {
    setSelectedMedico(medico);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedico(null);
    setRating(0);
  };

  const handleSubmit = () => {
    console.log(`Calificación para ${selectedMedico?.especialidad_medico || "Médico"}: ${rating} estrellas`);
    setShowModal(false);
  };

  return (
    <div>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-sm">
              <th className="px-6 py-3 text-black">Tipo de cita</th>
              <th className="px-6 py-3 text-black">Fecha</th>
              <th className="px-6 py-3 text-black">Hora</th>
              <th className="px-6 py-3 text-black">Estado</th>
              <th className="px-6 py-3 text-black pl-9">Acción</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id_cita} className="border-t border-gray-300 hover:bg-green-50">
                <td className="px-6 py-2 text-black w-1/4">{r.especialidad_medico || "General"}</td>
                <td className="px-6 py-2 text-green-700 w-1/4">{r.fechaReadable || r.fecha}</td>
                <td className="px-6 py-2 text-green-700">{r.hora || r.hora}</td>
                <td className="px-6 py-2 text-green-700 w-1/5">
                  <span className="px-2 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
                    {formatEstado(r.estado_cita)}
                  </span>
                </td>
                <td className="px-6 py-4 text-green-700 flex items-center gap-3">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => onViewDetails(r)}
                  >
                    Ver detalles
                  </button>

                  {/* Solo mostrar el botón de calificar si estamos en la tabla de tomadas */}
                  {mode !== "por" && (
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => handleOpenModal(r)}
                    >
                      Calificar médico
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay citas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para calificar */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
            <h2 className="text-lg font-semibold text-green-700 mb-4 text-center">
              Calificar médico
            </h2>
            <p className="text-gray-700 text-center mb-3">
              {selectedMedico?.especialidad_medico || "Médico general"}
            </p>

            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}