import React, { useState, useEffect } from "react";
import { actualizarNovedad } from "../../../services/novedades";

export default function EditNovedadModal({ novedad, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id_novedad: "",
    titulo: "",
    descripcion: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (novedad) {
      setFormData({
        id_novedad: novedad.id_novedad,
        titulo: novedad.titulo || "",
        descripcion: novedad.descripcion || "",
        img: novedad.imagen || "",
      });
    }
  }, [novedad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, img: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_novedad) return;

    setLoading(true);
    try {
      const form = new FormData();
      form.append("id_admin", localStorage.getItem("id_usuario"));
      form.append("titulo", formData.titulo);
      form.append("descripcion", formData.descripcion);
      if (formData.img instanceof File) {
        form.append("imagen", formData.img);
      }

      await actualizarNovedad(formData.id_novedad, form);
      alert("✅ Novedad actualizada correctamente");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al actualizar novedad:", error);
      alert("❌ Error al actualizar novedad");
    } finally {
      setLoading(false);
    }
  };

  if (!novedad) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Editar novedad</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Actualizar imagen (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
            {formData.img && !(formData.img instanceof File) && (
              <img
                src={formData.img}
                alt="Imagen actual"
                className="w-full h-40 object-cover rounded-md mt-2"
              />
            )}
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
              disabled={loading}
              className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? "Guardando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
