import React, { useState } from "react";
import { toast } from "react-toastify";
import { cambiarRolUsuario } from "../../../services/usuarios";

export default function CambiarRolModal({ isOpen, onClose, onConfirm, user }) {
  const [rol, setRol] = useState(user?.rol || "Paciente");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null; // ✅ evita abrir sin usuario

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // 🔹 Mapeo de roles a id_rol (según tu base de datos)
      const rolesMap = {
        Paciente: 1,
        Médico: 2,
        Administrador: 3,
      };

      // 🔹 Enviamos el campo id_rol (como lo espera tu backend)
      const nuevoRol = {
        id_rol: rolesMap[rol] || 1,
      };

      // ✅ aseguramos que user.id_usuario existe
      const data = await cambiarRolUsuario(user.id_usuario, nuevoRol);

      toast.success(`Rol cambiado exitosamente a ${rol}`);
      if (onConfirm) onConfirm(data); // refrescar vista
      onClose();
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      toast.error(
        error.response?.data?.detail ||
          "No se pudo cambiar el rol del usuario"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Cambiar rol de {user?.nombre}
        </h2>

        <select
          className="w-full border rounded px-3 py-2"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="Paciente">Paciente</option>
          <option value="Médico">Médico</option>
          <option value="Administrador">Administrador</option>
        </select>

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
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
