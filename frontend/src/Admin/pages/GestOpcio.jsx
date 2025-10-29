import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import MedicamentosTable from "../components/GestOpcio/MedicamentosTable";
import TerapiasTable from "../components/GestOpcio/TerapiasTable";
import ModalOpciones from "../components/UI/ModalOpciones";
import {
  obtenerMedicamentos,
  crearMedicamento,
  editarMedicamento,
  eliminarMedicamento,
} from "../../services/medicamentos";

export default function GestOpcioCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/admin/inicio" },
    { label: "Gest. de Opciones" },
  ];

  const [medicamentos, setMedicamentos] = useState([]);
  const [terapiaList, setTerapiaList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
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

  // ✅ Cargar medicamentos desde backend
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const data = await obtenerMedicamentos();
        setMedicamentos(data);
      } catch (error) {
        console.error("Error cargando medicamentos:", error);
      }
    };
    fetchMedicamentos();
  }, []);

  // ✅ Guardar (crear o editar medicamento)
  const handleSave = async (data) => {
    try {
      if (modalType === "meds") {
        if (editItem && editItem.id_medicamento) {
          // Editar
          const updated = await editarMedicamento(editItem.id_medicamento, data);
          setMedicamentos((prev) =>
            prev.map((m) =>
              m.id_medicamento === editItem.id_medicamento ? updated : m
            )
          );
        } else {
          // Crear
          const nuevo = await crearMedicamento(data);
          setMedicamentos((prev) => [...prev, nuevo]);
        }
      } else {
        if (editItem) {
          setTerapiaList((prev) =>
            prev.map((t) =>
              t.id === editItem.id ? { ...data, id: editItem.id } : t
            )
          );
        } else {
          setTerapiaList((prev) => [...prev, { ...data, id: Date.now() }]);
        }
      }
    } catch (error) {
      console.error("❌ Error guardando medicamento:", error);
    } finally {
      closeModal();
    }
  };

  // ✅ Eliminar medicamento
  const handleDelete = async (type, id_medicamento) => {
    if (!id_medicamento) {
      console.error("❌ No se recibió un id_medicamento válido");
      return;
    }

    try {
      if (type === "meds") {
        await eliminarMedicamento(id_medicamento);
        setMedicamentos((prev) =>
          prev.filter((m) => m.id_medicamento !== id_medicamento)
        );
      } else {
        setTerapiaList((prev) => prev.filter((t) => t.id !== id_medicamento));
      }
    } catch (error) {
      console.error("Error eliminando medicamento:", error);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="pb-30 overflow-y-auto sm:overflow-y-visible h-[100vh]">
        <h2 className="text-2xl font-semibold mb-4">
          Gestión de Opciones de Usuario
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Aquí se muestran procedimientos relacionados contigo (medicamentos y terapias).
        </p>

        <MedicamentosTable
          data={medicamentos}
          onAdd={() => openModal("meds")}
          onEdit={(m) => openModal("meds", m)}
          onDelete={(id_medicamento) => handleDelete("meds", id_medicamento)}
        />

        <TerapiasTable
          data={terapiaList}
          onAdd={() => openModal("terapia")}
          onEdit={(t) => openModal("terapia", t)}
          onDelete={(id) => handleDelete("terapia", id)}
        />
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
