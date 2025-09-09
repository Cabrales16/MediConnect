import React, { useState } from "react";

export default function ModalIndicaciones({ cita, onClose, onAsignar }) {
  const [tab, setTab] = useState("medicamentos");

  // Medicamentos
  const [medicamento, setMedicamento] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [duracion, setDuracion] = useState("");
  const [instrucciones, setInstrucciones] = useState("");

  // Terapias
  const [tipoTerapia, setTipoTerapia] = useState("");
  const [frecuenciaTerapia, setFrecuenciaTerapia] = useState("");
  const [duracionTerapia, setDuracionTerapia] = useState("");
  const [objetivos, setObjetivos] = useState("");

  const handleAsignar = () => {
    if (tab === "medicamentos") {
      if (!medicamento || !dosis || !frecuencia || !duracion) {
        alert("Por favor completa todos los campos obligatorios de medicamentos.");
        return;
      }
      onAsignar({
        tipo: "medicamento",
        medicamento,
        dosis,
        frecuencia,
        duracion,
        instrucciones,
      });
    } else {
      if (!tipoTerapia || !frecuenciaTerapia || !duracionTerapia || !objetivos) {
        alert("Por favor completa todos los campos de terapias.");
        return;
      }
      onAsignar({
        tipo: "terapia",
        tipoTerapia,
        frecuenciaTerapia,
        duracionTerapia,
        objetivos,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Asignar Indicaciones - {cita.paciente}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              tab === "medicamentos"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("medicamentos")}
          >
            Medicamentos
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              tab === "terapias"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("terapias")}
          >
            Terapias
          </button>
        </div>

        {/* Contenido Medicamentos */}
        {tab === "medicamentos" && (
          <div className="space-y-4">
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
              required
            >
              <option value="">Seleccionar medicamento</option>
              <option value="">Ibuprofeno</option>
              <option value="">Paracetamol</option>
              <option value="">Amoxicilina</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Dosis (ej: 500mg)"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={dosis}
                onChange={(e) => setDosis(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Frecuencia (ej: Cada 8 horas)"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                required
              />
            </div>


            <input
              type="text"
              placeholder="Duración (ej: 7 días)"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              required
            />

            <textarea
              placeholder="Instrucciones adicionales..."
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              value={instrucciones}
              onChange={(e) => setInstrucciones(e.target.value)}
            />
          </div>
        )}

        {/* Contenido Terapias */}
        {tab === "terapias" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Tipo de terapia"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={tipoTerapia}
              onChange={(e) => setTipoTerapia(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Frecuencia (ej: 3 veces por semana)"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={frecuenciaTerapia}
              onChange={(e) => setFrecuenciaTerapia(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Duración (ej: 1 mes)"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={duracionTerapia}
              onChange={(e) => setDuracionTerapia(e.target.value)}
              required
            />
            <textarea
              placeholder="Objetivos de la terapia..."
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              value={objetivos}
              onChange={(e) => setObjetivos(e.target.value)}
              required
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleAsignar}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
