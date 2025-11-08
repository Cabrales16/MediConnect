import React, { useState } from "react";
import { crearNovedad } from "../../../services/novedades";
import { toast } from "react-toastify";

export default function AddNovedadModal({ onClose, onSuccess }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Obtiene el ID del administrador desde localStorage
  const idAdmin = localStorage.getItem("id_usuario");

  // 📸 Vista previa de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // 🧾 Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcion) {
      toast.error("Por favor completa todos los campos obligatorios.")
      return;
    }

    if (!idAdmin) {
      alert("Error: no se encontró el ID del administrador. Vuelve a iniciar sesión.");
      return;
    }

    setLoading(true);

    try {
      // 👇 Se arma el FormData como lo espera FastAPI
      const formData = new FormData();
      formData.append("id_admin", idAdmin);
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      if (imagen) formData.append("imagen", imagen);

      // ✅ Llamada al servicio centralizado
      await crearNovedad(formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("❌ Error al crear novedad:", error.response?.data || error.message);
      if (error.response?.status === 422) {
        alert("Error 422: Alguno de los campos no es válido.");
      } else if (error.response?.status === 500) {
        alert("Error 500: Problema en el servidor FastAPI.");
      } else {
        alert("No se pudo crear la novedad. Revisa la consola.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-[400px] p-6 border border-gray-200 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Añadir nueva novedad
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Título
            </label>
            <input
              type="text"
              className="border rounded-lg w-full p-2 outline-none focus:ring-2 focus:ring-green-400"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título de la novedad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Descripción
            </label>
            <textarea
              className="border rounded-lg w-full p-2 outline-none focus:ring-2 focus:ring-green-400"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe la novedad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Imagen (opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                className="w-full h-40 object-cover rounded-lg mt-2 border"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-xl"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Añadir"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
