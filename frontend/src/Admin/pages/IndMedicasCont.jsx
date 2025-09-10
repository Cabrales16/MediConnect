import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import ConfirmModal from "../components/UI/ConfirmModal";
import MedForm from "../components/IndMedicas/MedForm";
import TerapiaForm from "../components/IndMedicas/TerapiaForm";

/* Datos iniciales */
const initialMeds = [
  { id: 1, nombre: "Ibuprofeno", dosis: "200mg", frecuencia: "Cada 6 horas", duracion: "7 días", instrucciones: "Tomar con alimentos" },
  { id: 2, nombre: "Amoxicilina", dosis: "500mg", frecuencia: "Cada 8 horas", duracion: "10 días", instrucciones: "Tomar con el estómago vacío" },
];

const initialTerapias = [
  { id: 1, tipo: "Fisioterapia", frecuencia: "2 veces por semana", duracion: "4 semanas", objetivos: "Mejorar la movilidad" },
];

export default function IndMedicasCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Ind. médicas" },
  ];

  const [medicamentos, setMedicamentos] = useState(initialMeds);
  const [terapiaList, setTerapiaList] = useState(initialTerapias);

  // modales / edición
  const [showMedForm, setShowMedForm] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [toDeleteMed, setToDeleteMed] = useState(null);

  const [showTerapiaForm, setShowTerapiaForm] = useState(false);
  const [editingTerapia, setEditingTerapia] = useState(null);
  const [toDeleteTerapia, setToDeleteTerapia] = useState(null);

  /* Medicamentos handlers */
  const handleAddMed = (med) => {
    const withId = { ...med, id: Date.now() };
    setMedicamentos((s) => [withId, ...s]);
    setShowMedForm(false);
  };

  const handleUpdateMed = (med) => {
    setMedicamentos((s) => s.map((m) => (m.id === med.id ? med : m)));
    setEditingMed(null);
  };

  const handleDeleteMed = (id) => {
    setMedicamentos((s) => s.filter((m) => m.id !== id));
    setToDeleteMed(null);
  };

  /* Terapias handlers */
  const handleAddTerapia = (t) => {
    const withId = { ...t, id: Date.now() };
    setTerapiaList((s) => [withId, ...s]);
    setShowTerapiaForm(false);
  };

  const handleUpdateTerapia = (t) => {
    setTerapiaList((s) => s.map((x) => (x.id === t.id ? t : x)));
    setEditingTerapia(null);
  };

  const handleDeleteTerapia = (id) => {
    setTerapiaList((s) => s.filter((t) => t.id !== id));
    setToDeleteTerapia(null);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Indicaciones médicas</h2>
        <p className="text-sm text-gray-600 mb-6">Aquí se muestran procedimientos relacionados contigo (medicamentos, terapias).</p>

        {/* Medicamentos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Medicamentos</h3>
            <button
              onClick={() => setShowMedForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-sm"
            >
              Añadir medicamento
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-black">Nombre del medicamento</th>
                    <th className="px-6 py-3 text-left text-green-700">Dosis</th>
                    <th className="px-6 py-3 text-left text-green-700">Frecuencia</th>
                    <th className="px-6 py-3 text-left text-green-700">Duración</th>
                    <th className="px-6 py-3 text-left text-green-700">Instrucciones</th>
                    <th className="px-6 py-3 text-left text-green-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.map((m) => (
                    <tr key={m.id} className="border-t">
                      <td className="px-6 py-4 text-black">{m.nombre}</td>
                      <td className="px-6 py-4 text-green-700">{m.dosis}</td>
                      <td className="px-6 py-4 text-green-700">{m.frecuencia}</td>
                      <td className="px-6 py-4 text-green-700">{m.duracion}</td>
                      <td className="px-6 py-4 text-green-700">{m.instrucciones}</td>
                      <td className="px-6 py-4 text-green-700">
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-2 rounded-md bg-green-50 text-green-700"
                            onClick={() => setEditingMed(m)}
                          >
                            Editar
                          </button>
                          <button
                            className="px-3 py-2 rounded-md bg-red-50 text-red-600"
                            onClick={() => setToDeleteMed(m)}
                          >
                            Eliminar
                          </button>
                        </div>
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
              onClick={() => setShowTerapiaForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-sm"
            >
              Añadir terapia
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-black">Tipo de terapia</th>
                    <th className="px-6 py-3 text-left text-green-700">Frecuencia</th>
                    <th className="px-6 py-3 text-left text-green-700">Duración</th>
                    <th className="px-6 py-3 text-left text-green-700">Objetivos</th>
                    <th className="px-6 py-3 text-left text-green-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {terapiaList.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="px-6 py-4 text-black">{t.tipo}</td>
                      <td className="px-6 py-4 text-green-700">{t.frecuencia}</td>
                      <td className="px-6 py-4 text-green-700">{t.duracion}</td>
                      <td className="px-6 py-4 text-green-700">{t.objetivos}</td>
                      <td className="px-6 py-4 text-green-700">
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-2 rounded-md bg-green-50 text-green-700"
                            onClick={() => setEditingTerapia(t)}
                          >
                            Editar
                          </button>
                          <button
                            className="px-3 py-2 rounded-md bg-red-50 text-red-600"
                            onClick={() => setToDeleteTerapia(t)}
                          >
                            Eliminar
                          </button>
                        </div>
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

      {/* Modales formularios */}
      {showMedForm && (
        <MedForm
          onCancel={() => setShowMedForm(false)}
          onSave={handleAddMed}
        />
      )}

      {editingMed && (
        <MedForm
          initial={editingMed}
          onCancel={() => setEditingMed(null)}
          onSave={handleUpdateMed}
        />
      )}

      {showTerapiaForm && (
        <TerapiaForm
          onCancel={() => setShowTerapiaForm(false)}
          onSave={handleAddTerapia}
        />
      )}

      {editingTerapia && (
        <TerapiaForm
          initial={editingTerapia}
          onCancel={() => setEditingTerapia(null)}
          onSave={handleUpdateTerapia}
        />
      )}

      {/* Confirmaciones */}
      {toDeleteMed && (
        <ConfirmModal
          title="Eliminar medicamento"
          description={`¿Deseas eliminar ${toDeleteMed.nombre}?`}
          onCancel={() => setToDeleteMed(null)}
          onConfirm={() => handleDeleteMed(toDeleteMed.id)}
        />
      )}

      {toDeleteTerapia && (
        <ConfirmModal
          title="Eliminar terapia"
          description={`¿Deseas eliminar ${toDeleteTerapia.tipo}?`}
          onCancel={() => setToDeleteTerapia(null)}
          onConfirm={() => handleDeleteTerapia(toDeleteTerapia.id)}
        />
      )}
    </>
  );
}
