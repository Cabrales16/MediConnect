import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { completarPerfilMedico } from "../../../services/medico";

export default function ModificarDatosModal({ onClose, onConfirm }) {
  const [especialidad, setEspecialidad] = useState("");
  const [estudios, setEstudios] = useState("");
  const [hospital, setHospital] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [diaInicio, setDiaInicio] = useState("");
  const [diaFin, setDiaFin] = useState("");
  const [error, setError] = useState("");

  const idAdmin = localStorage.getItem("id_usuario");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const horarios = [
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM",
    "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
    "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
  ];

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const calcularDiferenciaHoras = (inicio, fin) => {
    const parseHora = (h) => {
      const [time, meridiem] = h.split(" ");
      let [hour, minute] = time.split(":").map(Number);
      if (meridiem === "PM" && hour !== 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;
      return hour + minute / 60;
    };
    return parseHora(fin) - parseHora(inicio);
  };

  const handleHorariosChange = (name, value) => {
    if (name === "horaInicio") setHoraInicio(value);
    else setHoraFin(value);

    const inicio = name === "horaInicio" ? value : horaInicio;
    const fin = name === "horaFin" ? value : horaFin;

    if (inicio && fin) {
      const diff = calcularDiferenciaHoras(inicio, fin);
      if (diff < 5) setError("El rango mínimo debe ser de 5 horas.");
      else setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !especialidad ||
      !estudios ||
      !hospital ||
      !horaInicio ||
      !horaFin ||
      !diaInicio ||
      !diaFin
    ) {
      toast.error("Por favor, completa todos los campos antes de confirmar.");
      return;
    }

    if (error) {
      toast.error("Corrige los errores antes de continuar.");
      return;
    }

    const formData = {
      especialidad,
      estudios,
      id_hospital: Number(hospital),
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      dia_inicio: diaInicio,
      dia_fin: diaFin,
    };

    try {
      await completarPerfilMedico(idAdmin, formData);
      toast.success("Perfil de médico completado con éxito.");
      onConfirm?.();
      onClose?.();
    } catch (error) {
      console.error("Error al completar el perfil del médico:", error);
      toast.error("No se pudo completar el perfil. Revisa la consola.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ¡Ahora eres un Médico!
        </h2>
        <p className="text-center pb-4 text-gray-500">
          Por favor, completa tu información profesional:
        </p>

        <form onSubmit={handleSubmit}>
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
            <option value="" disabled>
              -- Selecciona un hospital --
            </option>
            <option value="1">Hospital de Suba</option>
            <option value="2">Hospital de Engativa</option>
            <option value="3">Hospital Santa Fé</option>
            <option value="4">Hospital San Ignacio</option>
            <option value="5">Clínica del Country</option>
          </select>

          {/* Horario */}
          <label className="block mb-2 font-medium">Horario de atención</label>

          <div className="flex gap-3 mb-4">
            <select
              value={horaInicio}
              onChange={(e) => handleHorariosChange("horaInicio", e.target.value)}
              className="flex-1 border rounded-lg p-2"
            >
              <option value="">Desde (7:00 AM)</option>
              {horarios.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <select
              value={horaFin}
              onChange={(e) => handleHorariosChange("horaFin", e.target.value)}
              className="flex-1 border rounded-lg p-2"
            >
              <option value="">Hasta (7:00 PM)</option>
              {horarios.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 mb-4">
            <select
              value={diaInicio}
              onChange={(e) => setDiaInicio(e.target.value)}
              className="flex-1 border rounded-lg p-2"
            >
              <option value="">Día inicial</option>
              {diasSemana.map((dia) => (
                <option key={dia} value={dia}>
                  {dia}
                </option>
              ))}
            </select>

            <select
              value={diaFin}
              onChange={(e) => setDiaFin(e.target.value)}
              className="flex-1 border rounded-lg p-2"
            >
              <option value="">Día final</option>
              {diasSemana.map((dia) => (
                <option key={dia} value={dia}>
                  {dia}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}