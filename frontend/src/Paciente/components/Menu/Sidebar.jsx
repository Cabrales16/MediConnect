import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

import inicioIcon from "./MenuIcons/inicioIcon.png";
import agendamientoIcon from "./MenuIcons/agendamientoIcon.png";
import planillaIcon from "./MenuIcons/planillaIcon.png";
import familiaresIcon from "./MenuIcons/familiaresIcon.png";
import indicacionesIcon from "./MenuIcons/indicacionesIcon.png";

export default function Sidebar({ open = false, onClose = () => {} }) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  // cerrar el drawer si se cambia de ruta (útil en móvil)
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const menuItems = [
    { name: "Inicio", path: "/paciente/inicio", icon: inicioIcon },
    { name: "Citas", path: "/paciente/citas", icon: agendamientoIcon },
    { name: "Planilla", path: "/paciente/planilla", icon: planillaIcon },
    { name: "Familiares", path: "/paciente/familiares", icon: familiaresIcon },
    { name: "Ind. médicas", path: "/paciente/indicaciones", icon: indicacionesIcon },
  ];

  return (
    <>
      {/* ===== Mobile overlay drawer ===== */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Fondo semitransparente */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />

        <aside
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              {/* Puedes colocar logo/close */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={inicioIcon} alt="logo" className="w-8 h-8"/>
                  <span className="font-semibold">MediConnect</span>
                </div>
                <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">✕</button>
              </div>
            </div>

            <nav className="flex-1 overflow-auto">
              {menuItems.map(item => (
                <Link key={item.name} to={item.path}>
                  <MenuItem
                    name={item.name}
                    icon={item.icon}
                    expanded={true}
                    active={location.pathname.includes(item.path)}
                  />
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* ===== Desktop sidebar (md+) ===== */}
      <aside
        className={`hidden md:flex md:flex-col md:h-screen bg-white border-r border-gray-300 shadow-sm ${expanded ? "w-48" : "w-16"}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
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
