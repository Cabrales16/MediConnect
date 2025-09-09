import React from "react";

export default function CitaDetails({ cita, mode = "por", onClose }) {
  const mapsQuery = encodeURIComponent(cita.direccion || "Bogotá");
  const mapsSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <div className="bg-white rounded-2xl border border-gray-400 shadow-md overflow-hidden h-full">
      <div className="p-6 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{cita.tipo}</h3>
            <p className="text-sm text-gray-500">
              {cita.fechaReadable} • {cita.hora}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex gap-6 flex-1">
          {/* LEFT: Info */}
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Paciente</h4>
              <p className="text-black">{cita.medico || "Sin asignar"}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Dirección</h4>
              <p className="text-black">{cita.direccion || "No especificada"}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Estado</h4>
              <p className="text-black">{cita.estado || "Programada"}</p>
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
                <p className="text-gray-700 mb-4">{cita.notas}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
