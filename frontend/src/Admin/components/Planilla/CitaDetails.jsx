import React from "react";

/**
 * Muestra información detallada de la cita en la mitad derecha de la pantalla.
 * Si mode === 'por' -> muestra info + iframe mapa (lado derecho)
 * Si mode === 'tomadas' -> muestra info + notas adicionales + indicaciones
 */
export default function CitaDetails({ cita, mode = "por", onClose }) {
  // generar URL de Google Maps simple (usuario reemplaza con embed real si quiere)
  const mapsQuery = encodeURIComponent(cita.direccion || "Bogotá");
  const mapsSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{cita.tipo}</h3>
            <p className="text-sm text-gray-500">{cita.fechaReadable} • {cita.hora}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">Cerrar ✕</button>
        </div>

        <div className="flex gap-6 flex-1">
          {/* LEFT: Información detallada (primera mitad) */}
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Médico</h4>
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

            {mode === "tomadas" && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Notas adicionales</h4>
                  <p className="text-green-700">{cita.notas || "Sin notas"}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Indicaciones médicas</h4>
                  <p className="text-green-700">{cita.indicaciones || "Sin indicaciones"}</p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT: mapa (para 'por') o notas (para 'tomadas' extra) */}
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
              <div className="h-full border rounded-lg p-4 overflow-auto">
                <h4 className="text-sm font-semibold mb-2">Notas del médico</h4>
                <p className="text-gray-700 mb-4">{cita.notas}</p>

                <h4 className="text-sm font-semibold mb-2">Indicaciones médicas</h4>
                <p className="text-green-700">{cita.indicaciones}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
