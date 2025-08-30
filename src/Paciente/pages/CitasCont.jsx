import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    { label: "Citas" }
  ];

  const location = useLocation();
  const quickData = location.state; // 👈 datos desde cita rápida

  const [selectedDate, setSelectedDate] = useState(null);
  const [tipoCita, setTipoCita] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [hora, setHora] = useState({
    tipo: "",
    inicio: "",
    fin: "",
    am_pm: "",
    am_pm_inicio: "",
    am_pm_fin: ""
  });

  // Si viene desde Cita rápida, prellenar
  useEffect(() => {
    if (quickData) {
      setSelectedDate(quickData.selectedDate);
      setTipoCita(quickData.tipoCita);
      setUbicacion(quickData.ubicacion);
      setHora(quickData.hora);
    }
  }, [quickData]);

  const isDisabled =
    !selectedDate ||
    !tipoCita ||
    !ubicacion ||
    !hora.tipo ||
    (hora.tipo === "especifica" && (!hora.inicio || !hora.am_pm)) ||
    (hora.tipo === "rango" &&
      (!hora.inicio || !hora.fin || !hora.am_pm_inicio || !hora.am_pm_fin));

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="text-2xl font-semibold pl-8 pt-8">Agendar cita</div>

      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="flex gap-6 pt-8 pl-8 pr-8">
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

      {hora.tipo && (
        <div className="flex items-start gap-6 pl-8 pr-8 pt-10">
          <div className="flex-1">
            <div className="font-semibold">
              {hora.tipo === "especifica" ? "Seleccionar hora" : "Seleccionar rango"}
            </div>
            <HoraDetalle hora={hora} setHora={setHora} />
          </div>

          <div className="flex justify-end">
            <BuscarButton disabled={isDisabled} />
          </div>
        </div>
      )}
    </>
  );
}
