import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import UsuaTable from "../components//GestUsuarios/UsuaTable";
import UsuaDetails from "../components/GestUsuarios/UsuaDetails";

export default function GestUsua() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Gest. de Usuarios" },
  ];

  // Datos de usuarios
  const [pacientes] = useState([
    {
      id: 1,
      nombre: "Carlos",
      apellido: "Pérez Gomez",
      tipoDoc: "CC",
      numDoc: "123456789",
      correo: "carlos@example.com",
      telefono: "3001234567",
      genero: "Masculino",
      direccion: "Calle 123, Bogotá",
      nacimiento: "1990-05-20",
      rol: "Paciente",
    },
  ]);

  const [medicos] = useState([
    {
      id: 101,
      nombre: "Ana",
      apellido: "García",
      tipoDoc: "CC",
      numDoc: "987654321",
      correo: "ana.garcia@hospital.com",
      telefono: "3119876543",
      genero: "Femenino",
      direccion: "Av. Siempre Viva 45",
      nacimiento: "1985-10-12",
      especialidad: "Cardiología",
      calificacion: "4.8",
      rol: "Médico",
    },
  ]);

  const [tab, setTab] = useState("pacientes"); // "pacientes" | "medicos"
  const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
      // Block scroll
      document.body.style.overflow = "hidden";
      return () => {
        // Unblock scroll on cleanup
        document.body.style.overflow = "";
      };
    }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="pb-30 overflow-y-auto sm:overflow-y-visible h-[100vh]">
        <h2 className="text-2xl font-semibold mb-6">Gestión de Usuarios</h2>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={() => {
              setTab("pacientes");
              setSelectedUser(null);
            }}
            className={`px-4 py-2 rounded-md font-medium ${
              tab === "pacientes"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Pacientes
          </button>
          <button
            onClick={() => {
              setTab("medicos");
              setSelectedUser(null);
            }}
            className={`px-4 py-2 rounded-md font-medium ${
              tab === "medicos"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Médicos
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabla */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-4">
              <UsuaTable
                mode={tab}
                pacientes={pacientes}
                medicos={medicos}
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
