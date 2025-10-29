import { useState, useEffect } from "react";

<<<<<<< HEAD
export default function ModalDoctores({ doctor, isOpen, onClose, onConfirm, citaBase }) {
=======
export default function ModalDoctores({ doctor, isOpen, onClose, onConfirm }) {
>>>>>>> 11c2d8c2e39bc4a4188bcde5d3b2d44e1b9bc165
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (doctor?.slots_disponibles?.length > 0) {
      setSelectedSlot(doctor.slots_disponibles[0]);
    }
  }, [doctor]);

  if (!isOpen || !doctor) return null;

<<<<<<< HEAD
  // 🔁 Convierte "8:30 AM" → "08:30:00"
  const convertirHora24 = (hora12) => {
    if (!hora12) return null;
    const [hora, minutosAMPM] = hora12.split(":");
    const [minutos, ampm] = minutosAMPM.split(" ");
    let h = parseInt(hora, 10);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minutos}:00`;
  };

=======
>>>>>>> 11c2d8c2e39bc4a4188bcde5d3b2d44e1b9bc165
  const handleConfirm = () => {
    if (!selectedSlot) {
      alert("Por favor, selecciona un horario");
      return;
    }
<<<<<<< HEAD

    // 🧠 Obtener id_paciente del localStorage
    const id_paciente = localStorage.getItem("id_usuario");

    // 🧩 Construir payload completo
    const citaPayload = {
      id_paciente: parseInt(id_paciente, 10),
      id_medico: doctor.id || doctor.medico,
      id_hospital: citaBase?.id_hospital || 1,
      fecha: citaBase?.fecha,
      hora: convertirHora24(selectedSlot),
    };

    console.log("📤 Enviando cita:", citaPayload);

    onConfirm(citaPayload);
=======
    onConfirm(selectedSlot);
>>>>>>> 11c2d8c2e39bc4a4188bcde5d3b2d44e1b9bc165
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

<<<<<<< HEAD
        {/* Info del doctor */}
=======
        {/* Info */}
>>>>>>> 11c2d8c2e39bc4a4188bcde5d3b2d44e1b9bc165
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
<<<<<<< HEAD
            {doctor.hospital && (
              <p className="text-gray-500 text-sm">{doctor.hospital}</p>
            )}
=======
            {doctor.hospital && <p className="text-gray-500 text-sm">{doctor.hospital}</p>}
>>>>>>> 11c2d8c2e39bc4a4188bcde5d3b2d44e1b9bc165
          </div>
        </div>

        {doctor.estudios && <p className="mt-3 italic text-gray-600">{doctor.estudios}</p>}
<<<<<<< HEAD

        {/* Calificación */}
        {doctor.calificacion && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-yellow-500 text-lg">
              {"⭐".repeat(Math.floor(doctor.calificacion))}
              {"☆".repeat(5 - Math.floor(doctor.calificacion))}
            </span>
            <span className="text-gray-700 text-sm">
              ({doctor.calificacion.toFixed(1)}/5)
            </span>
          </div>
        )}

        {/* Horarios */}
        {doctor.slots_disponibles && doctor.slots_disponibles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Horarios disponibles:
            </p>
=======
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
>>>>>>> 11c2d8c2e39bc4a4188bcde5d3b2d44e1b9bc165
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

        {/* Botón confirmar */}
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
