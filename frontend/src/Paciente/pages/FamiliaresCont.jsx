import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import AddFamilia from "../components/Familiares/AddFamiliar";
import EditFamilia from "../components/Familiares/EditFamiliar";
import ConfirmModal from "../components/UI/ConfirmModalFamiliar"
import editarVerdeIcon from "../components/Familiares/FamiliaresIcons/editarVerdeIcon.png";
import eliminarRojoIcon from "../components/Familiares/FamiliaresIcons/eliminarRojoIcon.png";
import agregarIcon from "../components/Familiares/FamiliaresIcons/agregarIcon.png";
import { toast } from "react-toastify";

// Importamos los servicios
import {
  getFamiliaresPaciente,
  crearFamiliar,
  eliminarFamiliar,
  actualizarFamiliar,
} from "../../services/familiaresService";

export default function FamiliaresCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/paciente/inicio" },
    { label: "Familiares" },
  ];

  const [familiares, setFamiliares] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Cargar familiares desde la API
  useEffect(() => {
    const fetchFamiliares = async () => {
      try {
        const id_paciente = localStorage.getItem("id_usuario"); 
        if (!id_paciente) return;
        const data = await getFamiliaresPaciente(id_paciente);
        setFamiliares(data);
      } catch (error) {
        console.error("Error cargando familiares:", error);

      }
    };
    fetchFamiliares();
  }, []);

  // Crear familiar
  const handleAdd = async (newF) => {
    try {
      const id_paciente = localStorage.getItem("id_usuario");
      const creado = await crearFamiliar(id_paciente, newF);
      setFamiliares((s) => [...s, creado]);
      toast.success("¡Familiar añadido correctamente!");
      setShowAdd(false);
    } catch (error) {
      console.error("Error creando familiar:", error);
      toast.error("Error al crear el familiar."); //LOS TOAST SE MANEJAN EN LAS FUNCIONES 
    }
  };

  // Editar familiar
  const handleUpdate = async (updated) => {
    try {
      const actualizado = await actualizarFamiliar(updated.id_familiar, updated);
      setFamiliares((s) =>
        s.map((f) =>
          f.id_familiar === actualizado.id_familiar ? actualizado : f
        )
      );
      toast.info("¡Familiar actualizado!");
      setEditing(null);
    } catch (error) {
      console.error("Error actualizando familiar:", error);
      toast.error("Error al actualizar el familiar.");
    }
  };

  // Eliminar familiar
  const handleDelete = async (id_familiar) => {
    try {
      await eliminarFamiliar(id_familiar);
      setFamiliares((s) => s.filter((f) => f.id_familiar !== id_familiar));
      setDeleting(null);
    } catch (error) {
      console.error("Error eliminando familiar:", error);
      toast.error("Error al eliminar el familiar.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Familiares</h2>
            <p className="text-sm text-gray-500">
              Añade y gestiona la información de tus familiares.
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-green-500 text-white font-medium shadow-sm hover:bg-green-600 transition"
            >
              <img src={agregarIcon} alt="" className="w-6 h-6" />
              <span className="hidden sm:inline">Añadir</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-3">
          <div className="overflow-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-black">Nombre</th>
                  <th className="px-6 py-3 text-left text-black">Correo electrónico</th>
                  <th className="px-6 py-3 text-left text-black">Tipo de información</th>
                  <th className="px-6 py-3 text-left text-black">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {familiares.map((f) => (
                  <tr key={f.id_familiar || f.id} className="border-t border-gray-300">
                    <td className="px-6 py-3 text-black">{f.nombre}</td>
                    <td className="px-6 py-3 text-green-700">{f.correo}</td>
                    <td className="px-6 py-3 text-green-700">{f.tipo}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-3">
                        <button
                          className="w-12 h-12 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center"
                          onClick={() => setEditing(f)}
                        >
                          <img src={editarVerdeIcon} alt="EditarVerde" className="w-6 h-6" />
                        </button>
                        <button
                          className="w-12 h-12 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          onClick={() => setDeleting(f)}
                        >
                          <img src={eliminarRojoIcon} alt="EliminarRojo" className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {familiares.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No hay familiares añadidos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Paneles/modal */}
      {showAdd && (
        <AddFamilia onCancel={() => setShowAdd(false)} onAdd={handleAdd} />
      )}
      {editing && (
        <EditFamilia
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={handleUpdate}
        />
      )}
      {deleting && (
        <ConfirmModal
          title="Eliminar familiar"
          description={`¿Deseas eliminar a ${deleting.nombre}? Esta acción no se puede deshacer.`}
          onCancel={() => setDeleting(null)}
          onConfirm={() => handleDelete(deleting.id_familiar)}
        />
      )}
    </>
  );
}
