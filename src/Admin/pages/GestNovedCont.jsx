import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Edit2 } from "lucide-react";
import Breadcrumb from "../components/UI/Breadcrumb";
import { novedades as novedadesIniciales } from "../../data/novedades";

export default function GestNovedCont() {
  const breadcrumbItems = [{ label: "Gest. de Novedades", href: "/inicio" }];

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

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({ titulo: "", descripcion: "", img: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNovedad = (e) => {
    e.preventDefault();
    const nuevaNovedad = {
      id: Date.now(),
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      img: formData.img || "https://via.placeholder.com/600x300",
    };
    setNovedades((prev) => [nuevaNovedad, ...prev]);
    handleCloseAddModal();
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    setNovedades((prev) => prev.filter((n) => n.id !== deleteId));
    handleCloseDeleteModal();
  };

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

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditId(null);
    setFormData({ titulo: "", descripcion: "", img: "" });
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
    handleCloseEditModal();
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Gestión de Novedades</h2>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            Añadir novedad
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {novedades.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden flex flex-col"
            >
              <img
                src={item.img}
                alt={item.titulo}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  {item.descripcion}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/novedad/${item.id}`}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition-all text-center"
                  >
                    Ver más
                  </Link>

                  <button
                    onClick={() => handleOpenEditModal(item.id)}
                    className="flex items-center justify-center w-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all"
                    title="Editar novedad"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleOpenDeleteModal(item.id)}
                    className="flex items-center justify-center w-12 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all"
                    title="Eliminar novedad"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Añadir nueva novedad</h3>

            <form onSubmit={handleAddNovedad} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">URL de imagen</label>
                <input
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                >
                  Añadir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Editar novedad</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">URL de imagen</label>
                <input
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative text-center">
            <h3 className="text-xl font-semibold mb-4">¿Confirmas eliminar esta novedad?</h3>
            <p className="mb-6 text-gray-700">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
