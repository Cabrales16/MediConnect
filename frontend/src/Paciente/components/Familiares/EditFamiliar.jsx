import React, { useState } from "react";

export default function EditFamilia({ initial, onCancel, onSave }) {
  const [nombre, setNombre] = useState(initial.nombre);
  const [correo, setCorreo] = useState(initial.correo);
  const [idInfo, setIdInfo] = useState(initial.id_info || "");

  const submit = (e) => {
    e.preventDefault();
    onSave({
      id_familiar: initial.id_familiar, // aseguramos que se mande al backend
      nombre,
      correo,
      id_info: parseInt(idInfo, 10),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg z-10"
      >
        <h3 className="text-lg font-semibold mb-4">Editar familiar</h3>

        <label className="block mb-2 text-sm">Nombre</label>
        <input
          className="w-full p-3 border rounded-lg mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm">Correo</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg mb-3"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm">Tipo de información</label>
        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={idInfo}
          onChange={(e) => setIdInfo(e.target.value)}
          required
        >
          <option value="">Seleccione...</option>
          <option value={4}>Emergencias y citas</option>
          <option value={2}>Emergencias y indicaciones medicas</option>
          <option value={3}>Emergencias y Medicamentos</option>
          <option value={5}>Solo emergencias</option>
          <option value={1}>toda información</option>
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
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
