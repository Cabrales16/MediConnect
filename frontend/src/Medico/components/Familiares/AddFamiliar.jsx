import React, { useState } from "react";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

export default function AddFamilia({ onCancel, onAdd }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipo, setTipo] = useState("Citas médicas");

  useLockBodyScroll(true);

  const submit = (e) => {
    e.preventDefault();
    onAdd({ nombre, correo, tipo });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg z-10"
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
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>Citas médicas</option>
          <option>Medicamentos</option>
          <option>Medicamentos y citas médicas</option>
        </select>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 text-base font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 text-base font-medium bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
}
