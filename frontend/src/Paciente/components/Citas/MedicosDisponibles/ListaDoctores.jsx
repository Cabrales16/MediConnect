import { useState } from "react";
import doctors from "../../../../data/DatosDoctores.json";
import ModalDoctores from "./ModalDoctores";
import SucessModal from "./SucessModal";
import Breadcrumb from "../../UI/Breadcrumb";

export default function ListaDoctores() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Citas", href: "/citas" },
    { label: "Medicos" },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalDoctorOpen, setModalDoctorOpen] = useState(false);
  const [modalExitoOpen, setModalExitoOpen] = useState(false);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalDoctorOpen(true);
  };

  const handleAgendarCita = () => {
    setModalDoctorOpen(false);
    setModalExitoOpen(true);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Médicos disponibles</h2>

        <div className="divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="font-semibold">{doctor.name}</p>
                  <p className="text-green-600 text-sm">{doctor.specialty}</p>
                </div>
              </div>

              <button
                onClick={() => handleSelectDoctor(doctor)}
                className="px-4 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <ModalDoctores
          doctor={selectedDoctor}
          isOpen={modalDoctorOpen}
          onClose={() => setModalDoctorOpen(false)}
          onConfirm={handleAgendarCita}
        />
      )}

      <SucessModal
        open={modalExitoOpen}
        onClose={() => setModalExitoOpen(false)}
      />
    </>
  );
}
