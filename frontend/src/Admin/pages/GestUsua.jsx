import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import UsuaTable from "../components/GestUsuarios/UsuaTable";
import UsuaDetails from "../components/GestUsuarios/UsuaDetails";
import { getUsuarios } from "../../services/usuarios"; // importamos la función

export default function GestUsua() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Gest. de Usuarios" },
  ];

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [tab, setTab] = useState("pacientes");
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔹 Cargar usuarios desde backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const pacientesData = await getUsuarios(1); // rol 1 = Pacientes
        const medicosData = await getUsuarios(2);   // rol 2 = Médicos
        setPacientes(pacientesData);
        setMedicos(medicosData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  // 🔹 Evita scroll en fondo
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-6">Gestión de Usuarios</h2>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={() => { setTab("pacientes"); setSelectedUser(null); }}
            className={`px-4 py-2 rounded-md font-medium ${
              tab === "pacientes"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Pacientes
          </button>
          <button
            onClick={() => { setTab("medicos"); setSelectedUser(null); }}
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
