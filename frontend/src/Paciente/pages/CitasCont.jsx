import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import Calendar from "../components/Citas/Calendario";
import TipoCita from "../components/Citas/TipoCita";
import Ubicacion from "../components/Citas/Ubicacion";
import HoraRango from "../components/Citas/HoraRango";
import HoraDetalle from "../components/Citas/HoraDetalle";
import BuscarButton from "../components/Citas/BuscarButton";
import { agendarCita } from "../../services/citasService"; 

export default function Citas() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Citas" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const quickData = location.state;

  const [selectedDate, setSelectedDate] = useState(null);
  const [tipoCita, setTipoCita] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [hora, setHora] = useState({
    tipo: "",
    inicio: "",
    fin: "",
    am_pm: "",
    am_pm_inicio: "",
    am_pm_fin: "",
  });
  const [loading, setLoading] = useState(false);

  // Si viene desde cita rápida, prellenar
  useEffect(() => {
    if (quickData) {
      setSelectedDate(quickData.selectedDate);
      setTipoCita(quickData.tipoCita);
      setUbicacion(quickData.ubicacion);
      setHora(quickData.hora);
    }
  }, [quickData]);

  // Validación de botón buscar
  const isDisabled =
    !selectedDate ||
    !tipoCita ||
    !ubicacion ||
    !hora.tipo ||
    (hora.tipo === "especifica" && (!hora.inicio || !hora.am_pm)) ||
    (hora.tipo === "rango" &&
      (!hora.inicio || !hora.fin || !hora.am_pm_inicio || !hora.am_pm_fin));

  const handleBuscar = async () => {
    try {
      setLoading(true);

      // Preparar payload según backend (ajusta los nombres de campos)
      const citaPayload = {
        id_paciente: 1, // 👈 reemplazar con el id del paciente autenticado
        id_medico: parseInt(tipoCita), // si tipoCita es el id del médico
        id_hospital: parseInt(ubicacion),
        fecha: selectedDate,
        hora: hora.inicio, // ajusta si manejas rangos
        estado: "PENDIENTE",
      };

      const nuevaCita = await agendarCita(citaPayload);

      // Redirigir al detalle de resultados o confirmación
      navigate("/resultados-cita", { state: { cita: nuevaCita } });
    } catch (error) {
      console.error("Error al agendar cita:", error);
      alert(error.response?.data?.detail || "No se pudo agendar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="text-2xl font-semibold pl-8 pt-8">Agendar cita</div>

      <div className="pb-30">
        {/* Calendario */}
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        {/* Filtros principales */}
        <div className="flex flex-col md:flex-row gap-6 pt-8 px-8">
          <TipoCita
            tipoCita={tipoCita}
            setTipoCita={setTipoCita}
            disabled={!selectedDate}
          />

          <Ubicacion
            ubicacion={ubicacion}
            setUbicacion={setUbicacion}
            disabled={!selectedDate || !tipoCita}
          />

          <HoraRango
            hora={hora}
            setHora={setHora}
            disabled={!selectedDate || !tipoCita || !ubicacion}
          />
        </div>

        {/* Detalle de horas */}
        {hora.tipo && (
          <div className="flex flex-col md:flex-row items-start gap-6 px-8 pt-10">
            <div className="flex-1">
              <div className="font-semibold mb-2">
                {hora.tipo === "especifica"
                  ? "Seleccionar hora"
                  : "Seleccionar rango"}
              </div>
              <HoraDetalle hora={hora} setHora={setHora} />
            </div>

            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <BuscarButton
                disabled={isDisabled || loading}
                onClick={handleBuscar}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
