import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Breadcrumb from "../components/UI/Breadcrumb";
import Calendar from "../components/Citas/Calendario";
import TipoCita from "../components/Citas/TipoCita";
import Ubicacion from "../components/Citas/Ubicacion";
import HoraRango from "../components/Citas/HoraRango";
import HoraDetalle from "../components/Citas/HoraDetalle";
import BuscarButton from "../components/Citas/BuscarButton";
import {
  filtrarMedicosHorafija,
  filtrarMedicosRango,
} from "../../services/citasService";
import { toast } from "react-toastify"

export default function Citas() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/paciente/inicio" },
    { label: "Citas" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  
  // Memorizar quickData para evitar re-renders innecesarios
  const quickData = useMemo(() => {
    return location.state || null;
  }, [location.state]);

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

  // Si viene desde cita rápida, prellenar - ejecutar solo una vez
  useEffect(() => {
    if (quickData) {
      console.log("Prellenando con quickData:", quickData);
      setSelectedDate(quickData.selectedDate);
      setTipoCita(quickData.tipoCita || "");
      setUbicacion(quickData.ubicacion || "");
      setHora(quickData.hora || {
        tipo: "",
        inicio: "",
        fin: "",
        am_pm: "",
        am_pm_inicio: "",
        am_pm_fin: "",
      });
    }
  }, [quickData]);

  // Efecto de body overflow con limpieza apropiada
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 🔹 Convierte "09:30" + "PM" -> "21:30:00"
  const convertirHora = (time, ampm) => {
    if (!time || !ampm) return null;
    const [hhStr, mmStr] = time.split(":");
    let hh = parseInt(hhStr, 10);
    let mm = parseInt(mmStr || "0", 10);

    if (ampm === "PM" && hh !== 12) hh += 12;
    if (ampm === "AM" && hh === 12) hh = 0;

    return `${hh.toString().padStart(2, "0")}:${mm
      .toString()
      .padStart(2, "0")}:00`;
  };

  // Memorizar validación para evitar recálculos innecesarios
  const isDisabled = useMemo(() => {
    return (
      !selectedDate ||
      !tipoCita ||
      !ubicacion ||
      !hora.tipo ||
      (hora.tipo === "especifica" && (!hora.inicio || !hora.am_pm)) ||
      (hora.tipo === "rango" &&
        (!hora.inicio || !hora.fin || !hora.am_pm_inicio || !hora.am_pm_fin))
    );
  }, [selectedDate, tipoCita, ubicacion, hora]);

  const handleBuscar = async () => {
    try {
      setLoading(true);

      let slots = [];

      const fechaFormateada = dayjs(selectedDate).format("YYYY-MM-DD");

      if (hora.tipo === "especifica") {
        const horaCompleta = convertirHora(hora.inicio, hora.am_pm);
        slots = await filtrarMedicosHorafija(
          fechaFormateada,
          tipoCita,
          horaCompleta,
          ubicacion
        );
      } else if (hora.tipo === "rango") {
        const horaInicio = convertirHora(hora.inicio, hora.am_pm_inicio);
        const horaFin = convertirHora(hora.fin, hora.am_pm_fin);
        slots = await filtrarMedicosRango(
          tipoCita,
          fechaFormateada,
          horaInicio,
          horaFin,
          ubicacion
        );
      }

      if (!slots.length) {
        alert("No hay citas disponibles en ese horario.");
        return;
      }

      console.log("Slots obtenidos desde el servicio:", slots);
      navigate("/paciente/citas/medicos-cita", { state: { slots } });
      toast.success("Citas encontradas exitosamente");
    } catch (error) {
      console.error("Error al buscar citas:", error);
      alert(error.response?.data?.detail || "No se pudieron obtener las citas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="pb-30 overflow-y-auto sm:overflow-y-visible h-[100vh]">
        <div className="text-2xl font-semibold pl-8 pt-8">Agendar cita</div>

        <div className="pb-70">
          {/* Calendario */}
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

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
      </div>
    </>
  );
}