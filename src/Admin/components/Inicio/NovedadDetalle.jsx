import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../UI/Breadcrumb";
import { novedades as novedadesData } from "../../../data/novedades";

export default function NovedadDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [novedad, setNovedad] = useState(
    () => novedadesData.find((n) => n.id === parseInt(id)) || null
  );

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    titulo: novedad?.titulo || "",
    img: novedad?.img || "",
    detalle: novedad?.detalle || "",
  });

  if (!novedad) {
    return (
      <div className="p-8">
        <p>No se encontró la novedad solicitada.</p>
        <button
          onClick={() => navigate("/inicio")}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-sm transition-all"
        >
          Volver
        </button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Novedades", href: "/inicio" },
    { label: novedad.titulo },
  ];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setNovedad((prev) => ({
      ...prev,
      titulo: editForm.titulo,
      img: editForm.img,
      detalle: editForm.detalle,
    }));
    setEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    alert(`Novedad "${novedad.titulo}" eliminada.`);
    navigate("/inicio");
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-bold">{novedad.titulo}</h2>

        <img
          src={novedad.img}
          alt={novedad.titulo}
          className="w-full h-64 object-cover rounded-xl mb-6 border border-gray-400 shadow-sm"
        />

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {novedad.detalle}
        </p>

        <button
          onClick={() => navigate("/inicio")}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm transition-all mt-4"
        >
          Volver
        </button>
      </div>
    </>
  );
}
