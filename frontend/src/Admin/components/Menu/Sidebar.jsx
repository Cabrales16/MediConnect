import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import { getPerfil } from "../../../services/perfilService";

// Iconos
import gestNovedadesIcon from "./MenuIcons/gestNovedadesIcon.png";
import gestUsuariosIcon from "./MenuIcons/gestUsuariosIcon.png";
import gestOpcionesIcon from "./MenuIcons/gestOpcionesIcon.png";
import logo from "./MenuIcons/logo.png";

export default function Sidebar({ open = false, onClose = () => {} }) {
  const [expanded, setExpanded] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const location = useLocation();
  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfil(id_usuario);
        setPerfil(data);
      } catch (error) {
        console.error("❌ Error cargando perfil:", error);
      }
    };
    if (id_usuario) fetchPerfil();
  }, [id_usuario]);

  const getInitials = (nombre, apellido) => {
    if (!nombre && !apellido) return "A";
    return `${nombre?.charAt(0).toUpperCase() || ""}${apellido
      ?.charAt(0)
      .toUpperCase() || ""}`;
  };

  const menuItems = [
    { name: "Gest. de Novedades", path: "/admin/inicio", icon: gestNovedadesIcon },
    { name: "Gest. de Usuarios", path: "/admin/gestion-usuarios", icon: gestUsuariosIcon },
    { name: "Gest. de Opciones", path: "/admin/opciones-usuario", icon: gestOpcionesIcon },
  ];

  return (
    <>
      {/* 🔹 Sidebar móvil */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        <aside
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header verde */}
            <div className="p-4 border-b bg-green-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-8 h-8" />
                <span className="font-semibold">MediConnect</span>
              </div>
              <button onClick={onClose} className="p-1 rounded hover:bg-white/20">
                ✕
              </button>
            </div>

            {/* Perfil */}
            <div className="flex items-center gap-3 p-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                {perfil ? getInitials(perfil.nombre, perfil.apellido) : "A"}
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {perfil ? perfil.nombre : "Administrador"}
                </p>
                <p className="text-sm text-gray-500">{perfil?.rol || "Administrador"}</p>
              </div>
            </div>

            {/* Navegación */}
            <nav className="flex-1 overflow-auto">
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <MenuItem
                    name={item.name}
                    icon={item.icon}
                    expanded={true}
                    active={location.pathname === item.path}
                  />
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* 🔹 Sidebar escritorio */}
      <aside
        className={`hidden md:flex md:flex-col md:h-screen bg-white border-r border-gray-300 shadow-sm transition-all duration-200 ${
          expanded ? "w-48" : "w-16"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Header con color verde */}
        <div className="flex items-center gap-3 p-4 border-b bg-green-500 text-white transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center font-bold">
            {perfil ? getInitials(perfil.nombre, perfil.apellido) : "A"}
          </div>
          {expanded && (
            <div>
              <p className="font-medium">{perfil?.nombre || "Administrador"}</p>
              <p className="text-sm text-white/80">{perfil?.rol || "Administrador"}</p>
            </div>
          )}
        </div>

        {/* Menú */}
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <MenuItem
              name={item.name}
              icon={item.icon}
              expanded={expanded}
              active={location.pathname === item.path}
            />
          </Link>
        ))}
      </aside>
    </>
  );
}