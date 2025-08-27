import React, { useState } from "react";
import Breadcrumb from "../UI/Breadcrumb";
import Calendar from "./Calendario";
import TipoCita from "./TipoCita";
import Ubicacion from "./Ubicacion";
import HoraRango from "./HoraRango";
import HoraDetalle from "./HoraDetalle";
import BuscarButton from "./BuscarButton";

export default function Citas() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Citas" }
  ];

  // Estados
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

  // Validación para habilitar el botón
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

      {/* Calendario */}
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* Fila principal con TipoCita, Ubicacion y HoraRango */}
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

      {/* Sección condicional para HoraDetalle y el botón Buscar */}
      {hora.tipo && (
      <div className="flex items-start gap-6 pl-8 pr-8 pt-10">
        {/* Columna izquierda: subtítulo + HoraDetalle */}
        <div className="flex-1">
          <div className="font-semibold">
            {hora.tipo === "especifica"
              ? "Seleccionar hora"
              : "Seleccionar rango"}
          </div>
          <HoraDetalle hora={hora} setHora={setHora} />
        </div>
            
        {/* Columna derecha: botón */}
        <div className="flex justify-end">
          <BuscarButton
            disabled={isDisabled}
            
          />
        </div>
      </div>
)}
    </>
  );
}
