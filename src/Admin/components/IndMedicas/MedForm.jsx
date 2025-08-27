import React, { useEffect, useState } from "react";

export default function MedForm({ initial = null, onCancel, onSave }) {
  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [dosis, setDosis] = useState(initial?.dosis || "");
  const [frecuencia, setFrecuencia] = useState(initial?.frecuencia || "");
  const [duracion, setDuracion] = useState(initial?.duracion || "");
  const [instrucciones, setInstrucciones] = useState(initial?.instrucciones || "");

  useEffect(() => {
    // focus inicial si quieres
    const el = document.getElementById("med-nombre");
    if (el) el.focus();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      id: initial?.id || Date.now(),
      nombre,
      dosis,
      frecuencia,
      duracion,
      instrucciones,
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{initial ? "Editar medicamento" : "Añadir medicamento"}</h3>

        <label className="block text-sm mb-1">Nombre</label>
        <input id="med-nombre" className="w-full p-3 border rounded-lg mb-3" value={nombre} onChange={(e)=>setNombre(e.target.value)} />

        <label className="block text-sm mb-1">Dosis</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={dosis} onChange={(e)=>setDosis(e.target.value)} />

        <label className="block text-sm mb-1">Frecuencia</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={frecuencia} onChange={(e)=>setFrecuencia(e.target.value)} />

        <label className="block text-sm mb-1">Duración</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={duracion} onChange={(e)=>setDuracion(e.target.value)} />

        <label className="block text-sm mb-1">Instrucciones</label>
        <textarea className="w-full p-3 border rounded-lg mb-4" value={instrucciones} onChange={(e)=>setInstrucciones(e.target.value)} />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">{initial ? "Guardar" : "Añadir"}</button>
        </div>
      </form>
    </div>
  );
}
