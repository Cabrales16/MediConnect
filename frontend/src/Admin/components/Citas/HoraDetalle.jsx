import rangoHoraIcon from "./CitasIcon/rangoHoraIcon.png";

export default function HoraDetalle({ hora, setHora }) {
  const normalizeTo24h = (time, ampm) => {
    if (!time || !ampm) return null;
    const [hhStr, mmStr] = time.split(":");
    let hh = parseInt(hhStr, 10);
    let mm = parseInt(mmStr || "0", 10);

    if (isNaN(hh) || isNaN(mm)) return null;

    // Validar rango hora (1–12) y minutos (0–59)
    if (hh < 1 || hh > 12 || mm < 0 || mm > 59) return null;

    // Convertir a 24h
    if (ampm === "PM" && hh !== 12) hh += 12;
    if (ampm === "AM" && hh === 12) hh = 0;

    return hh * 60 + mm; // total minutos para comparar fácilmente
  };

  const handleTimeInput = (field, value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length > 4) digits = digits.slice(0, 4);
    if (digits.length > 2) digits = digits.slice(0, 2) + ":" + digits.slice(2);

    let newHora = { ...hora, [field]: digits };

    // Validar rango solo si es hora.fin
    if (field === "fin") {
      const inicioMins = normalizeTo24h(newHora.inicio, newHora.am_pm_inicio);
      const finMins = normalizeTo24h(digits, newHora.am_pm_fin);

      if (inicioMins !== null && finMins !== null && finMins <= inicioMins) {
        // ❌ Si hora fin no es mayor, la limpiamos
        newHora.fin = "";
      }
    }

    setHora(newHora);
  };

  const handleAmPmChange = (field, value) => {
    let newHora = { ...hora, [field]: value };

    // Validar rango si se cambia el AM/PM de fin
    if (field === "am_pm_fin") {
      const inicioMins = normalizeTo24h(newHora.inicio, newHora.am_pm_inicio);
      const finMins = normalizeTo24h(newHora.fin, value);

      if (inicioMins !== null && finMins !== null && finMins <= inicioMins) {
        newHora.fin = "";
      }
    }

    setHora(newHora);
  };

  const inputClass =
    "p-3 border rounded-lg bg-white shadow-sm focus:outline-none transition-all border-black hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500";

  return (
    <div className="pt-2 flex flex-wrap gap-4">
      {/* Caso: Hora específica */}
      {hora.tipo === "especifica" && (
        <>
          <input
            type="text"
            placeholder="Ej: 10:30"
            className={inputClass}
            value={hora.inicio}
            onChange={(e) => handleTimeInput("inicio", e.target.value)}
            maxLength={5}
          />
          <select
            value={hora.am_pm || ""}
            onChange={(e) => setHora({ ...hora, am_pm: e.target.value })}
            className={inputClass}
          >
            <option value="" disabled hidden>
              -- AM/PM --
            </option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </>
      )}

      {/* Caso: Rango */}
      {hora.tipo === "rango" && (
        <div className="flex items-center gap-4">
          {/* Inicio */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Inicio (Ej: 09:00)"
              className={inputClass}
              value={hora.inicio}
              onChange={(e) => handleTimeInput("inicio", e.target.value)}
              maxLength={5}
            />
            <select
              value={hora.am_pm_inicio || ""}
              onChange={(e) => handleAmPmChange("am_pm_inicio", e.target.value)}
              className={inputClass}
            >
              <option value="" disabled hidden>
                -- AM/PM --
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {/* Ícono en medio */}
          <div className="text-2xl font-bold text-gray-500">
            <img className="w-4" src={rangoHoraIcon} alt="rangoHoraIcon" />
          </div>

          {/* Fin */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Fin (Ej: 02:00)"
              className={inputClass}
              value={hora.fin}
              onChange={(e) => handleTimeInput("fin", e.target.value)}
              maxLength={5}
            />
            <select
              value={hora.am_pm_fin || ""}
              onChange={(e) => handleAmPmChange("am_pm_fin", e.target.value)}
              className={inputClass}
            >
              <option value="" disabled hidden>
                -- AM/PM --
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
