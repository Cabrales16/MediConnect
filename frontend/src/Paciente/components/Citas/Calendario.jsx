import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import flechaIcon from "./CitasIcon/flechaIcon.png";
import flechaIconIzq from "./CitasIcon/flechaIconIzq.png";

dayjs.locale("es");

export default function Calendario({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const nextMonth = () => setCurrentMonth((m) => m.add(1, "month"));
  const prevMonth = () => setCurrentMonth((m) => m.subtract(1, "month"));

  const renderMonth = (month) => {
    const year = month.year();
    const monthIndex = month.month();
    const firstOfMonth = new Date(year, monthIndex, 1);
    const startDayOfWeek = firstOfMonth.getDay();
    const gridStart = new Date(year, monthIndex, 1 - startDayOfWeek);

    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      days.push(dayjs(d));
    }

    return (
      <div className="w-80 pt-5">
        <h3 className="text-center font-semibold mb-3 text-xl capitalize">
          {month.format("MMMM YYYY")}
        </h3>
        <div className="grid grid-cols-7 gap-x-2 gap-y-1 text-center min-h-[320px]">
          {/* ✅ Nombres únicos y claros para los días */}
          {["D", "L", "Ma", "Mi", "J", "V", "S"].map((d) => (
            <div key={d} className="font-bold pb-2">
              {d}
            </div>
          ))}
          {days.map((d) => {
            const isCurrentMonth = d.month() === month.month();
            const isSelected =
              selectedDate && selectedDate.isSame(d, "day");

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
                onClick={() => setSelectedDate(d)} // guardamos un objeto dayjs
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
      <div className="flex items-start bg-white rounded-xl">
        <button onClick={prevMonth} className="px-2 pt-6">
          <img className="w-3" src={flechaIconIzq} alt="Anterior" />
        </button>

        {/* 📱 móvil: un mes | 💻 desktop: dos meses */}
        <div className="flex gap-8 flex-col md:flex-row">
          {renderMonth(currentMonth)}
          <div className="hidden md:block">
            {renderMonth(currentMonth.add(1, "month"))}
          </div>
        </div>

        <button onClick={nextMonth} className="px-2 pt-6">
          <img className="w-3" src={flechaIcon} alt="Siguiente" />
        </button>
      </div>
    </div>
  );
}
