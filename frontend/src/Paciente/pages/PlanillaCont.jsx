// src/pages/PlanillaCont.jsx
import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import PlanillaTable from "../components/Planilla/PlanillaTable";
import CitaDetails from "../components/Planilla/CitaDetails";
import ConfirmModal from "../components/UI/ConfirmModalCita";
import ModificarCitaModal from "../components/UI/ModificarCitaModal";
import { getHistorialPaciente, cancelarCita } from "../../services/historialService";

export default function PlanillaCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/paciente/inicio" },
    { label: "Planilla" },
  ];

  // ESTADOS
  const [porTomar, setPorTomar] = useState([]);
  const [tomadas, setTomadas] = useState([]);
  const [tab, setTab] = useState("por");
  const [selectedCita, setSelectedCita] = useState(null);
  const [modal, setModal] = useState(null);

  // ✅ Cargar citas del backend
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const idPaciente = localStorage.getItem("id_usuario");
        const citas = await getHistorialPaciente(idPaciente);

        setPorTomar(citas.filter((c) => c.estado_cita === "PROGRAMADA"));
        setTomadas(citas.filter((c) => c.estado_cita !== "PROGRAMADA"));
      } catch (error) {
        console.error("Error cargando historial:", error);
      }
    };

    fetchHistorial();
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="pb-30 overflow-y-auto sm:overflow-y-visible h-[100vh]">
              <div className="text-2xl font-semibold pl-8 pt-8">Planilla</div>
      <div className="pb-30 overflow-y-auto sm:overflow-y-visible h-[100vh]">
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
                  selectedCita.estado_cita !== "CANCELADA" &&
                  setModal("modificar")
                }
                onCancelar={() =>
                  selectedCita.estado_cita !== "CANCELADA" &&
                  setModal("cancelar")
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
          description={`¿Seguro que deseas cancelar la cita "${selectedCita.especialidad_medico}" del ${selectedCita.fecha}?`}
          onCancel={() => setModal(null)}
          onConfirm={async () => {
            try {
              await cancelarCita(selectedCita.id_cita); // ✅ Llamada al backend
              const citaCancelada = {
                ...selectedCita,
                estado_cita: "CANCELADA",
              };
              setPorTomar((prev) =>
                prev.filter((c) => c.id_cita !== citaCancelada.id_cita)
              );
              setTomadas((prev) => [...prev, citaCancelada]);
              setSelectedCita(citaCancelada);
            } catch (err) {
              console.error("Error al cancelar cita:", err);
            } finally {
              setModal(null);
            }
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
              prev.map((c) =>
                c.id_cita === updated.id_cita ? updated : c
              )
            );
            setSelectedCita(updated);
            setModal(null);
          }}
        />
      )}
      </div>
      </div>
    </>
  );
}