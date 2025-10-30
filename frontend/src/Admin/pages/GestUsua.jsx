import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import UsuaTable from "../components/GestUsuarios/UsuaTable";
import UsuaDetails from "../components/GestUsuarios/UsuaDetails";
import FiltroUsuarios from "../components/GestUsuarios/FiltroUsuarios";

export default function GestUsua() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Gest. de Usuarios" },
  ];

  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔹 Simular datos locales (se actualizan todos a la vez)
  useEffect(() => {
    const pacientesMock = [
      {
        id_usuario: 1,
        nombre: "Laura",
        apellido: "Gómez",
        correo: "laura.gomez@example.com",
        telefono: "3001234567",
        direccion: "Calle 10 #5-20",
        genero: "Femenino",
        fecha_registro: "2025-03-10",
        id_rol: 3,
      },
      {
        id_usuario: 2,
        nombre: "Carlos",
        apellido: "Martínez",
        correo: "carlos.mtz@example.com",
        telefono: "3107654321",
        direccion: "Carrera 45 #12-50",
        genero: "Masculino",
        fecha_registro: "2025-04-22",
        id_rol: 3,
      },
    ];

    const medicosMock = [
      {
        id_usuario: 3,
        nombre: "Andrés",
        apellido: "Cabrales",
        correo: "andres.cabrales@example.com",
        telefono: "3206547890",
        direccion: "Av. Principal #33-10",
        genero: "Masculino",
        especialidad: "Medicina Interna",
        calificacion: 4.8,
        fecha_registro: "2025-01-05",
        id_rol: 2,
      },
      {
        id_usuario: 4,
        nombre: "Lucía",
        apellido: "Hernández",
        correo: "lucia.hdz@example.com",
        telefono: "3128765432",
        direccion: "Calle 8 #14-22",
        genero: "Femenino",
        especialidad: "Pediatría",
        calificacion: 4.9,
        fecha_registro: "2025-02-19",
        id_rol: 2,
      },
    ];

    // ✅ Actualizamos todo al mismo tiempo
    setPacientes(pacientesMock);
    setMedicos(medicosMock);
    setUsuarios([...pacientesMock, ...medicosMock]);
  }, []);

  // 🔹 Evita scroll en fondo
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 🔹 Obtener lista filtrada
  const obtenerListaFiltrada = () => {
    switch (filtro) {
      case "pacientes":
        return pacientes;
      case "medicos":
        return medicos;
      default:
        return usuarios;
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-6">Gestión de Usuarios</h2>

        {/* 🔹 Filtro de usuarios */}
        <FiltroUsuarios filtro={filtro} setFiltro={setFiltro} />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabla */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-4">
              <UsuaTable
                mode={filtro}
                pacientes={pacientes}
                medicos={medicos}
                usuarios={usuarios}
                data={obtenerListaFiltrada()}
                onViewDetails={(u) => setSelectedUser(u)}
              />
            </div>
          </div>

          {/* Detalles */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            {selectedUser ? (
              <UsuaDetails
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-400 flex items-center justify-center text-gray-400 p-6">
                Selecciona "Ver más" en un usuario para ver más información
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
