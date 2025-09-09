import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";

export default function EditarPerfilCont() {
  const navigate = useNavigate();

    const breadcrumbItems = [
      { label: "Inicio", href: "/inicio" },
      { label: "Perfil", href: "/perfil" },
      { label: "Editar" },
    ];


  const [formData, setFormData] = useState({
    tipoDocumento: "Cédula de Ciudadanía",
    telefono: "310 100 20 30",
    direccion: "92a27 Cl. 129a",
    correo: "paulalopez@gmail.com",
  });

    const handleSave = () => {
      alert("✅ Perfil actualizado correctamente (solo es una simulación, toca conectaro a la BD).");
      navigate("/perfil"); // volver siempre al perfil limpio
    };

    const handleCancel = () => {
      navigate("/perfil"); // cancelar y volver a perfil
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };


  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-2">Editar perfil</h2>
        <p className="text-sm text-gray-600 mb-6">
          Modifica tu información de contacto.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 max-w-2xl">
          {/* Tipo de documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipo de documento</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Tarjeta de Identidad</option>
              <option>Cédula de Ciudadanía</option>
              <option>Registro Civil</option>
              <option>Pasaporte</option>
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
