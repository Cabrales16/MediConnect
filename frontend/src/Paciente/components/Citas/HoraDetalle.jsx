import rangoHoraIcon from "./CitasIcon/rangoHoraIcon.png";
import { useEffect, useState } from "react";

export default function HoraDetalle({ hora, setHora, tipoCita }) {
  const [opcionesHora, setOpcionesHora] = useState([]);

  // 🕒 Generar lista de horas según tipo de cita
  useEffect(() => {
    const generarHoras = () => {
      let intervalo = 30; // ESTE ES EL VALOR POR DEFECTO SI UNA OPCION NO ESTA ESPECIFICADA
      if (tipoCita?.toLowerCase().includes("general")) intervalo = 15;
      else if (tipoCita?.toLowerCase().includes("odont")) intervalo = 20;
      else if (tipoCita?.toLowerCase().includes("cardio")) intervalo = 30;

      const horas = [];
      let start = 7 * 60; // 7:00 AM
      const end = 19 * 60; // 7:00 PM

      while (start <= end) {
        const hh = Math.floor(start / 60);
        const mm = start % 60;
        const ampm = hh >= 12 ? "PM" : "AM";
        const displayHour = ((hh + 11) % 12) + 1;
        const formatted = `${displayHour.toString().padStart(2, "0")}:${mm
          .toString()
          .padStart(2, "0")} ${ampm}`;
        horas.push(formatted);
        start += intervalo;
      }
      setOpcionesHora(horas);
    };

    generarHoras();
  }, [tipoCita]);

  // Converter de horas
  const toMinutes = (horaStr) => {
    if (!horaStr) return null;
    const [time, ampm] = horaStr.split(" ");
    const [hh, mm] = time.split(":").map(Number);
    let total = hh % 12 * 60 + (mm || 0);
    if (ampm === "PM") total += 12 * 60;
    return total;
  };

  const inputClass =
    "p-3 border rounded-lg bg-white shadow-sm focus:outline-none transition-all border-black hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500";

  // 🧮 Filtrar horas de fin
  const horaInicioMin = toMinutes(hora.inicio);
  const opcionesFin = horaInicioMin
    ? opcionesHora.filter((h) => toMinutes(h) > horaInicioMin)
    : opcionesHora;

  return (
    <div className="pt-2 flex flex-wrap gap-4">
      {/* Hora específica */}
      {hora.tipo === "especifica" && (
        <select
          value={hora.inicio || ""}
          onChange={(e) => setHora({ ...hora, inicio: e.target.value })}
          className={inputClass}
        >
          <option value="" disabled>
            -- Seleccione una hora --
          </option>
          {opcionesHora.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      )}

      {/* Rango */}
      {hora.tipo === "rango" && (
        <div className="flex flex-col md:flex-row items-center gap-4">

          <div className="flex gap-2 items-center w-full md:w-auto">
            <select
              value={hora.inicio || ""}
              onChange={(e) => {
                const value = e.target.value;
                setHora({
                  ...hora,
                  inicio: value,
                  fin:
                    hora.fin && toMinutes(hora.fin) <= toMinutes(value)
                      ? ""
                      : hora.fin,
                });
              }}
              className={inputClass}
            >
              <option value="" disabled>
                -- Inicio --
              </option>
              {opcionesHora.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <img className="w-4 self-center" src={rangoHoraIcon} alt="Rango" />

          <div className="flex gap-2 items-center w-full md:w-auto">
            <select
              value={hora.fin || ""}
              onChange={(e) => setHora({ ...hora, fin: e.target.value })}
              className={inputClass}
              disabled={!hora.inicio}
            >
              <option value="" disabled>
                -- Fin --
              </option>
              {opcionesFin.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}