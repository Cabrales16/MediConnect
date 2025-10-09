import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import { toast } from "react-toastify";
import {
  getNovedades,
  crearNovedad,
  eliminarNovedad,
} from "../../services/novedades";

import NovedadCard from "../components/UI/NovedadCard";
import AddNovedadModal from "../components/UI/AddNovedadModal";
import EditNovedadModal from "../components/UI/EditNovedadModal";
import DeleteNovedadModal from "../components/UI/DeleteNovedadModal";

import agregarIcon from "../components/GestNovedades/GestNovedadesImages/agregarIcon.png";

export default function GestNovedCont() {
  const breadcrumbItems = [{ label: "Gest. de Novedades", href: "/admin/inicio" }];

  const [novedades, setNovedades] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedNovedad, setSelectedNovedad] = useState(null);

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
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ---------- CARGAR NOVEDADES ----------
  const fetchNovedades = async () => {
    try {
      const data = await getNovedades();
      setNovedades(data);
    } catch (error) {
      console.error("Error al obtener novedades:", error);
      toast.error("No se pudieron cargar las novedades");
    }
  };

  useEffect(() => {
    fetchNovedades();
  }, []);

  // ---------- CREAR NOVEDAD ----------
  const handleAddNovedad = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titulo", formData.titulo);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("id_admin", 1);
      if (formData.img instanceof File) {
        formDataToSend.append("imagen", formData.img);
      }

      await crearNovedad(formDataToSend);
      toast.success("Novedad añadida con éxito!");
      setIsAddModalOpen(false);
      setFormData({ titulo: "", descripcion: "", img: "" });
      fetchNovedades();
    } catch (error) {
      console.error("Error al crear novedad:", error);
      toast.error("No se pudo crear la novedad");
    }
  };

  // ---------- ABRIR MODAL DE EDICIÓN ----------
  const handleOpenEditModal = (id_novedad) => {
    const novedad = novedades.find((n) => n.id_novedad === id_novedad);
    if (!novedad) return;
    setSelectedNovedad(novedad);
    setIsEditModalOpen(true);
  };

  // ---------- ELIMINAR NOVEDAD ----------
  const handleOpenDeleteModal = (id_novedad) => {
    setDeleteId(id_novedad);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await eliminarNovedad(deleteId);
      toast.success("Novedad eliminada con éxito!");
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      fetchNovedades();
    } catch (error) {
      console.error("Error al eliminar novedad:", error);
      toast.error("No se pudo eliminar la novedad");
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      isAddModalOpen || isEditModalOpen || isDeleteModalOpen ? "hidden" : "";
  }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

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
              key={item.id_novedad}
              item={item}
              onEdit={() => handleOpenEditModal(item.id_novedad)}
              onDelete={() => handleOpenDeleteModal(item.id_novedad)}
            />
          ))}
        </div>

        {/* PAGINACIÓN — solo si hay más de 9 novedades */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Volver
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-green-500 hover:text-white"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modales */}
      {isAddModalOpen && (
        <AddNovedadModal
          formData={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddNovedad}
        />
      )}

      {isEditModalOpen && (
        <EditNovedadModal
          novedad={selectedNovedad}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={fetchNovedades}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteNovedadModal
          idNovedad={deleteId}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
