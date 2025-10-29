import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { agendarCita } from "../../../../services/citasService";

export default function ModalExito({ open, onClose, citaData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar la confirmación
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Llamar a la API para agendar la cita
      await agendarCita(citaData);
      // Redirigir a la vista de citas
      navigate("/paciente/citas");
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      alert("Hubo un problema al agendar la cita. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 text-center w-full max-w-sm relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <CheckCircle2 className="text-green-500 w-14 h-14 mx-auto" />
        <p className="mt-4 text-lg font-semibold text-gray-800">
          ¡Cita de control agendada exitosamente!
        </p>

        <button
          onClick={handleConfirm} // Agendar la cita y redirigir
          disabled={isLoading}
          className={`mt-6 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold py-2 px-6 rounded-lg transition`}
        >
          {isLoading ? "Agendando..." : "De acuerdo"}
        </button>
      </div>
    </div>
  );
}
