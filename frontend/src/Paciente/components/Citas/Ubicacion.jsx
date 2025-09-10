export default function Ubicacion({ ubicacion, setUbicacion, disabled }) {
  const ubicaciones = [
    "Hospital de Suba",
    "Hospital de Engativá",
    "Simón Bolívar",
    "Opticentro Internacional",
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold">Seleccione la ubicación</h3>
      <select
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        disabled={disabled}
        className={`p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 focus:border-green-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="" disabled>
          -- Selecciona una opción --
        </option>
        {ubicaciones.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
}
