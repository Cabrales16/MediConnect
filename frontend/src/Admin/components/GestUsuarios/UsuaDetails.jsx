import React, { useState } from "react";
import {
  cambiarRolUsuario,
  cambiarDatosUsuario,
  cambiarEstadoUsuario,
} from "../../../services/usuarios";
import ModificarDatosModal from "../UI/ModificarDatosModal";
import CambiarRolModal from "../UI/CambiarRolModal";
import DeshabilitarCuentaModal from "../UI/DeshabilitarCuentaModal";
import AgendarCitaModal from "../UI/AgendarCitaModal";
import ModificarCitaModal from "../UI/ModificarCitaModal";
import HistorialModal from "../UI/HistorialModal";
import TratamientosModal from "../UI/TratamientosModal";

// Iconos
import agendarIcon from "./GestUsuaIcons/agendarIcon.png";
import editarIcon from "./GestUsuaIcons/editarIcon.png";
import cambiarRolIcon from "./GestUsuaIcons/cambiarRolIcon.png";
// import verHistorialIcon from "./GestUsuaIcons/verHistorialIcon.png";
import verTratamientosIcon from "./GestUsuaIcons/verTratamientosIcon.png";
import deshabilitarIcon from "./GestUsuaIcons/deshabilitarIcon.png";

export default function UsuaDetails({ user, onClose, onRefresh }) {
  const [openModal, setOpenModal] = useState(null);

  const handleConfirm = async (data) => {
    try {
      if (openModal === "cambiarRol") {
        await cambiarRolUsuario(user.id_usuario, { id_rol: data.nuevoRol });

      } else if (openModal === "modificarDatos") {
        await cambiarDatosUsuario(user.id_usuario, data);

      } else if (openModal === "deshabilitar") {
        await cambiarEstadoUsuario(user.id_usuario, "inactivo");

      }

      setOpenModal(null);
      onRefresh && onRefresh();
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Detalles del Usuario</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Info usuario */}
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Apellidos:</strong> {user.apellido}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Género:</strong> {user.genero}</p>
        <p><strong>Dirección:</strong> {user.direccion}</p>

        {user.id_rol === 2 && (
          <>
            <p><strong>Especialidad:</strong> {user.especialidad}</p>
            <p><strong>Calificación:</strong> {user.calificacion}</p>
          </>
        )}
        <p><strong>Rol ID:</strong> {user.id_rol}</p>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex flex-wrap gap-3">
        {user.id_rol === 3 && (
          <button
            onClick={() => setOpenModal("agendar")}
            className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            <img src={agendarIcon} alt="Agendar cita" className="w-6" />
          </button>
        )}

        <button
          onClick={() => setOpenModal("modificarDatos")}
          className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          <img src={editarIcon} alt="Editar datos" className="w-6" />
        </button>

        <button
          onClick={() => setOpenModal("cambiarRol")}
          className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          <img src={cambiarRolIcon} alt="Cambiar rol" className="w-6" />
        </button>

        {/* <button
          onClick={() => setOpenModal("historial")}
          className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          <img src={verHistorialIcon} alt="Ver historial" className="w-6" />
        </button> */}

        {user.id_rol === 3 && (
          <button
            onClick={() => setOpenModal("tratamientos")}
            className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            <img src={verTratamientosIcon} alt="Ver tratamientos" className="w-6" />
          </button>
        )}

        <button
          onClick={() => setOpenModal("deshabilitar")}
          className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <img src={deshabilitarIcon} alt="Deshabilitar cuenta" className="w-6" />
        </button>
      </div>

      {/* Modales */}
      <AgendarCitaModal
        isOpen={openModal === "agendar"}
        onClose={() => setOpenModal(null)}
        onConfirm={handleConfirm}
      />

      <ModificarCitaModal
        isOpen={openModal === "modificarCita"}
        onClose={() => setOpenModal(null)}
        cita={{ fecha: "2025-09-10", hora: "09:00", motivo: "Control general" }}
        onConfirm={handleConfirm}
      />

      <ModificarDatosModal
        isOpen={openModal === "modificarDatos"}
        onClose={() => setOpenModal(null)}
        onConfirm={handleConfirm}
        user={user}
      />

      <CambiarRolModal
        isOpen={openModal === "cambiarRol"}
        onClose={() => setOpenModal(null)}
        onConfirm={handleConfirm}
        user={user}
      />

      {/* <HistorialModal
        isOpen={openModal === "historial"}
        onClose={() => setOpenModal(null)}
        historial={[{ fecha: "2025-09-01", detalle: "Consulta médica" }]}
      /> */}

      <TratamientosModal
        isOpen={openModal === "tratamientos"}
        onClose={() => setOpenModal(null)}
        tratamientos={[
          { tipo: "Medicamento", nombre: "Ibuprofeno", dosis: "500mg" },
        ]}
      />

      <DeshabilitarCuentaModal
        isOpen={openModal === "deshabilitar"}
        onClose={() => setOpenModal(null)}
        onConfirm={handleConfirm}
        user={user}
      />
    </div>
  );
}