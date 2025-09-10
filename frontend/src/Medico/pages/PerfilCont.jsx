import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import editarIcon from "../components/Perfil/PerfilIcons/editarIcon.png";
import { getPerfil } from "../../services/perfilService";

export default function PerfilCont() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Evitar scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const id_usuario = localStorage.getItem("id_usuario");
        if (!id_usuario) {
          console.error("No hay id_usuario en localStorage");
          return;
        }

        const perfil = await getPerfil(id_usuario);
        setUser(perfil);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Perfil" },
  ];

  if (loading) return <p className="p-8">Cargando perfil...</p>;
  if (!user) return <p className="p-8">No se pudo cargar el perfil.</p>;

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
                src={user.avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.nombre}</h3>
                <p className="text-sm text-gray-600">{user.correo}</p>
                <p className="text-xs text-gray-500">
                  Se unió desde {user.fecha_registro || "N/A"}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/medico/perfil/editar")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <img src={editarIcon} alt="" className="w-5" />
            </button>
          </div>

          {/* Información de contacto */}
          <h4 className="text-base font-semibold mb-3">Información de contacto</h4>

          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Tipo de documento: </span>
              {user.tipo_documento || "N/A"}
            </p>
            <p>
              <span className="font-medium">Número de documento: </span>
              {user.num_documento || "N/A"}
            </p>
            <p>
              <span className="font-medium">Teléfono: </span>
              {user.telefono || "N/A"}
            </p>
            <p>
              <span className="font-medium">Dirección: </span>
              {user.direccion || "N/A"}
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
