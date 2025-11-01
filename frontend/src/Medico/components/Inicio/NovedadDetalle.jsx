import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../UI/Breadcrumb";
import { getInfoNovedad } from "../../../services/novedades";

export default function NovedadDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [novedad, setNovedad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovedad = async () => {
      try {
        const data = await getInfoNovedad(id);
        setNovedad(data);
      } catch (error) {
        console.error("Error al obtener la novedad:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedad();
  }, [id]);

  if (loading) {
    return <div className="p-8">Cargando detalle...</div>;
  }

  if (!novedad) {
    return (
      <div className="p-8">
        <p>No se encontró la novedad solicitada.</p>
        <button
          onClick={() => navigate("/paciente/inicio")}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-sm transition-all"
        >
          Volver
        </button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Inicio", href: "/medico/inicio" },
    { label: novedad.titulo },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-bold mb-4">{novedad.titulo}</h2>
        <img
          src={novedad.src}
          alt={novedad.titulo}
          className="w-full h-64 object-cover rounded-xl mb-6 border border-gray-400 shadow-sm"
        />
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {novedad.descripcion}
        </p>
        <button
          onClick={() => navigate("/medico/inicio")}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm transition-all mt-4"
        >
          Volver
        </button>
      </div>
    </>
  );
}
