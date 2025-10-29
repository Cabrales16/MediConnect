import React from "react";
import cancelarIcon from "../Planilla/PlanillaIcons/cancelarIcon.png";
import editarIcon from "../Planilla/PlanillaIcons/editarIcon.png";
import { useNavigate } from "react-router-dom";

export default function CitaDetails({ cita, mode = "por", onClose, onModificar, onCancelar }) {
  const mapsQuery = encodeURIComponent(cita.direccion || "Bogotá");
  const mapsSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-400 shadow-md overflow-hidden h-full">
      <div className="p-6 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">
              {cita.especialidad_medico || "Cita médica"}
            </h3>
            <p className="text-sm text-gray-500">{cita.fecha}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex gap-6 flex-1">
          {/* LEFT: Info */}
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Paciente</h4>
              <p className="text-black">
                {cita.nombre_paciente} {cita.apellido_paciente}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Médico</h4>
              <p className="text-black">
                {cita.nombre_medico} {cita.apellido_medico}
              </p>
              <p className="text-gray-500 text-sm">{cita.especialidad_medico}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Estado</h4>
              <span
                className={`py-1 rounded-lg text-sm ${
                  cita.estado_cita === "PROGRAMADA" || cita.estado_cita === "COMPLETADA"
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {cita.estado_cita}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 pl-4">
            {mode === "por" ? (
              <div className="h-full border rounded-lg overflow-hidden">
                <iframe
                  title="mapa"
                  src={mapsSrc}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-full overflow-auto">
                <h4 className="text-sm font-semibold mb-2">Notas del médico</h4>
                <p className="text-gray-700 mb-4">
                  {cita.notas || "Sin notas registradas"}
                </p>
                <button
                  onClick={() => navigate("/paciente/indicaciones")}
                  className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow"
                >
                  Ver ind. médicas
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        {mode === "por" && (
          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={() => onModificar?.(cita)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow"
            >
              <img src={editarIcon} alt="editar" className="w-6" />
            </button>
            <button
              onClick={() => onCancelar?.(cita)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow"
            >
              <img src={cancelarIcon} alt="cancelar" className="w-6" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}