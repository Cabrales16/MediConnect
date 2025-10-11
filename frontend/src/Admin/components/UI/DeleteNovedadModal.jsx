import React, { useState } from "react";
import { eliminarNovedad } from "../../../services/novedades";

export default function DeleteNovedadModal({ idNovedad, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      setError("");
      await eliminarNovedad(idNovedad);
      if (onDeleted) onDeleted();
      onClose();
    } catch (err) {
      console.error("Error al eliminar la novedad:", err);
      setError("No se pudo eliminar la novedad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white/90 p-6 rounded-2xl w-full max-w-md shadow-xl text-center relative">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          ¿Confirmas eliminar esta novedad?
        </h3>
        <p className="mb-5 text-gray-700">Esta acción no se puede deshacer.</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            className={`px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
