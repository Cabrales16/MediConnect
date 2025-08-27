import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

import inicioIcon from "./MenuIcons/inicioIcon.png";
import agendamientoIcon from "./MenuIcons/agendamientoIcon.png";
import planillaIcon from "./MenuIcons/planillaIcon.png";
import familiaresIcon from "./MenuIcons/familiaresIcon.png";
import indicacionesIcon from "./MenuIcons/indicacionesIcon.png";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Inicio", path: "/inicio", icon: inicioIcon },
    { name: "Citas", path: "/citas", icon: agendamientoIcon },
    { name: "Planilla", path: "/planilla", icon: planillaIcon },
    { name: "Familiares", path: "/familiares", icon: familiaresIcon },
    { name: "Ind. médicas", path: "/indicaciones", icon: indicacionesIcon },
  ];

  return (
    <div
      className={`h-screen bg-white border-r border-gray-300 shadow-sm flex flex-col ${
        expanded ? "w-48" : "w-16"
      }`}
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
    </div>
  );
}
