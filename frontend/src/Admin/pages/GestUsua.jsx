import React, { useState, useEffect, useMemo } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import UsuaTable from "../components/GestUsuarios/UsuaTable";
import UsuaDetails from "../components/GestUsuarios/UsuaDetails";
import FiltroUsuarios from "../components/GestUsuarios/FiltroUsuarios";
import BarraBusqueda from "../components/GestUsuarios/BarraBusqueda";
import Paginacion from "../components/GestUsuarios/Paginacion";
import { getUsuarios } from "../../services/usuarios"; 

export default function GestUsua() {
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

  // 🔹 Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 9;

  // 🔹 Evitar scroll del navegador
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 🔹 Cargar usuarios reales desde el backend
  const fetchUsuarios = async () => {
    try {
      const medicosData = await getUsuarios(2); // rol médico
      const pacientesData = await getUsuarios(1); // rol paciente
      setMedicos(medicosData);
      setPacientes(pacientesData);
      setUsuarios([...medicosData, ...pacientesData]);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // 🔹 Filtro y búsqueda combinados
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

  // 🔹 Paginación
  const totalItems = listaFiltrada.length;
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
  const indexInicio = (paginaActual - 1) * itemsPorPagina;
  const indexFin = indexInicio + itemsPorPagina;
  const datosPaginados = listaFiltrada.slice(indexInicio, indexFin);

  // Resetear página al cambiar filtro o búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [filtro, busqueda]);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-6">Gestión de Usuarios</h2>

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
                data={datosPaginados}
                onViewDetails={setSelectedUser}
              />

              <Paginacion
                totalItems={totalItems}
                itemsPorPagina={itemsPorPagina}
                paginaActual={paginaActual}
                onPageChange={(num) => {
                  if (num >= 1 && num <= totalPaginas) setPaginaActual(num);
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            {selectedUser ? (
              <UsuaDetails
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onRefresh={fetchUsuarios} // 🔹 Permite refrescar usuarios tras cambios
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