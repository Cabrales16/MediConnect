import React from "react";

export default function EditNovedadModal({ formData, onChange, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Editar novedad</h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={onChange}
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={onChange}
              rows="3"
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">URL de imagen</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={onChange}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
