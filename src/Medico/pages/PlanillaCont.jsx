import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import PlanillaTable from "../components/Planilla/PlanillaTable";
import CitaDetails from "../components/Planilla/CitaDetails";
import ConfirmModal from "../components/UI/ConfirmModal";
import ModificarCitaModal from "../components/UI/ModificarCitaModal";
import ModalIndicaciones from "../components/UI/ModalIndicaciones";

export default function PlanillaCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Planilla" },
  ];

  // ESTADOS DE CITAS
  const [porTomar, setPorTomar] = useState([
    {
      id: 1,
      tipo: "Consulta general",
      fecha: "2025-08-20",
      fechaReadable: "20 de agosto de 2025",
      hora: "08:00 A.M.",
      paciente: "María González",
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
      paciente: "Juan Pérez",
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
      paciente: "Ana Rodríguez",
      medico: "Dr. Carlos Pérez",
      direccion: "Cll 50 #20-10",
      estado: "Programada",
    },
  ]);

  const [tomadas] = useState([
    {
      id: 11,
      tipo: "Consulta general",
      fecha: "2025-07-15",
      fechaReadable: "15 de julio de 2025",
      hora: "09:00 A.M.",
      paciente: "Carlos Martín",
      medico: "Dra. Luna",
      notas:
        "El paciente se queja de dolores de cabeza frecuentes y fatiga. Revisar historial médico.",
      indicaciones:
        "Tome Ibuprofeno 200 mg cada 6 horas con comida durante 3 días.",
      estado: "Completada",
    },
    {
      id: 12,
      tipo: "Control postoperatorio",
      fecha: "2025-07-22",
      fechaReadable: "22 de julio de 2025",
      hora: "11:00 A.M.",
      paciente: "Laura Sánchez",
      medico: "Dr. Ramírez",
      notas: "Evolución favorable, retirar puntos en 7 días.",
      indicaciones: "Aplicar pomada 2 veces al día durante 5 días.",
      estado: "Completada",
    },
  ]);

  // CONTROLES DE UI
  const [tab, setTab] = useState("por"); // "por" | "tomadas"
  const [selectedCita, setSelectedCita] = useState(null);
  const [modal, setModal] = useState(null); // "modificar" | "cancelar"
  const [modalCita, setModalCita] = useState(null); // Modal de indicaciones

  const handleAsignar = (indicaciones) => {
    console.log("Indicaciones asignadas a", modalCita.paciente, indicaciones);
    setModalCita(null);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
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
            Por atender
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
            Atendidas
          </button>
        </div>

        {/* Main */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabla */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-4">
              <PlanillaTable
                mode={tab}
                porTomar={porTomar}
                tomadas={tomadas}
                onViewDetails={(cita) => setSelectedCita(cita)}
                onAsignar={(cita) => setModalCita(cita)}
              />
            </div>
          </div>

          {/* Detalles */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            {selectedCita ? (
              <CitaDetails
                cita={selectedCita}
                mode={tab}
                onClose={() => setSelectedCita(null)}
                onModificar={() =>
                  selectedCita.estado !== "Cancelado" && setModal("modificar")
                }
                onCancelar={() =>
                  selectedCita.estado !== "Cancelado" && setModal("cancelar")
                }
              />
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-400 flex items-center justify-center text-gray-400 p-6">
                Selecciona "Ver detalles" en una cita para ver más información
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Cancelar */}
      {modal === "cancelar" && selectedCita && (
        <ConfirmModal
          title="Cancelar cita"
          description={`¿Seguro que deseas cancelar la cita "${selectedCita.tipo}" del ${selectedCita.fechaReadable}?`}
          onCancel={() => setModal(null)}
          onConfirm={() => {
            const citaCancelada = { ...selectedCita, estado: "Cancelado" };
            setPorTomar((prev) =>
              prev.filter((c) => c.id !== citaCancelada.id)
            );
            setSelectedCita(citaCancelada);
            setModal(null);
          }}
        />
      )}

      {/* Modal Modificar */}
      {modal === "modificar" && selectedCita && (
        <ModificarCitaModal
          cita={selectedCita}
          onCancel={() => setModal(null)}
          onSave={(updated) => {
            setPorTomar((prev) =>
              prev.map((c) => (c.id === updated.id ? updated : c))
            );
            setSelectedCita(updated);
            setModal(null);
          }}
        />
      )}

      {/* Modal Asignar Indicaciones */}
      {modalCita && (
        <ModalIndicaciones
          cita={modalCita}
          onClose={() => setModalCita(null)}
          onAsignar={handleAsignar}
        />
      )}
    </>
  );
}
