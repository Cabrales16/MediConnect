import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPerfil } from "../../../services/perfilService";

export default function ProfileButtonPaciente() {
  const [open, setOpen] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/home");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-green-500 text-white font-bold flex items-center justify-center shadow hover:bg-green-600 transition"
        title="Perfil"
      >
        {perfil
          ? `${perfil.nombre?.charAt(0).toUpperCase() || ""}${
              perfil.apellido?.charAt(0).toUpperCase() || ""
            }`
          : "U"}
      </button>

      {/* 🔽 Menú desplegable */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 border border-gray-200 z-50">
          <Link
            to="/paciente/perfil"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Ver perfil
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}