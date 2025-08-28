import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import PlanillaTable from "../components/Planilla/PlanillaTable";
import CitaDetails from "../components/Planilla/CitaDetails";

const samplePorTomar = [
  {
    id: 1,
    tipo: "Consulta general",
    fecha: "2025-08-20",
    fechaReadable: "20 de agosto de 2025",
    hora: "08:00 A.M.",
    medico: "Dr. Gerson Sánchez",
    direccion: "Calle 123, Bogotá",
    estado: "Programada",
  },
  {
    id: 2,
    tipo: "Consulta de seguimiento",
    fecha: "2025-08-23",
    fechaReadable: "23 de agosto de 2025",
    hora: "10:00 A.M.",
    medico: "Dra. Juliana García",
    direccion: "Av. Siempre Viva 45",
    estado: "Programada",
  },
  {
    id: 3,
    tipo: "Consulta de seguimiento",
    fecha: "2025-08-30",
    fechaReadable: "30 de agosto de 2025",
    hora: "02:00 P.M.",
    medico: "Dr. Carlos Pérez",
    direccion: "Cll 50 #20-10",
    estado: "Programada",
  },
];

const sampleTomadas = [
  {
    id: 11,
    tipo: "Consulta general",
    fecha: "2025-07-15",
    fechaReadable: "15 de julio de 2025",
    hora: "09:00 A.M.",
    medico: "Dra. Luna",
    notas:
      "El paciente se queja de dolores de cabeza frecuentes y fatiga. Revisar historial médico.",
    indicaciones:
      "Tome Ibuprofeno 200 mg cada 6 horas con comida durante 3 días.",
  },
  {
    id: 12,
    tipo: "Control postoperatorio",
    fecha: "2025-07-22",
    fechaReadable: "22 de julio de 2025",
    hora: "11:00 A.M.",
    medico: "Dr. Ramírez",
    notas: "Evolución favorable, retirar puntos en 7 días.",
    indicaciones: "Aplicar pomada 2 veces al día durante 5 días.",
  },
];

export default function PlanillaCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Planilla" },
  ];

  const [tab, setTab] = useState("por"); // 'por' | 'tomadas'
  const [selectedCita, setSelectedCita] = useState(null);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Citas por tomar</h2>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={() => {
              setTab("por");
              setSelectedCita(null);
            }}
            className={`px-4 py-2 rounded-md font-medium ${
              tab === "por"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Por tomar
          </button>
          <button
            onClick={() => {
              setTab("tomadas");
              setSelectedCita(null);
            }}
            className={`px-4 py-2 rounded-md font-medium ${
              tab === "tomadas"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Tomadas
          </button>
        </div>

        {/* Main layout: table (left) and details panel (right) */}
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-4">
              <PlanillaTable
                mode={tab}
                porTomar={samplePorTomar}
                tomadas={sampleTomadas}
                onViewDetails={(cita) => setSelectedCita(cita)}
              />
            </div>
          </div>

          {/* Panel derecho: si se seleccionó una cita */}
          <div className="w-1/2">
            {selectedCita ? (
              <CitaDetails
                cita={selectedCita}
                mode={tab}
                onClose={() => setSelectedCita(null)}
              />
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                Selecciona "Ver detalles" en una cita para ver más información
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
