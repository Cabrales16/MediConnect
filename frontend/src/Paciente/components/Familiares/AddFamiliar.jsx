import React, { useState } from "react";

export default function AddFamilia({ onCancel, onAdd }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [idInfo, setIdInfo] = useState(1); // 👈 usar id_info

  const submit = (e) => {
    e.preventDefault();
    onAdd({ nombre, correo, id_info: parseInt(idInfo) }); // 👈 enviar id_info
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Añadir familiar</h3>

        <label className="block mb-2 text-sm">Nombre del familiar</label>
        <input
          className="w-full p-3 border rounded-lg mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label className="block mb-2 text-sm">Correo electrónico</label>
        <input
          className="w-full p-3 border rounded-lg mb-3"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label className="block mb-2 text-sm">Tipo de información</label>
        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={idInfo}
          onChange={(e) => setIdInfo(e.target.value)}
        >
          <option value="">Seleccione...</option>
          <option value={4}>Emergencias y citas</option>
          <option value={2}>Emergencias y indicaciones medicas</option>
          <option value={3}>Emergencias y Medicamentos</option>
          <option value={5}>Solo emergencias</option>
          <option value={1}>toda información</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
}
