export default function ModalDoctor({ doctor, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

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

        <div className="flex items-center gap-4">
          <img
            src={doctor.image || "/default-doctor.png"}
            alt={`${doctor.nombre} ${doctor.apellido}`}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-lg font-bold">
              {doctor.nombre} {doctor.apellido}
            </h3>
            <p className="text-gray-500 font-medium">
              {doctor.especialidad}
            </p>
            <p className="text-gray-400 text-sm">
              {doctor.hospital}
            </p>
          </div>
        </div>

        <p className="mt-3 italic text-gray-600">
          {doctor.estudios || "Estudios no registrados"}
        </p>

        <p className="mt-2 text-yellow-500 text-lg">
          {"⭐".repeat(Math.floor(doctor.calificacion || 0))}
          {"☆".repeat(5 - Math.floor(doctor.calificacion || 0))}
        </p>

        <hr className="my-4" />

        <button
          onClick={onConfirm}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
}
