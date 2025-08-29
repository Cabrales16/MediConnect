import React from "react";
import configIcon from "./NavbarIcons/configIcon.png";

export default function SettingsButton() {
  return (
    <a
      href="/settings"
      className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition"
      aria-label="Configuración"
    >
      <img src={configIcon} alt="Configuración" className="w-6 h-6" />
    </a>
  );
}
