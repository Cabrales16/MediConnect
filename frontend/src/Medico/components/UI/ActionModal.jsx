import React, { useState } from "react";

export default function ActionModal({ type, onClose, onSubmit }) {
  const [nota, setNota] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [unidad, setUnidad] = useState("");
  const [terapia, setTerapia] = useState("");


  const handleSubmit = () => {
    onSubmit({ nota, medicamento, presentacion, unidad, terapia });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">
          {type === "nota" && "Añadir Nota"}
          {type === "medicamento" && "Añadir Medicamento"}
          {type === "terapia" && "Añadir Terapia"}
          {type === "finalizar" && "Finalizar Cita"}
        </h3>

        {type === "nota" && (
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Escribe la nota del médico"
          />
        )}

        {type === "medicamento" && (
          <>
            <select
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona medicamento</option>
              <option value="Ibuprofeno">Ibuprofeno</option>
              <option value="Paracetamol">Paracetamol</option>
            </select>
            <select
              value={presentacion}
              onChange={(e) => setPresentacion(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona presentación</option>
              <option value="Pastilla">Pastilla</option>
              <option value="Jarabe">Jarabe</option>
            </select>
            <select
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona unidad</option>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
            </select>
          </>
        )}

        {type === "terapia" && (
          <>
            <select
              value={terapia}
              onChange={(e) => setTerapia(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona terapia</option>
              <option value="Fisioterapia">Fisioterapia</option>
              <option value="Terapia ocupacional">Terapia ocupacional</option>
            </select>
          </>
        )}

        {type === "finalizar" && <p>¿Seguro que deseas finalizar la cita?</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {type === "finalizar" ? "Confirmar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}