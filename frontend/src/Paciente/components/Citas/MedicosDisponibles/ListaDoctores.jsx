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
  const [initialSlotsProcessed, setInitialSlotsProcessed] = useState(false);

  const { slots, fecha, tipoCita, ubicacion, hora } = location.state || {};
  const memoSlots = useMemo(() => slots, [slots]);

  const transformarSlots = useMemo(() => {

    const formatearHora = (hora) => {
      if (!hora) return "";
      const [h, m] = hora.split(":");
      let horas = parseInt(h, 10);
      const minutos = m || "00";
      const ampm = horas >= 12 ? "PM" : "AM";
      horas = horas % 12 || 12;
      return `${horas}:${minutos.padStart(2, "0")} ${ampm}`;
    };
  
    return (slotsData) => {
      if (!Array.isArray(slotsData)) return [];
    
 
      if (slotsData.length === 1) {
        const slot = slotsData[0];
        const horarios = (slot.slots_disponibles || []).map(formatearHora);
        return [
          {
            id: slot.medico || slot.id || 1,
            name: slot.nombre || "Médico",
            specialty: slot.especialidad || "Especialidad",
            image: slot.foto_medico || "/default-doctor.jpg",
            hospital: slot.hospital || "Hospital",
            estudios: slot.estudios || "Estudios",
            calificacion: slot.calificacion || 3.5,
            slots_disponibles: horarios,
          },
        ];
      }
    
      const medicosMap = new Map();
      slotsData.forEach((slot) => {
        const medicoId = slot.medico || slot.id;
        if (!medicosMap.has(medicoId)) {
          medicosMap.set(medicoId, {
            id: medicoId,
            name: slot.nombre || "Médico",
            specialty: slot.especialidad || "Especialidad",
            image: slot.foto_medico || "/default-doctor.jpg",
            hospital: slot.hospital || "Hospital",
            estudios: slot.estudios || "Estudios",
            calificacion: slot.calificacion || 3.5,
            slots_disponibles: [],
          });
        }
      
        if (slot.hora_inicio || slot.hora) {
          medicosMap
            .get(medicoId)
            .slots_disponibles.push(formatearHora(slot.hora_inicio || slot.hora));
        } else if (slot.slots_disponibles?.length > 0) {
          medicosMap
            .get(medicoId)
            .slots_disponibles.push(
              ...slot.slots_disponibles.map(formatearHora)
            );
        }
      });
    
      return Array.from(medicosMap.values());
    };
  }, []);




  useEffect(() => {
  console.log("📦 Datos de slots recibidos:", memoSlots); // 👈 Agrega esto aquí

  if (initialSlotsProcessed) {
    setLoading(false);
    return;
  }


    if (Array.isArray(memoSlots) && memoSlots.length > 0) {
      const medicosFormateados = transformarSlots(memoSlots);
      if (medicosFormateados.length > 0) {
        setDoctoresDisponibles(medicosFormateados);
        setInitialSlotsProcessed(true);
        setLoading(false);
      } else {
        setError("No se encontraron médicos disponibles");
        setLoading(false);
      }
      return;
    }

    if (!memoSlots) {
      const timer = setTimeout(() => {
        if (!initialSlotsProcessed) {
          setError("No se encontraron médicos disponibles");
          setLoading(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (Array.isArray(memoSlots) && memoSlots.length === 0) {
      setError("No se encontraron médicos disponibles");
      setLoading(false);
    }
    }, [memoSlots, transformarSlots, initialSlotsProcessed]);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalDoctorOpen(true);
  };

  const handleAgendarCita = () => {
    setModalDoctorOpen(false);
    setModalExitoOpen(true);
  };

  const handleVolver = () => {
    navigate("/paciente/citas", {
      replace: false,
      state: { selectedDate: fecha, tipoCita, ubicacion, hora },
    });
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">{error}</p>
          <button
            onClick={handleVolver}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Buscar nuevamente
          </button>
        </div>
      );
    }

    return (
      <div className="divide-y divide-gray-200">
        {doctoresDisponibles.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center gap-4 py-4"
          >
            {/* Imagen */}
            <div className="flex justify-center sm:justify-start">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
                onError={(e) => (e.target.src = "/default-doctor.jpg")}
              />
            </div>
        
            {/* Info del doctor */}
            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg">{doctor.name}</p>
              <p className="text-green-600 text-sm">{doctor.specialty}</p>
              {doctor.hospital && (
                <p className="text-gray-500 text-xs">{doctor.hospital}</p>
              )}
    
              {/* ⭐ Calificación */}
              <div className="flex justify-center sm:justify-start items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.round(doctor.calificacion)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  {doctor.calificacion.toFixed(1)}
                </span>
              </div>
              
              {/* 🕒 Horarios */}
              {doctor.slots_disponibles && doctor.slots_disponibles.length > 0 ? (
                <p className="text-blue-600 text-xs mt-1">
                  Horarios disponibles: {doctor.slots_disponibles.join(", ")}
                </p>
              ) : (
                <p className="text-gray-400 text-xs mt-1">
                  No hay horarios disponibles
                </p>
              )}
            </div>
            
            {/* Botón Seleccionar */}
            <div className="flex justify-center sm:justify-end">
              <button
                onClick={() => handleSelectDoctor(doctor)}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition w-full sm:w-auto"
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    );

  };

  if (loading) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex h-[calc(100vh-9rem)] items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-gray-600">Cargando médicos...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex h-[calc(100vh-9rem)]">
        {/* Columna izquierda: lista de doctores */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Médicos disponibles</h2>
            <button
              onClick={handleVolver}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Volver
            </button>
          </div>
          {renderContent()}
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
      </div>
    </>
  );
}