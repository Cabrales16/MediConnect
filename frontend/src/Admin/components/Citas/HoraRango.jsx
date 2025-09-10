export default function HoraRango({ hora, setHora, disabled }) {
  const handleChange = (value) => {
    setHora({ ...hora, tipo: value });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold">Seleccione hora o rango</h3>
      <select
        value={hora.tipo || ""}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        className={`p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 focus:border-green-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="" disabled hidden>
          -- Selecciona una opción --
        </option>
        <option value="especifica">Hora específica</option>
        <option value="rango">Rango de hora</option>
      </select>
    </div>
  );
}
