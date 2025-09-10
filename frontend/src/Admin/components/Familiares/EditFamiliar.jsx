import React, { useState } from "react";

export default function EditFamilia({ initial, onCancel, onSave }) {
  const [nombre, setNombre] = useState(initial.nombre);
  const [correo, setCorreo] = useState(initial.correo);
  const [tipo, setTipo] = useState(initial.tipo);

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...initial, nombre, correo, tipo });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Editar familiar</h3>

        <label className="block mb-2 text-sm">Nombre</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={nombre} onChange={(e)=>setNombre(e.target.value)} />

        <label className="block mb-2 text-sm">Correo</label>
        <input className="w-full p-3 border rounded-lg mb-3" value={correo} onChange={(e)=>setCorreo(e.target.value)} />

        <label className="block mb-2 text-sm">Tipo de información</label>
        <select className="w-full p-3 border rounded-lg mb-4" value={tipo} onChange={(e)=>setTipo(e.target.value)}>
          <option>Citas médicas</option>
          <option>Medicamentos</option>
          <option>Medicamentos y citas médicas</option>
        </select>

        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 rounded-md" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Guardar</button>
        </div>
      </form>
    </div>
  );
}
