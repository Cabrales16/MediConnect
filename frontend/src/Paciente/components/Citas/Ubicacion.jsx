export default function Ubicacion({ ubicacion, setUbicacion, disabled }) {
  const ubicaciones = [
    { id: 1, nombre: "Hospital de Suba" },
    { id: 2, nombre: "Hospital de Engativá" },
    { id: 3, nombre: "Opticentro Internacional" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold">Seleccione la ubicación</h3>
      <select
        value={ubicacion}
        onChange={(e) => setUbicacion(Number(e.target.value))} 
        disabled={disabled}
        className={`p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 focus:border-green-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="" disabled>
          -- Selecciona una opción --
        </option>
        {ubicaciones.map((u) => (
          <option key={u.id} value={u.id}>
            {u.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
