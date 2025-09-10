import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import Calendar from "../components/Citas/Calendario";
import TipoCita from "../components/Citas/TipoCita";
import Ubicacion from "../components/Citas/Ubicacion";
import HoraRango from "../components/Citas/HoraRango";
import HoraDetalle from "../components/Citas/HoraDetalle";
import BuscarButton from "../components/Citas/BuscarButton";

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

  const handleBuscar = () => {
    navigate("/resultados-cita", {
      state: { selectedDate, tipoCita, ubicacion, hora },
    });
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
        {/* Tipo de cita solo habilitado si hay fecha */}
        <TipoCita
          tipoCita={tipoCita}
          setTipoCita={setTipoCita}
          disabled={!selectedDate}
        />

        {/* Ubicación solo habilitada si hay fecha y tipo de cita */}
        <Ubicacion
          ubicacion={ubicacion}
          setUbicacion={setUbicacion}
          disabled={!selectedDate || !tipoCita}
        />

        {/* Hora solo habilitada si hay fecha, tipo y ubicación */}
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
            <BuscarButton disabled={isDisabled} onClick={handleBuscar} />
          </div>
        </div>
      )}
      </div>
    </>
  );
}
