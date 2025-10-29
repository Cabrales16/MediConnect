import { useState, useEffect } from "react";

export default function ModalDoctores({ doctor, isOpen, onClose, onConfirm }) {
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (doctor?.slots_disponibles?.length > 0) {
      setSelectedSlot(doctor.slots_disponibles[0]);
    }
  }, [doctor]);

  if (!isOpen || !doctor) return null;

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert("Por favor, selecciona un horario");
      return;
    }
    onConfirm(selectedSlot);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* Info */}
        <div className="flex items-center gap-4">
          <img
            src={doctor.image || "/default-doctor.jpg"}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border"
            onError={(e) => (e.target.src = "/default-doctor.jpg")}
          />
          <div>
            <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
            <p className="text-green-600 font-medium">{doctor.specialty}</p>
            {doctor.hospital && <p className="text-gray-500 text-sm">{doctor.hospital}</p>}
          </div>
        </div>

        {doctor.estudios && <p className="mt-3 italic text-gray-600">{doctor.estudios}</p>}
        {doctor.calificacion && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-yellow-500 text-lg">
              {"⭐".repeat(Math.floor(doctor.calificacion))}
              {"☆".repeat(5 - Math.floor(doctor.calificacion))}
            </span>
            <span className="text-gray-700 text-sm">({doctor.calificacion.toFixed(1)}/5)</span>
          </div>
        )}

        {/* Horarios */}
        {doctor.slots_disponibles && doctor.slots_disponibles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">Horarios disponibles:</p>
            <div className="flex flex-wrap gap-2">
              {doctor.slots_disponibles.map((hora, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedSlot === hora
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedSlot(hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Agendar cita
        </button>
      </div>
    </div>
  );
}
