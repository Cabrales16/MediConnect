import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import AddFamilia from "../components/Familiares/AddFamiliar";
import EditFamilia from "../components/Familiares/EditFamiliar";
import ConfirmModal from "../components/UI/ConfirmModal";

/* datos de ejemplo */
const initial = [
  { id: 1, nombre: "Sofía Segura", correo: "sofíaseg@gmail.com", tipo: "Citas médicas" },
  { id: 2, nombre: "Andres Cabrales", correo: "andrescabrales@outlook.com", tipo: "Medicamentos y citas médicas" },
  { id: 3, nombre: "Gerson Sánchez", correo: "soraframes@gmail.com", tipo: "Medicamentos" },
  { id: 4, nombre: "Juliana García", correo: "juliiigarcia@outlook.com", tipo: "Citas médicas" },
];

export default function FamiliaresCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Familiares" },
  ];

  const [familiares, setFamiliares] = useState(initial);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleAdd = (newF) => {
    setFamiliares((s) => [...s, { ...newF, id: Date.now() }]);
    setShowAdd(false);
  };

  const handleUpdate = (updated) => {
    setFamiliares((s) => s.map((f) => (f.id === updated.id ? updated : f)));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setFamiliares((s) => s.filter((f) => f.id !== id));
    setDeleting(null);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Familiares</h2>
            <p className="text-sm text-gray-500">Añade y gestiona la información de tus familiares.</p>
          </div>

          <div>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-sm"
            >
              Añadir
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="overflow-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-black">Nombre</th>
                  <th className="px-6 py-3 text-left text-green-700">Correo electrónico</th>
                  <th className="px-6 py-3 text-left text-green-700">Tipo de información</th>
                  <th className="px-6 py-3 text-left text-green-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {familiares.map((f) => (
                  <tr key={f.id} className="border-t">
                    <td className="px-6 py-4 text-black">{f.nombre}</td>
                    <td className="px-6 py-4 text-green-700">{f.correo}</td>
                    <td className="px-6 py-4 text-green-700">{f.tipo}</td>
                    <td className="px-6 py-4 text-green-700">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-2 rounded-md bg-green-50 text-green-700"
                          onClick={() => setEditing(f)}
                        >
                          Editar
                        </button>
                        <button
                          className="px-3 py-2 rounded-md bg-red-50 text-red-600"
                          onClick={() => setDeleting(f)}
                        >
                          Eliminar
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

      {/* Paneles/modal (render in-place) */}
      {showAdd && <AddFamilia onCancel={() => setShowAdd(false)} onAdd={handleAdd} />}
      {editing && <EditFamilia initial={editing} onCancel={() => setEditing(null)} onSave={handleUpdate} />}
      {deleting && (
        <ConfirmModal
          title="Eliminar familiar"
          description={`¿Deseas eliminar a ${deleting.nombre}? Esta acción no se puede deshacer.`}
          onCancel={() => setDeleting(null)}
          onConfirm={() => handleDelete(deleting.id)}
        />
      )}
    </>
  );
}
