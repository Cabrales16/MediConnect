import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";

/* Datos iniciales */
const initialMeds = [
  { id: 1, nombre: "Ibuprofeno", dosis: "200mg", frecuencia: "Cada 6 horas", duracion: "7 días", instrucciones: "Tomar con alimentos" },
  { id: 2, nombre: "Amoxicilina", dosis: "500mg", frecuencia: "Cada 8 horas", duracion: "10 días", instrucciones: "Tomar con el estómago vacío" },
];

const initialTerapias = [
  { id: 1, tipo: "Fisioterapia", frecuencia: "2 veces por semana", duracion: "4 semanas", objetivos: "Mejorar la movilidad" },
];

/* Componente principal */
export default function IndMedicasCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Gest. de Opciones" },
  ];

  const [medicamentos, setMedicamentos] = useState(initialMeds);
  const [terapiaList, setTerapiaList] = useState(initialTerapias);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "meds" o "terapia"
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Abrir modal
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setEditItem(null);
  };

  // Guardar (añadir o editar)
  const handleSave = () => {
    if (modalType === "meds") {
      if (editItem) {
        setMedicamentos(
          medicamentos.map((m) => (m.id === editItem.id ? { ...formData, id: editItem.id } : m))
        );
      } else {
        setMedicamentos([...medicamentos, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === "terapia") {
      if (editItem) {
        setTerapiaList(
          terapiaList.map((t) => (t.id === editItem.id ? { ...formData, id: editItem.id } : t))
        );
      } else {
        setTerapiaList([...terapiaList, { ...formData, id: Date.now() }]);
      }
    }
    closeModal();
  };

  // Eliminar
  const handleDelete = (type, id) => {
    if (type === "meds") {
      setMedicamentos(medicamentos.filter((m) => m.id !== id));
    } else {
      setTerapiaList(terapiaList.filter((t) => t.id !== id));
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Gestión de Opciones de Usuario</h2>
        <p className="text-sm text-gray-600 mb-6">
          Aquí se muestran procedimientos relacionados contigo (medicamentos, terapias).
        </p>

        {/* Medicamentos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Medicamentos</h3>
            <button
              onClick={() => openModal("meds")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              + Añadir
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-black">Nombre del medicamento</th>
                    <th className="px-6 py-3 text-left text-black">Dosis</th>
                    <th className="px-6 py-3 text-left text-black">Frecuencia</th>
                    <th className="px-6 py-3 text-left text-black">Duración</th>
                    <th className="px-6 py-3 text-left text-black">Instrucciones</th>
                    <th className="px-6 py-3 text-left text-black">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.map((m) => (
                    <tr key={m.id} className="border-t border-gray-300">
                      <td className="px-6 py-4">{m.nombre}</td>
                      <td className="px-6 py-4 text-green-700">{m.dosis}</td>
                      <td className="px-6 py-4 text-green-700">{m.frecuencia}</td>
                      <td className="px-6 py-4 text-green-700">{m.duracion}</td>
                      <td className="px-6 py-4 text-green-700">{m.instrucciones}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => openModal("meds", m)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete("meds", m.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {medicamentos.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No hay medicamentos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Terapias */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Terapias</h3>
            <button
              onClick={() => openModal("terapia")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              + Añadir
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-black">Tipo de terapia</th>
                    <th className="px-6 py-3 text-left text-black">Frecuencia</th>
                    <th className="px-6 py-3 text-left text-black">Duración</th>
                    <th className="px-6 py-3 text-left text-black">Objetivos</th>
                    <th className="px-6 py-3 text-left text-black">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {terapiaList.map((t) => (
                    <tr key={t.id} className="border-t border-gray-300">
                      <td className="px-6 py-4">{t.tipo}</td>
                      <td className="px-6 py-4 text-green-700">{t.frecuencia}</td>
                      <td className="px-6 py-4 text-green-700">{t.duracion}</td>
                      <td className="px-6 py-4 text-green-700">{t.objetivos}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => openModal("terapia", t)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete("terapia", t.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {terapiaList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No hay terapias.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">
              {editItem ? "Editar" : "Añadir"} {modalType === "meds" ? "Medicamento" : "Terapia"}
            </h2>

            {modalType === "meds" ? (
              <>
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Nombre"
                  value={formData.nombre || ""}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Dosis"
                  value={formData.dosis || ""}
                  onChange={(e) => setFormData({ ...formData, dosis: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Frecuencia"
                  value={formData.frecuencia || ""}
                  onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Duración"
                  value={formData.duracion || ""}
                  onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Instrucciones"
                  value={formData.instrucciones || ""}
                  onChange={(e) => setFormData({ ...formData, instrucciones: e.target.value })}
                />
              </>
            ) : (
              <>
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Tipo"
                  value={formData.tipo || ""}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Frecuencia"
                  value={formData.frecuencia || ""}
                  onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Duración"
                  value={formData.duracion || ""}
                  onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-2 rounded"
                  placeholder="Objetivos"
                  value={formData.objetivos || ""}
                  onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                />
              </>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
