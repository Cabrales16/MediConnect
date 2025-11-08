import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import PlanillaTable from "../components/Planilla/PlanillaTable";
import CitaDetails from "../components/Planilla/CitaDetails";
import { getCitasMedico } from "../../services/citasService"; // asegúrate de tener este servicio correcto

export default function PlanillaCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/medico/inicio" },
    { label: "Planilla" },
  ];

  const [tab, setTab] = useState("por"); // 'por' | 'tomadas'
  const [selectedCita, setSelectedCita] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔧 Funciones auxiliares
  const formatFecha = (fechaISO) => {
    try {
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return fechaISO;
    }
  };

  const formatHora = (hora) => {
    if (!hora) return "";
    const [h, m] = hora.split(":");
    const horas = parseInt(h);
    const ampm = horas >= 12 ? "P.M." : "A.M.";
    const hora12 = horas % 12 || 12;
    return `${hora12}:${m} ${ampm}`;
  };

  useEffect(() => {
    const id_usuario = localStorage.getItem("id_usuario"); // o desde el contexto del usuario
    if (!id_usuario) return;

    setLoading(true);
    getCitasMedico(id_usuario)
      .then((data) => {
        // 🔄 Adaptar datos del backend al formato del frontend
        const adaptadas = data.map((c) => ({
          id_cita: c.id_cita,
          id_paciente: c.id_paciente,
          fecha: c.fecha,
          fechaReadable: formatFecha(c.fecha),
          hora: formatHora(c.hora),
          estado_cita: c.estado?.toUpperCase() || "",
          especialidad_medico: c.tipo_cita || "General",
          nombre_paciente: c.paciente_nombre || "",
          apellido_paciente: c.paciente_apellido || "",
        }));
        setCitas(adaptadas);
      })
      .catch((err) => console.error("Error cargando citas:", err))
      .finally(() => setLoading(false));
  }, []);

  const citasPorTomar = citas.filter((c) => c.estado_cita === "PROGRAMADA");
  const citasTomadas = citas.filter((c) => c.estado_cita === "TOMADA");

  // Bloquear scroll del body al abrir el panel
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-4">Citas del médico</h2>

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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabla izquierda */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-md p-4">
              {loading ? (
                <p className="text-gray-500">Cargando citas...</p>
              ) : (
                <PlanillaTable
                  mode={tab}
                  porTomar={citasPorTomar}
                  tomadas={citasTomadas}
                  onViewDetails={(cita) => setSelectedCita(cita)}
                />
              )}
            </div>
          </div>

          {/* Panel derecho */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            {selectedCita ? (
              <CitaDetails
                cita={selectedCita}
                mode={tab}
                onClose={() => setSelectedCita(null)}
              />
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 p-4">
                Selecciona "Ver detalles" en una cita para ver más información
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
