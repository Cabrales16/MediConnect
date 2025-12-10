import React from "react";
import cancelarIcon from "../Planilla/PlanillaIcons/cancelarIcon.png";
// import editarIcon from "../Planilla/PlanillaIcons/editarIcon.png";
import { useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
// import { FaStar } from "react-icons/fa";

export default function CitaDetails({
  cita,
  mode = "por",
  onClose,
  // onModificar,
  onCancelar,
}) {
  const mapsQuery = encodeURIComponent(cita.direccion || "Bogotá");
  const mapsSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const navigate = useNavigate();

  // --- Estado para modal y calificación ---
  // const [showModal, setShowModal] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0);
  // const [comentario, setComentario] = useState("");
  // const [enviado, setEnviado] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (rating === 0) return alert("Por favor selecciona una calificación.");
  //   console.log({
  //     medico: `${cita.nombre_medico} ${cita.apellido_medico}`,
  //     calificacion: rating,
  //     comentario,
  //   });
  //   setEnviado(true);
  //   setTimeout(() => {
  //     setShowModal(false);
  //     setEnviado(false);
  //     setRating(0);
  //     setComentario("");
  //   }, 1500);
  // };

  return (
    <div className="bg-white rounded-2xl border border-gray-400 shadow-md overflow-hidden h-full relative">
      <div className="p-6 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">
              {cita.especialidad_medico || "Cita médica"}
            </h3>
            <p className="text-sm text-gray-500">{cita.fecha}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="flex gap-6 flex-1">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Paciente</h4>
              <p className="text-black">
                {cita.nombre_paciente} {cita.apellido_paciente}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Médico</h4>
              <p className="text-black">
                {cita.nombre_medico} {cita.apellido_medico}
              </p>
              <p className="text-gray-500 text-sm">{cita.especialidad_medico}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Estado</h4>
              <span
                className={`py-1 rounded-lg text-sm ${
                  cita.estado_cita === "PROGRAMADA" ||
                  cita.estado_cita === "COMPLETADA"
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {cita.estado_cita}
              </span>
            </div>

            {/* ✅ BOTÓN VERDE DE CALIFICAR MÉDICO
            {cita.estado_cita === "COMPLETADA" && (
              <button
                onClick={() => setShowModal(true)}
                title="Calificar médico"
                className="mt-3 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-lg shadow transition-all"
              >
                <FaStar className="text-white text-lg" />
                Calificar médico
              </button>
            )} */}
          </div>

          <div className="w-1/2 pl-4">
            {mode === "por" ? (
              <div className="h-full border rounded-lg overflow-hidden">
                <iframe
                  title="mapa"
                  src={mapsSrc}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-full overflow-auto">
                <h4 className="text-sm font-semibold mb-2">Notas del médico</h4>
                <p className="text-gray-700 mb-4">
                  {cita.notas || "Sin notas registradas"}
                </p>
                <button
                  onClick={() => navigate("/paciente/indicaciones")}
                  className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow"
                >
                  Ver ind. médicas
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        {mode === "por" && (
          <div className="mt-6 flex gap-3 justify-end">
            {/* <button
              onClick={() => onModificar?.(cita)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow"
            >
              <img src={editarIcon} alt="editar" className="w-6" />
            </button> */}
            <button
              onClick={() => onCancelar?.(cita)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow"
            >
              <img src={cancelarIcon} alt="cancelar" className="w-6" />
            </button>
          </div>
        )}
      </div>

      {/* MODAL DE CALIFICACIÓN
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-center mb-2 text-gray-800">
              Calificar al médico
            </h2>
            <p className="text-center text-gray-500 mb-4">
              {cita.nombre_medico} {cita.apellido_medico}
            </p>

            {!enviado ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-3"
              >
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={32}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className={`cursor-pointer ${
                        star <= (hover || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      } transition-colors duration-150`}
                    />
                  ))}
                </div>

                <textarea
                  placeholder="Escribe un comentario (opcional)"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                  rows="3"
                />

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
                >
                  Enviar calificación
                </button>
              </form>
            ) : (
              <p className="text-green-600 text-center font-semibold mt-4">
                ¡Gracias por tu calificación!
              </p>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}
