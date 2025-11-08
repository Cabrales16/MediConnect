import React, { useState, useEffect, useMemo } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import UsuaTable from "../components/GestUsuarios/UsuaTable";
import UsuaDetails from "../components/GestUsuarios/UsuaDetails";
import FiltroUsuarios from "../components/GestUsuarios/FiltroUsuarios";
import BarraBusqueda from "../components/GestUsuarios/BarraBusqueda";
import Paginacion from "../components/GestUsuarios/Paginacion";

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
  const itemsPorPagina = 5;

  // 🔹 Evitar scroll del navegador
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const pacientesMock = [
      { id_usuario: 1, nombre: "Laura", apellido: "Gómez", correo: "laura.gomez@example.com", telefono: "3001234567", direccion: "Calle 10 #5-20", genero: "Femenino", fecha_registro: "2025-03-10", id_rol: 3 },
      { id_usuario: 2, nombre: "Carlos", apellido: "Martínez", correo: "carlos.mtz@example.com", telefono: "3107654321", direccion: "Carrera 45 #12-50", genero: "Masculino", fecha_registro: "2025-04-22", id_rol: 3 },
      { id_usuario: 5, nombre: "Valentina", apellido: "Rodríguez", correo: "valentina.rod@example.com", telefono: "3201112233", direccion: "Calle 21 #34-11", genero: "Femenino", fecha_registro: "2025-05-03", id_rol: 3 },
      { id_usuario: 6, nombre: "David", apellido: "Pérez", correo: "david.perez@example.com", telefono: "3105558899", direccion: "Carrera 8 #10-24", genero: "Masculino", fecha_registro: "2025-06-12", id_rol: 3 },
      { id_usuario: 7, nombre: "Sofía", apellido: "Morales", correo: "sofia.morales@example.com", telefono: "3019988776", direccion: "Av. 68 #72-30", genero: "Femenino", fecha_registro: "2025-07-02", id_rol: 3 },
      { id_usuario: 8, nombre: "Andrés", apellido: "Torres", correo: "andres.torres@example.com", telefono: "3004445566", direccion: "Calle 40 #15-80", genero: "Masculino", fecha_registro: "2025-03-28", id_rol: 3 },
      { id_usuario: 9, nombre: "Daniela", apellido: "Ramírez", correo: "daniela.ramirez@example.com", telefono: "3112233445", direccion: "Calle 9 #22-15", genero: "Femenino", fecha_registro: "2025-04-05", id_rol: 3 },
      { id_usuario: 10, nombre: "Felipe", apellido: "González", correo: "felipe.gonzalez@example.com", telefono: "3007788990", direccion: "Carrera 13 #45-25", genero: "Masculino", fecha_registro: "2025-05-22", id_rol: 3 },
      { id_usuario: 11, nombre: "Camila", apellido: "López", correo: "camila.lopez@example.com", telefono: "3224455667", direccion: "Calle 33 #40-09", genero: "Femenino", fecha_registro: "2025-06-15", id_rol: 3 },
      { id_usuario: 12, nombre: "Santiago", apellido: "García", correo: "santiago.garcia@example.com", telefono: "3013344556", direccion: "Av. Siempre Viva #742", genero: "Masculino", fecha_registro: "2025-07-10", id_rol: 3 },
      { id_usuario: 13, nombre: "Natalia", apellido: "Ruiz", correo: "natalia.ruiz@example.com", telefono: "3115566778", direccion: "Carrera 12 #18-44", genero: "Femenino", fecha_registro: "2025-08-03", id_rol: 3 },
    ];
  
    const medicosMock = [
      { id_usuario: 3, nombre: "Andrés", apellido: "Cabrales", correo: "andres.cabrales@example.com", telefono: "3206547890", direccion: "Av. Principal #33-10", genero: "Masculino", especialidad: "Medicina Interna", calificacion: 4.8, fecha_registro: "2025-01-05", id_rol: 2 },
      { id_usuario: 4, nombre: "Lucía", apellido: "Hernández", correo: "lucia.hdz@example.com", telefono: "3128765432", direccion: "Calle 8 #14-22", genero: "Femenino", especialidad: "Pediatría", calificacion: 4.9, fecha_registro: "2025-02-19", id_rol: 2 },
      { id_usuario: 14, nombre: "Pedro", apellido: "Jiménez", correo: "pedro.jimenez@example.com", telefono: "3001122445", direccion: "Carrera 70 #101-30", genero: "Masculino", especialidad: "Cardiología", calificacion: 4.6, fecha_registro: "2025-02-15", id_rol: 2 },
      { id_usuario: 15, nombre: "Mariana", apellido: "Rojas", correo: "mariana.rojas@example.com", telefono: "3205566778", direccion: "Calle 99 #20-45", genero: "Femenino", especialidad: "Neurología", calificacion: 4.9, fecha_registro: "2025-03-01", id_rol: 2 },
      { id_usuario: 16, nombre: "Jorge", apellido: "Patiño", correo: "jorge.patino@example.com", telefono: "3117788990", direccion: "Av. Suba #102-11", genero: "Masculino", especialidad: "Dermatología", calificacion: 4.7, fecha_registro: "2025-03-12", id_rol: 2 },
      { id_usuario: 17, nombre: "Laura", apellido: "Castillo", correo: "laura.castillo@example.com", telefono: "3103344557", direccion: "Calle 53 #12-33", genero: "Femenino", especialidad: "Oftalmología", calificacion: 4.5, fecha_registro: "2025-04-02", id_rol: 2 },
      { id_usuario: 18, nombre: "Ricardo", apellido: "Ramírez", correo: "ricardo.ramirez@example.com", telefono: "3006677889", direccion: "Carrera 30 #20-12", genero: "Masculino", especialidad: "Traumatología", calificacion: 4.8, fecha_registro: "2025-04-18", id_rol: 2 },
      { id_usuario: 19, nombre: "Catalina", apellido: "Gómez", correo: "catalina.gomez@example.com", telefono: "3128899001", direccion: "Calle 120 #45-08", genero: "Femenino", especialidad: "Psiquiatría", calificacion: 4.9, fecha_registro: "2025-05-22", id_rol: 2 },
      { id_usuario: 20, nombre: "Fernando", apellido: "Serrano", correo: "fernando.serrano@example.com", telefono: "3012233445", direccion: "Av. 26 #10-50", genero: "Masculino", especialidad: "Medicina General", calificacion: 4.4, fecha_registro: "2025-06-04", id_rol: 2 },
      { id_usuario: 21, nombre: "Isabela", apellido: "Martínez", correo: "isabela.martinez@example.com", telefono: "3205566779", direccion: "Carrera 11 #89-30", genero: "Femenino", especialidad: "Ginecología", calificacion: 5.0, fecha_registro: "2025-07-08", id_rol: 2 },
      { id_usuario: 22, nombre: "Camilo", apellido: "Fernández", correo: "camilo.fernandez@example.com", telefono: "3129988771", direccion: "Calle 100 #25-40", genero: "Masculino", especialidad: "Urología", calificacion: 4.6, fecha_registro: "2025-07-30", id_rol: 2 },
    ];
  
    setPacientes(pacientesMock);
    setMedicos(medicosMock);
    setUsuarios([...pacientesMock, ...medicosMock]);
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