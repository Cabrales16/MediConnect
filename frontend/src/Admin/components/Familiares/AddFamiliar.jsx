import React, { useState } from "react";

export default function AddFamilia({ onCancel, onAdd }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipo, setTipo] = useState("Citas médicas");

  const submit = (e) => {
    e.preventDefault();
    onAdd({ nombre, correo, tipo });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Añadir familiar</h3>

        <label className="block mb-2 text-sm">Nombre del familiar</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={nombre} onChange={(e)=>setNombre(e.target.value)} />

        <label className="block mb-2 text-sm">Correo electrónico</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={correo} onChange={(e)=>setCorreo(e.target.value)} />

        <label className="block mb-2 text-sm">Tipo de información</label>
        <select className="w-full p-3 border rounded-lg mb-4" value={tipo} onChange={(e)=>setTipo(e.target.value)}>
          <option value={1}>Citas médicas</option>
          <option value={2}>Medicamentos</option>
          <option value={3}>Medicamentos y citas médicas</option>
        </select>

        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 rounded-md" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Añadir</button>
        </div>
      </form>
    </div>
  );
}
