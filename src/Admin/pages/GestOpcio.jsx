import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import MedicamentosTable from "../components/GestOpcio/MedicamentosTable";
import TerapiasTable from "../components/GestOpcio/TerapiasTable";
import ModalOpciones from "../components/UI/ModalOpciones";


/* Datos iniciales */
const initialMeds = [
  { id: 1, nombre: "Ibuprofeno", dosis: "200mg", frecuencia: "Cada 6 horas", duracion: "7 días", instrucciones: "Tomar con alimentos" },
  { id: 2, nombre: "Amoxicilina", dosis: "500mg", frecuencia: "Cada 8 horas", duracion: "10 días", instrucciones: "Tomar con el estómago vacío" },
];

const initialTerapias = [
  { id: 1, tipo: "Fisioterapia", frecuencia: "2 veces por semana", duracion: "4 semanas", objetivos: "Mejorar la movilidad" },
];

export default function GestOpcioCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Gest. de Opciones" },
  ];

  const [medicamentos, setMedicamentos] = useState(initialMeds);
  const [terapiaList, setTerapiaList] = useState(initialTerapias);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "meds" o "terapia"
  const [editItem, setEditItem] = useState(null);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleSave = (data) => {
    if (modalType === "meds") {
      if (editItem) {
        setMedicamentos(medicamentos.map((m) => (m.id === editItem.id ? { ...data, id: editItem.id } : m)));
      } else {
        setMedicamentos([...medicamentos, { ...data, id: Date.now() }]);
      }
    } else {
      if (editItem) {
        setTerapiaList(terapiaList.map((t) => (t.id === editItem.id ? { ...data, id: editItem.id } : t)));
      } else {
        setTerapiaList([...terapiaList, { ...data, id: Date.now() }]);
      }
    }
    closeModal();
  };

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

        <MedicamentosTable data={medicamentos} onAdd={() => openModal("meds")} onEdit={(m) => openModal("meds", m)} onDelete={(id) => handleDelete("meds", id)} />

        <TerapiasTable data={terapiaList} onAdd={() => openModal("terapia")} onEdit={(t) => openModal("terapia", t)} onDelete={(id) => handleDelete("terapia", id)} />
      </div>

      {showModal && (
        <ModalOpciones
          type={modalType}
          item={editItem}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}
