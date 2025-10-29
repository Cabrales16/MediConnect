import React, { useState } from "react";
import ActionModal from "../UI/ActionModal";
import { FaNotesMedical } from 'react-icons/fa';
import { FaSuitcaseMedical } from 'react-icons/fa6';
import { RiPsychotherapyFill } from 'react-icons/ri';
import { FaCalendarCheck } from 'react-icons/fa';

export default function CitaDetails({ cita, mode = "por", onClose }) {
  const [actionType, setActionType] = useState(null);

  const handleAction = (type) => setActionType(type);

  const handleSubmitAction = (data) => {
    console.log("Datos enviados:", data);
    setActionType(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-400 shadow-md overflow-hidden h-full">
      <div className="p-6 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{cita.especialidad_medico || "Cita médica"}</h3>
            <p className="text-sm text-gray-500">{cita.fecha}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          {/* Panel izquierdo */}
          <div className="w-full md:w-1/2 pr-0 md:pr-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Paciente</h4>
              <p className="text-black">{cita.nombre_paciente} {cita.apellido_paciente}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Médico</h4>
              <p className="text-black">{cita.nombre_medico} {cita.apellido_medico}</p>
              <p className="text-gray-500 text-sm">{cita.especialidad_medico}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Estado</h4>
              <span className={`py-1 rounded-lg text-sm ${cita.estado_cita === "PROGRAMADA" ? "text-green-700" : "text-red-600"}`}>
                {cita.estado_cita}
              </span>
            </div>

            {/* ACCIONES */}
            {mode === "por" && (
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleAction("nota")}
                  className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded flex items-center justify-center"
                >
                  <FaNotesMedical />
                </button>
                <button
                  onClick={() => handleAction("medicamento")}
                  className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded flex items-center justify-center"
                >
                  <FaSuitcaseMedical />
                </button>
                <button
                  onClick={() => handleAction("terapia")}
                  className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded flex items-center justify-center"
                >
                  <RiPsychotherapyFill />
                </button>
                <button
                  onClick={() => handleAction("finalizar")}
                  className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded flex items-center justify-center"
                >
                  <FaCalendarCheck />
                </button>
              </div>
            )}

          </div>

          {/* Panel derecho */}
          <div className="w-full md:w-1/2 pl-0 md:pl-4 mt-4 md:mt-0">
            {mode === "por" ? (
              <div className="h-64 md:h-full border rounded-lg overflow-hidden">
                <iframe
                  title="mapa"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(cita.direccion || "Bogotá")}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-64 md:h-full overflow-auto">
                <h4 className="text-sm font-semibold mb-2">Notas del médico</h4>
                <p className="text-gray-700 mb-4">{cita.notas || "Sin notas registradas"}</p>
              </div>
            )}
          </div>
        </div>
          
        {actionType && (
          <ActionModal
            type={actionType}
            onClose={() => setActionType(null)}
            onSubmit={handleSubmitAction}
          />
        )}
      </div>
    </div>
  );
}
