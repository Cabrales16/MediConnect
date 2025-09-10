import React, { useState, useEffect } from "react";

export default function ModalOpciones({ type, item, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg border border-gray-300">
        <h2 className="text-xl font-semibold mb-4">
          {item ? "Editar" : "Añadir"} {type === "meds" ? "Medicamento" : "Terapia"}
        </h2>

        {type === "meds" ? (
          <>
            <input className="w-full border p-2 mb-2 rounded" placeholder="Nombre" value={formData.nombre || ""} onChange={(e) => handleChange("nombre", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Dosis" value={formData.dosis || ""} onChange={(e) => handleChange("dosis", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Frecuencia" value={formData.frecuencia || ""} onChange={(e) => handleChange("frecuencia", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Duración" value={formData.duracion || ""} onChange={(e) => handleChange("duracion", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Instrucciones" value={formData.instrucciones || ""} onChange={(e) => handleChange("instrucciones", e.target.value)} />
          </>
        ) : (
          <>
            <input className="w-full border p-2 mb-2 rounded" placeholder="Tipo" value={formData.tipo || ""} onChange={(e) => handleChange("tipo", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Frecuencia" value={formData.frecuencia || ""} onChange={(e) => handleChange("frecuencia", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Duración" value={formData.duracion || ""} onChange={(e) => handleChange("duracion", e.target.value)} />
            <input className="w-full border p-2 mb-2 rounded" placeholder="Objetivos" value={formData.objetivos || ""} onChange={(e) => handleChange("objetivos", e.target.value)} />
          </>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
}
