import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Idioma español
import flechaIcon from "./CitasIcon/flechaIcon.png";
import flechaIconIzq from "./CitasIcon/flechaIconIzq.png";

dayjs.locale("es"); // Configuración global

export default function Calendario({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const nextMonth = () => setCurrentMonth((m) => m.add(1, "month"));
  const prevMonth = () => setCurrentMonth((m) => m.subtract(1, "month"));

  const renderMonth = (month) => {
    // Usamos Date nativa para evitar offsets por el cambio de horario
    const year = month.year();
    const monthIndex = month.month(); // 0..11

    const firstOfMonth = new Date(year, monthIndex, 1);
    const startDayOfWeek = firstOfMonth.getDay(); // 0 = Domingo ... 6 = Sábado

    // Inicio de la grilla: domingo anterior (o el mismo domingo si empieza en domingo)
    const gridStart = new Date(year, monthIndex, 1 - startDayOfWeek);

    // Generamos 6 semanas (6 * 7 = 42) — así la altura nunca cambia
    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      // Convertimos a dayjs para formateo / comparación con selectedDate
      days.push(dayjs(d));
    }

    return (
      <div className="w-90 pt-5">
        <h3 className="text-center font-semibold mb-3 text-xl capitalize pb-1">
          {month.format("MMMM YYYY")}
        </h3>

        {/* Forzar altura constante para que siempre quepan 6 filas (ya estamos generando 42 días) */}
        <div
          className="grid grid-cols-7 gap-x-2 gap-y-1 text-center"
          style={{ minHeight: "320px" }} // Mantén o ajusta este valor si cambias tamaños
        >
          {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
            <div key={d} className="font-bold pb-2">
              {d}
            </div>
          ))}

          {days.map((d) => {
            const isCurrentMonth = d.month() === month.month();
            const isSelected = selectedDate && selectedDate.isSame && selectedDate.isSame(d, "day");

            return (
              <button
                key={d.format("YYYY-MM-DD")}
                className={`py-2 px-3 rounded-lg text-lg ${
                  isSelected
                    ? "bg-green-500 text-white"
                    : isCurrentMonth
                    ? "hover:bg-green-100"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedDate(d)}
                disabled={!isCurrentMonth}
              >
                {d.date()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center pt-10">
      {/* Contenedor del calendario */}
      <div className="flex gap-4 items-start bg-white rounded-xl">
        {/* Botones de navegación */}
        <button onClick={prevMonth}>
          <img className="w-2 pt-10" src={flechaIconIzq} alt="Anterior" />
        </button>

        <div className="flex gap-16 t-2">
          {renderMonth(currentMonth)}
          {renderMonth(currentMonth.add(1, "month"))}
        </div>

        <button onClick={nextMonth}>
          <img className="w-2 pt-10" src={flechaIcon} alt="Siguiente" />
        </button>
      </div>
    </div>
  );
}
