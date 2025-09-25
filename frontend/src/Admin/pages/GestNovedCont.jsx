import React, { useState, useEffect } from "react";
import { novedades as novedadesIniciales } from "../../data/novedades";
import Breadcrumb from "../components/UI/Breadcrumb";
import { toast } from "react-toastify";

import NovedadCard from "../components/UI/NovedadCard";
import AddNovedadModal from "../components/UI/AddNovedadModal";
import EditNovedadModal from "../components/UI/EditNovedadModal";
import DeleteNovedadModal from "../components/UI/DeleteNovedadModal";

//Iconos
import agregarIcon from "../components/GestNovedades/GestNovedadesImages/agregarIcon.png"

export default function GestNovedCont() {
  const breadcrumbItems = [{ label: "Gest. de Novedades", href: "/admin/inicio" }];

  const [novedades, setNovedades] = useState(novedadesIniciales);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    img: "",
  });

  // ---------- PAGINACIÓN ----------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(novedades.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNovedades = novedades.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // -------- Manejo de formularios --------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------- Añadir --------
  const handleAddNovedad = (e) => {
    e.preventDefault();
    const nuevaNovedad = {
      id: Date.now(),
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      img: formData.img || "https://via.placeholder.com/600x300",
    };
    setNovedades((prev) => [nuevaNovedad, ...prev]);
    setIsAddModalOpen(false);
    setFormData({ titulo: "", descripcion: "", img: "" });
    toast.success("Novedad añadida con éxito!");
  };

  // -------- Editar --------
  const handleOpenEditModal = (id) => {
    const novedad = novedades.find((n) => n.id === id);
    if (!novedad) return;
    setEditId(id);
    setFormData({
      titulo: novedad.titulo,
      descripcion: novedad.descripcion,
      img: novedad.img,
    });
    setIsEditModalOpen(true);

  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setNovedades((prev) =>
      prev.map((n) =>
        n.id === editId
          ? { ...n, titulo: formData.titulo, descripcion: formData.descripcion, img: formData.img }
          : n
      )
    );
    setIsEditModalOpen(false);
    setEditId(null);
    setFormData({ titulo: "", descripcion: "", img: "" });
    toast.success("Novedad editada con éxito!");
  };

  // -------- Eliminar --------
  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setNovedades((prev) => prev.filter((n) => n.id !== deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    toast.success("Novedad eliminada con éxito!");
  };

  useEffect(() => {
    // Block scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Unblock scroll on cleanup
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Gestión de Novedades</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md shadow transition-all"
          >
            <img src={agregarIcon} alt="Agregar novedad" className="w-6" />
            Añadir novedad
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {currentNovedades.map((item) => (
            <NovedadCard
              key={item.id}
              item={item}
              onEdit={() => handleOpenEditModal(item.id)}
              onDelete={() => handleOpenDeleteModal(item.id)}
            />
          ))}
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white"}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Volver
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-500 hover:text-white"}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modales */}
      {isAddModalOpen && (
        <AddNovedadModal
          formData={formData}
          onChange={handleChange}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddNovedad}
        />
      )}

      {isEditModalOpen && (
        <EditNovedadModal
          formData={formData}
          onChange={handleChange}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSaveEdit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteNovedadModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
