// src/containers/PerfilCont.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import editarIcon from "../components/Perfil/PerfilIcons/editarIcon.png";

export default function PerfilCont() {
    // Esto es para eliminar el scroll de la página
    useEffect(() => {
      document.body.style.overflow = "hidden"; // Elimina scroll
      return () => {
        document.body.style.overflow = ""; // Limpieza si App se desmonta
      };
    }, []);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Perfil" },
  ];

  // Datos simulados del usuario
  const user = {
    nombre: "Paula López Tapiero",
    correo: "paulalopez@gmail.com",
    fechaUnion: "2025",
    tipoDocumento: "Cédula de Ciudadanía",
    numeroDocumento: "1234567890",
    telefono: "310 100 20 30",
    direccion: "92a27 Cl. 129a",
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-2">Perfil</h2>
        <p className="text-sm text-gray-600 mb-6">
          Gestiona tu información personal y preferencias.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 max-w-2xl">
          {/* Header con avatar + botón editar */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src="https://avatars.githubusercontent.com/u/1234567?v=4" // Puedes cambiarlo por la imagen real
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.nombre}</h3>
                <p className="text-sm text-gray-600">{user.correo}</p>
                <p className="text-xs text-gray-500">
                  Se unió desde el {user.fechaUnion}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/perfil/editar")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <img src={editarIcon} alt="" className="w-5"/>
            </button>
          </div>

          {/* Información de contacto */}
          <h4 className="text-base font-semibold mb-3">Información de contacto</h4>

          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Tipo de documento: </span>
              {user.tipoDocumento}
            </p>
            <p>
              <span className="font-medium">Número de documento: </span>
              {user.numeroDocumento}
            </p>
            <p>
              <span className="font-medium">Teléfono: </span>
              {user.telefono}
            </p>
            <p>
              <span className="font-medium">Dirección: </span>
              {user.direccion}
            </p>
            <p>
              <span className="font-medium">Correo electrónico: </span>
              {user.correo}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
