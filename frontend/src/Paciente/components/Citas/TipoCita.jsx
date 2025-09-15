export default function TipoCita({ tipoCita, setTipoCita, disabled }) {
  const opciones = [
    "Cita de control",
    "Cita general",
    "Cita odontológica",
    "Cita pediatría",
    "Cita cardiología",
    "Cita dermatología",
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="tipo-cita" className="font-semibold">
        Seleccionar tipo de cita
      </label>
      <select
        id="tipo-cita"
        value={tipoCita}
        onChange={(e) => setTipoCita(e.target.value)}
        disabled={disabled}
        className={`p-3 border rounded-lg bg-white shadow-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-green-500
          hover:border-green-400 focus:border-green-500
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
      >
        <option value="" disabled>
          -- Selecciona una opción --
        </option>
        {opciones.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
