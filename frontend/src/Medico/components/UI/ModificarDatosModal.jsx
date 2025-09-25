import React, { useState } from "react";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import { toast } from "react-toastify";

export default function ModificarDatosModal({ isOpen, onClose, onConfirm }) {
  const [especialidad, setEspecialidad] = useState("");
  const [otraEspecialidad, setOtraEspecialidad] = useState("");
  const [estudios, setEstudios] = useState("");
  const [hospital, setHospital] = useState("");

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const especialidadFinal =
      especialidad === "Otros" ? otraEspecialidad : especialidad;

    if (!especialidadFinal || !estudios || !hospital) {
      toast.error("Por favor, completa todos los campos antes de confirmar.");
      return;
    } else {
      toast.success("Datos actualizados correctamente.");
      onClose();
      onConfirm({ especialidad: especialidadFinal, estudios, hospital });
      return;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ¡Ahora eres un Medico!
        </h2>
        <p className="text-center pb-4 text-gray-500">Por eso debes de llenar tu información...</p>

        {/* Especialidad */}
        <label className="block mb-2 font-medium">Especialidad</label>
        <select
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="" disabled>-- Selecciona una especialidad --</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Pediatría">Pediatría</option>
          <option value="Traumatología">Traumatología</option>
          <option value="Neurología">Neurología</option>
          <option value="Dermatología">Dermatología</option>
          <option value="Ginecología">Ginecología</option>
          <option value="Psiquiatría">Psiquiatría</option>
          <option value="Oftalmología">Oftalmología</option>
          <option value="Otorrinolaringología">Otorrinolaringología</option>
          <option value="Medicina General">Medicina General</option>
          <option value="Hematología">Hematología</option>
          <option value="Oncología">Oncología</option>
          <option value="Endocrinología">Endocrinología</option>
          <option value="Nefrología">Nefrología</option>
          <option value="Gastroenterología">Gastroenterología</option>
          <option value="Reumatología">Reumatología</option>
          <option value="Urología">Urología</option>
          <option value="Cirugía General">Cirugía General</option>
          <option value="Anestesiología">Anestesiología</option>
          <option value="Medicina Interna">Medicina Interna</option>
          <option value="Medicina Familiar">Medicina Familiar</option>
          <option value="Otra">Otra</option>
        </select>

        {/* Este es un campo adicional si elige otra especialidad */}
        {especialidad === "Otra" && (
          <input
            type="text"
            value={otraEspecialidad}
            onChange={(e) => setOtraEspecialidad(e.target.value)}
            placeholder="Especifica la especialidad"
            className="w-full border rounded-lg p-2 mb-4"
          />
        )}

        {/* Estudios */}
        <label className="block mb-2 font-medium">Estudios</label>
        <input
          type="text"
          value={estudios}
          onChange={(e) => setEstudios(e.target.value)}
          placeholder="Ej: Universidad Nacional - 5 años"
          className="w-full border rounded-lg p-2 mb-4"
        />

        <label className="block mb-2 font-medium">Hospital</label>
        <select
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="" disabled>-- Selecciona un hospital --</option>
          <option value="Cardiología">Hospital de Suba</option>
          <option value="Pediatría">Hospital de Engativa</option>
          <option value="Traumatología">Hospital de Santa Fé</option>
          <option value="Neurología">Hospital Universitario San Ignacio</option>
          <option value="Dermatología">Clínica Del Country</option>
        </select>
        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
