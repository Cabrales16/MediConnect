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

  const handleBuscar = async () => {
    console.log("=== INICIO handleBuscar ===");
    console.log("selectedDate:", selectedDate);
    console.log("tipoCita:", tipoCita);
    console.log("ubicacion:", ubicacion);
    console.log("hora:", hora);
    
    try {
      setLoading(true);
      console.log("Loading activado");
    
      let slots = [];
    
      const fechaFormateada = dayjs(selectedDate).format("YYYY-MM-DD");
      console.log("Fecha formateada:", fechaFormateada);
    
      if (hora.tipo === "especifica") {
        const horaCompleta = convertirHora(hora.inicio, hora.am_pm);
        console.log("Llamando filtrarMedicosHorafija con:", { fechaFormateada, tipoCita, horaCompleta, ubicacion });
        slots = await filtrarMedicosHorafija(
          fechaFormateada,
          tipoCita,
          horaCompleta,
          ubicacion
        );
      } else if (hora.tipo === "rango") {
        const horaInicio = convertirHora(hora.inicio, hora.am_pm_inicio);
        const horaFin = convertirHora(hora.fin, hora.am_pm_fin);
        console.log("Llamando filtrarMedicosRango con:", { tipoCita, fechaFormateada, horaInicio, horaFin, ubicacion });
        slots = await filtrarMedicosRango(
          tipoCita,
          fechaFormateada,
          horaInicio,
          horaFin,
          ubicacion
        );
      }
    
      console.log("Slots obtenidos desde el servicio:", slots);
      console.log("Tipo de slots:", typeof slots, "Es array:", Array.isArray(slots));
      console.log("Cantidad de slots:", slots?.length);
    
      if (!slots || !slots.length) {
        console.log("No hay slots, mostrando error");
        toast.error("No hay citas disponibles en ese horario.");
        setLoading(false);
        return;
      }
    
      const dataToNavigate = {
        slots,
        fecha: fechaFormateada,
        tipoCita,
        ubicacion,
        hora,
      };
      
      console.log("NAVEGANDO con estos datos:", dataToNavigate);
      console.log("slots antes de navegar (JSON):", JSON.stringify(slots));
    
      navigate("/paciente/citas/medicos-cita", {
        state: dataToNavigate,
      });
    
      console.log("Navigate ejecutado exitosamente");
      toast.success("Citas encontradas exitosamente");
    } catch (error) {
      console.error("Error al buscar citas:", error);
      console.error("Error completo:", error.message, error.stack);
      toast.error(error.response?.data?.detail || "No se pudieron obtener las citas");
    } finally {
      setLoading(false);
      console.log("=== FIN handleBuscar ===");
    }
  };

  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);
  
    if (loading) {
      return <div className="p-8">Cargando novedades...</div>;
  }

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
                <HoraDetalle hora={hora} setHora={setHora} tipoCita={tipoCita} />
              </div>

              <div className="flex justify-center md:justify-end w-full md:w-auto">
                <BuscarButton
                  disabled={
                    !selectedDate ||
                    !tipoCita ||
                    !ubicacion ||
                    !hora.tipo ||
                    !hora.inicio ||
                    (hora.tipo === "rango" && !hora.fin)
                  }
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