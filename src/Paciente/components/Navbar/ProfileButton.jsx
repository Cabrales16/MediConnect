import React, { useState } from "react";
import { Link } from "react-router-dom";
import perfilIcon from "../Navbar/NavbarIcons/perfilIcon.png"

export default function ProfileButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full flex items-center justify-center"
      >
        <span className="">
          <img src={perfilIcon} alt="perfil"/>
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 border border-gray-200">
          <Link
            to="/perfil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Ver perfil
          </Link>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
