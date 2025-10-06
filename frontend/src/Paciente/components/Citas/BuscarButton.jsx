import buscarIconBlanco from "./CitasIcon/buscarIconBlanco.png";

export default function BuscarButton({ disabled, onClick }) {
  return (
    <button
      className={`flex items-center gap-2 p-3 mt-8 rounded-lg text-white px-4 ${
        disabled
          ? "bg-gray-300 cursor-not-allowed font-medium"
          : "bg-green-500 hover:bg-green-600 font-medium shadow-sm transition"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <img src={buscarIconBlanco} alt="Buscar" className="w-6 h-6" />
      <span>Buscar</span>
    </button>
  );
}
