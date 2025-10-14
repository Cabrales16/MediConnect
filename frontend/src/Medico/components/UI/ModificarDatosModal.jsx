import React, { useState } from "react";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import { toast } from "react-toastify";
import { completarPerfilMedico } from "../../../services/medico";

export default function ModificarDatosModal({ isOpen, onClose, onConfirm }) {
  const [especialidad, setEspecialidad] = useState("");
  const [estudios, setEstudios] = useState("");
  const [hospital, setHospital] = useState("");

  // Bloquea scroll del fondo
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;

  // Obtén el id del usuario (guardado al iniciar sesión)
  const idAdmin = localStorage.getItem("id_usuario");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!especialidad || !estudios || !hospital) {
      toast.error("Por favor, completa todos los campos antes de confirmar.");
      return;
    }

    const formData = {
      especialidad,
      estudios,
      id_hospital: Number(hospital),
    };

    try {
      await completarPerfilMedico(idAdmin, formData);
      toast.success("Perfil de médico completado con éxito.");
      onConfirm?.(); // opcional
      onClose?.();
    } catch (error) {
      console.error("Error al completar el perfil del médico:", error);
      toast.error("No se pudo completar el perfil. Revisa la consola.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ¡Ahora eres un Médico!
        </h2>
        <p className="text-center pb-4 text-gray-500">
          Por favor, completa tu información profesional:
        </p>

        <form onSubmit={handleSubmit}>
          {/* Especialidad */}
          <label className="block mb-2 font-medium">Especialidad</label>
          <select
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="" disabled>
              -- Selecciona una especialidad --
            </option>
            <option value="Cardiologia">Cardiología</option>
            <option value="Pediatria">Pediatría</option>
            <option value="Traumatologia">Traumatología</option>
            <option value="Neurologia">Neurología</option>
            <option value="Dermatologia">Dermatología</option>
            <option value="Ginecologia">Ginecología</option>
            <option value="Psiquiatria">Psiquiatría</option>
            <option value="Oftalmologia">Oftalmología</option>
            <option value="Otorrinolaringologia">Otorrinolaringología</option>
            <option value="Radiologia">Radiología</option>
            <option value="MedicinaInterna">Medicina Interna</option>
            <option value="MedicinaFamiliar">Medicina Familiar</option>
          </select>

          {/* Estudios */}
          <label className="block mb-2 font-medium">Estudios</label>
          <input
            type="text"
            value={estudios}
            onChange={(e) => setEstudios(e.target.value)}
            placeholder="Ej: Universidad Nacional - 5 años"
            className="w-full border rounded-lg p-2 mb-4"
          />

          {/* Hospital */}
          <label className="block mb-2 font-medium">Hospital</label>
          <select
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="" disabled>
              -- Selecciona un hospital --
            </option>
            <option value="1">Hospital de Suba</option>
            <option value="2">Hospital de Engativa</option>
            <option value="3">Hospital Santa Fé</option>
            <option value="4">Hospital San Ignacio</option>
            <option value="5">Clínica del Country</option>
          </select>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
