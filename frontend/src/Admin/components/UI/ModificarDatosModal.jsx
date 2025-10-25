import React, { useState } from "react";
import { toast } from "react-toastify";
import { cambiarDatosUsuario } from "../../../services/usuarios";

export default function ModificarDatosModal({ isOpen, onClose, onConfirm, user }) {
  const [nombre, setNombre] = useState(user?.nombre || "");
  const [apellido, setApellido] = useState(user?.apellido || "");
  const [correo, setCorreo] = useState(user?.correo || "");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (!nombre || !apellido || !correo) {
        toast.warning("Todos los campos son obligatorios");
        return;
      }

      // ✅ Usa el ID correcto según venga del backend
      const userId = user.id_usuario || user.id;

      const nuevosDatos = { nombre, apellido, correo };
      const data = await cambiarDatosUsuario(userId, nuevosDatos);

      toast.success("Datos modificados exitosamente");

      if (onConfirm) onConfirm(data);
      onClose();
    } catch (error) {
      console.error("Error al modificar los datos:", error);
      toast.error(
        error.response?.data?.detail ||
          "No se pudieron modificar los datos del usuario"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Modificar datos de {user?.nombre}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border rounded px-3 py-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            className="w-full border rounded px-3 py-2"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full border rounded px-3 py-2"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}