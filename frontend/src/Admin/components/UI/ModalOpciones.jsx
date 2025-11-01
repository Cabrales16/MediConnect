import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ModalOpciones({
  type,
  item,
  onClose,
  onSave,
  onDelete,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      console.log("🔹 Guardando:", formData);

      // Detectar si estamos creando o editando
      const action = item ? "editar" : "crear";
      await onSave(formData, action);

      if (action === "crear") {
        toast.success("¡Elemento creado correctamente!");
      } else {
        toast.info("¡Elemento actualizado correctamente!");
      }

      setFormData({});
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error al guardar los datos.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (onDelete) await onDelete(item);
      toast.error("Elemento eliminado correctamente.");
      setFormData({});
      onClose();
    } catch (error) {
      toast.error("Error al eliminar el elemento.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg border border-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {item
            ? `Editar ${type === "meds" ? "Medicamento" : "Terapia"}`
            : `Añadir ${type === "meds" ? "Medicamento" : "Terapia"}`}
        </h2>

        {type === "meds" ? (
          <>
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Nombre"
              value={formData.nombre || ""}
              onChange={(e) => handleChange("nombre", e.target.value)}
            />
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Presentación"
              value={formData.presentacion || ""}
              onChange={(e) => handleChange("presentacion", e.target.value)}
            />
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Unidad de medida"
              value={formData.unidad_medida || ""}
              onChange={(e) => handleChange("unidad_medida", e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Nombre de la terapia"
              value={formData.nombre || ""}
              onChange={(e) => handleChange("nombre", e.target.value)}
            />

            <input
              type="file"
              className="w-full border p-2 mb-2 rounded"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
          </>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancelar
          </button>

          {item ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Actualizar
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
