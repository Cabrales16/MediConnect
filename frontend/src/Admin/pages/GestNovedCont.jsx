import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getPerfil } from "../../services/perfilService";
import agregarIcon from "../components/GestNovedades/GestNovedadesImages/agregarIcon.png";

export default function GestNovedCont() {
  const breadcrumbItems = [{ label: "Gest. de Novedades", href: "/admin/inicio" }];
  const navigate = useNavigate();

  const [novedades, setNovedades] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const id_usuario = localStorage.getItem("id_usuario");

  // 🔹 Evitar scroll del navegador
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [perfilData, novedadesData] = await Promise.all([
          getPerfil(id_usuario),
          getNovedades(),
        ]);
        setPerfil(perfilData);
        setNovedades(novedadesData);
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
        toast.error("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id_usuario]);

  // 🔹 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(novedades.length / itemsPerPage);
  const currentNovedades = novedades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // 🔹 Crear novedad
  const handleAddNovedad = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titulo", formData.titulo);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("id_admin", id_usuario);
      if (formData.img instanceof File) formDataToSend.append("imagen", formData.img);

      await crearNovedad(formDataToSend);
      toast.success("Novedad añadida con éxito!");
      setIsAddModalOpen(false);
      setFormData({ titulo: "", descripcion: "", img: "" });
      const data = await getNovedades();
      setNovedades(data);
    } catch (error) {
      console.error("Error al crear novedad:", error);
      toast.error("No se pudo crear la novedad");
    }
  };

  // 🔹 Eliminar novedad
  const handleConfirmDelete = async () => {
    try {
      await eliminarNovedad(deleteId);
      toast.success("Novedad eliminada con éxito!");
      setIsDeleteModalOpen(false);
      const data = await getNovedades();
      setNovedades(data);
    } catch (error) {
      console.error("Error al eliminar novedad:", error);
      toast.error("No se pudo eliminar la novedad");
    }
  };

  // 🔹 Controlar scroll al abrir modales
  useEffect(() => {
    document.body.style.overflow =
      isAddModalOpen || isEditModalOpen || isDeleteModalOpen ? "hidden" : "hidden";
  }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

  if (loading) return <div className="p-8">Cargando novedades...</div>;

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* 🔹 Contenedor con scroll interno que afecta encabezado */}
      <div className="overflow-y-auto h-[calc(100vh-7rem)]">
        {/* 🔹 Encabezado */}
        <div className="bg-green-500 text-white p-5 flex justify-between items-center shadow-md rounded-md mx-8 mt-4">
          <div>
            <h2 className="text-lg font-semibold">
              Bienvenid{perfil?.genero === "FEMENINO" ? "a" : "o"},{" "}
              {perfil ? `${perfil.nombre} ${perfil.apellido}` : "Administrador"}.
            </h2>
            <p className="text-sm text-white/90">
              Gestiona las novedades y opciones administrativas.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/gestion-usuarios")}
              className="bg-white text-green-600 font-medium px-4 py-2 rounded-md hover:bg-green-100 transition-all"
            >
              Gest. Usuarios
            </button>
            <button
              onClick={() => navigate("/admin/opciones-usuario")}
              className="bg-white text-green-600 font-medium px-4 py-2 rounded-md hover:bg-green-100 transition-all"
            >
              Gest. Opciones
            </button>
          </div>
        </div>

        {/* 🔹 Sección principal */}
        <div className="p-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentNovedades.map((item) => (
              <NovedadCard
                key={item.id_novedad}
                item={item}
                onEdit={() => setIsEditModalOpen(true) || setSelectedNovedad(item)}
                onDelete={() => setIsDeleteModalOpen(true) || setDeleteId(item.id_novedad)}
              />
            ))}
          </div>

          {/* 🔹 Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
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
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Modales */}
      {isAddModalOpen && (
        <AddNovedadModal
          formData={formData}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddNovedad}
        />
      )}
      {isEditModalOpen && (
        <EditNovedadModal
          novedad={selectedNovedad}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => getNovedades().then(setNovedades)}
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