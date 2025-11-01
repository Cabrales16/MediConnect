import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import { getPerfil, updatePerfil } from "../../services/perfilService";
import { toast } from "react-toastify";

export default function EditarPerfilCont() {
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem("id_usuario");

  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Perfil", href: "/admin/perfil" },
    { label: "Editar" },
  ];

  const [formData, setFormData] = useState({
    tipoDocumento: "",
    telefono: "",
    direccion: "",
    correo: "",
  });

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfil(id_usuario);
        setFormData({
          tipoDocumento: data.tipo_documento || "",
          telefono: data.telefono || "",
          direccion: data.direccion || "",
          correo: data.correo || "",
        });
      } catch (error) {
        console.error("❌ Error cargando perfil:", error);
        toast.error("Error cargando perfil");
      }
    };
    fetchPerfil();
  }, [id_usuario]);

  const handleSave = async () => {
    try {
      await updatePerfil(id_usuario, {
        tipo_documento: formData.tipoDocumento,
        telefono: formData.telefono,
        direccion: formData.direccion,
        correo: formData.correo,
      });
      toast.success("Perfil actualizado correctamente");
      navigate("/admin/perfil");
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil");
    }
  };

  const handleCancel = () => {
    navigate("/admin/perfil");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-2">Editar perfil</h2>
        <p className="text-sm text-gray-600 mb-6">
          Modifica tu información de contacto.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 max-w-2xl">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipo de documento</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="RC">Registro Civil</option>
              <option value="PAS">Pasaporte</option>
              <option value="CE">Pasaporte</option>
            </select>
          </div>
          
          {/* Teléfono */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Dirección */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Correo electrónico */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
