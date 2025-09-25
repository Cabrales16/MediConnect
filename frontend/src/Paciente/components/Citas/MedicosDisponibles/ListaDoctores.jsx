import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalDoctores from "./ModalDoctores";
import SucessModal from "./SucessModal";
import Breadcrumb from "../../UI/Breadcrumb";

export default function ListaDoctores() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/paciente/inicio" },
    { label: "Citas", href: "/paciente/citas" },
    { label: "Médicos" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalDoctorOpen, setModalDoctorOpen] = useState(false);
  const [modalExitoOpen, setModalExitoOpen] = useState(false);
  const [doctoresDisponibles, setDoctoresDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the slots to prevent unnecessary re-processing
  const slots = useMemo(() => {
    return location.state?.slots || null;
  }, [location.state?.slots]);

  // Transformar los slots del backend al formato del componente
  const transformarSlots = useMemo(() => {
    return (slotsData) => {
      if (!Array.isArray(slotsData)) {
        console.log("Error: slots no es un array");
        return [];
      }

      // Si viene un solo slot, convertirlo en médico
      if (slotsData.length === 1) {
        const slot = slotsData[0];
        return [{
          id: slot.medico || slot.id || 1,
          name: slot.nombre || "Médico",
          specialty: slot.especialidad || "Especialidad",
          image: slot.foto_medico || '/default-doctor.jpg',
          hospital: slot.hospital || "Hospital",
          slots_disponibles: slot.slots_disponibles || []
        }];
      }

      // Agrupar múltiples slots por médico
      const medicosMap = new Map();
      
      slotsData.forEach(slot => {
        const medicoId = slot.medico || slot.id;
        if (!medicosMap.has(medicoId)) {
          medicosMap.set(medicoId, {
            id: medicoId,
            name: slot.nombre,
            specialty: slot.especialidad,
            image: slot.foto_medico || '/default-doctor.jpg',
            hospital: slot.hospital,
            slots_disponibles: []
          });
        }
        
        // Agregar horario disponible
        if (slot.hora_inicio || slot.hora) {
          medicosMap.get(medicoId).slots_disponibles.push(slot.hora_inicio || slot.hora);
        }
      });

      return Array.from(medicosMap.values());
    };
  }, []);

  // Process slots only when they change
  useEffect(() => {
    console.log("=== INICIANDO ListaDoctores ===");
    console.log("location.state:", location.state);
    console.log("slots:", slots);
    
    // Verificar si tenemos slots
    if (slots) {
      console.log("Procesando slots:", slots);
      try {
        const medicosFormateados = transformarSlots(slots);
        console.log("Médicos procesados:", medicosFormateados);
        setDoctoresDisponibles(medicosFormateados);
        setError(null);
      } catch (err) {
        console.error("Error procesando slots:", err);
        setError("Error procesando los datos");
        setDoctoresDisponibles([]);
      }
    } else {
      console.log("No hay slots disponibles");
      setError("No se encontraron médicos disponibles");
      setDoctoresDisponibles([]);
    }
    
    setLoading(false);
    console.log("=== FINALIZANDO SETUP ===");
  }, [slots, transformarSlots]); // Add proper dependencies

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalDoctorOpen(true);
  };

  const handleAgendarCita = () => {
    setModalDoctorOpen(false);
    setModalExitoOpen(true);
  };

  const handleVolver = () => {
    navigate("/paciente/citas", { replace: true });
  };

  if (loading) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="max-w-2xl mx-auto p-4">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Cargando médicos...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Médicos disponibles</h2>
          <button
            onClick={handleVolver}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Volver
          </button>
        </div>
        
        {error ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">{error}</p>
            <button
              onClick={handleVolver}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Buscar nuevamente
            </button>
          </div>
        ) : doctoresDisponibles.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {doctoresDisponibles.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                    onError={(e) => {
                      e.target.src = '/default-doctor.jpg';
                    }}
                  />
                  <div>
                    <p className="font-semibold">{doctor.name}</p>
                    <p className="text-green-600 text-sm">{doctor.specialty}</p>
                    {doctor.hospital && (
                      <p className="text-gray-500 text-xs">{doctor.hospital}</p>
                    )}
                    {doctor.slots_disponibles.length > 0 && (
                      <p className="text-blue-600 text-xs">
                        Horarios: {doctor.slots_disponibles.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleSelectDoctor(doctor)}
                  className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition"
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron médicos disponibles.</p>
            <button
              onClick={handleVolver}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Buscar nuevamente
            </button>
          </div>
        )}
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