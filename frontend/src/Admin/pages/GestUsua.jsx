import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import UsuaTable from "../components/GestUsuarios/UsuaTable";
import UsuaDetails from "../components/GestUsuarios/UsuaDetails";
import FiltroUsuarios from "../components/GestUsuarios/FiltroUsuarios";
import BarraBusqueda from "../components/GestUsuarios/BarraBusqueda";

export default function GestUsua() {
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Gest. de Usuarios" },
  ];

  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

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

    setPacientes(pacientesMock);
    setMedicos(medicosMock);
    setUsuarios([...pacientesMock, ...medicosMock]);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedUser ? "hidden" : "";
  }, [selectedUser]);

  const listaFiltrada = useMemo(() => {
    const base =
      filtro === "pacientes"
        ? pacientes
        : filtro === "medicos"
        ? medicos
        : usuarios;

    if (!busqueda.trim()) return base;

    return base.filter((u) =>
      `${u.nombre} ${u.apellido} ${u.correo}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [usuarios, pacientes, medicos, filtro, busqueda]);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Gestión de Usuarios</h2>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/gestion-usuarios")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Gestión de Usuarios
            </button>
            <button
              onClick={() => navigate("/admin/gestion-opciones")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Gestión de Opciones
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <FiltroUsuarios filtro={filtro} setFiltro={setFiltro} />
          <BarraBusqueda valor={busqueda} onChange={setBusqueda} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-4">
              <UsuaTable
                mode={filtro}
                pacientes={pacientes}
                medicos={medicos}
                usuarios={usuarios}
                data={listaFiltrada}
                onViewDetails={setSelectedUser}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            {selectedUser ? (
              <UsuaDetails
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-400 flex items-center justify-center text-gray-400 p-6">
                Selecciona "Ver más" en un usuario para ver más información.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}