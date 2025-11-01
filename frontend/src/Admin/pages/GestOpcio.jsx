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

// 🔹 Servicios reales de terapias
import {
  getTerapias,
  addTerapia,
  updateTerapia,
  deleteTerapia,
} from "../../services/terapia";

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

  // ✅ Cargar medicamentos
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

  // ✅ Cargar terapias
  useEffect(() => {
    const fetchTerapias = async () => {
      try {
        const data = await getTerapias();
        setTerapiaList(data);
      } catch (error) {
        console.error("Error cargando terapias:", error);
      }
    };
    fetchTerapias();
  }, []);

  // ✅ Crear o Editar (manteniendo archivo anterior si no se cambia)
  const handleSave = async (data) => {
    try {
      if (modalType === "meds") {
        // --- Medicamentos ---
        if (editItem && editItem.id_medicamento) {
          const updated = await editarMedicamento(editItem.id_medicamento, data);
          setMedicamentos((prev) =>
            prev.map((m) =>
              m.id_medicamento === editItem.id_medicamento ? updated : m
            )
          );
        } else {
          const nuevo = await crearMedicamento(data);
          setMedicamentos((prev) => [...prev, nuevo]);
        }
      } else {
        // --- Terapias ---
        const formData = new FormData();
        formData.append("nombre", data.nombre);

        const idAdmin = parseInt(localStorage.getItem("id_usuario")) || 1;
        formData.append("id_admin", idAdmin);

        // ✅ Mantener el archivo anterior si no se selecciona uno nuevo
        if (data.file) {
          formData.append("file", data.file);
        } else if (editItem?.archivo) {
          formData.append("archivo_actual", editItem.archivo);
        }

        if (data.estado) formData.append("estado", data.estado);

        if (editItem && editItem.id_terapia) {
          const updated = await updateTerapia(editItem.id_terapia, formData);
          setTerapiaList((prev) =>
            prev.map((t) =>
              t.id_terapia === editItem.id_terapia ? updated : t
            )
          );
        } else {
          const nueva = await addTerapia(formData);
          setTerapiaList((prev) => [...prev, nueva]);
        }
      }
    } catch (error) {
      console.error("❌ Error guardando datos:", error);
    } finally {
      closeModal();
    }
  };

  // ✅ Eliminar
  const handleDelete = async (type, id) => {
    try {
      if (type === "meds") {
        await eliminarMedicamento(id);
        setMedicamentos((prev) => prev.filter((m) => m.id_medicamento !== id));
      } else {
        await deleteTerapia(id);
        setTerapiaList((prev) => prev.filter((t) => t.id_terapia !== id));
      }
    } catch (error) {
      console.error("Error eliminando elemento:", error);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-4">Gestión de Opciones de Usuario</h2>
        <p className="text-sm text-gray-600 mb-6">
          Aquí se muestran procedimientos relacionados contigo (medicamentos y terapias).
        </p>

        <MedicamentosTable
          data={medicamentos}
          onAdd={() => openModal("meds")}
          onEdit={(m) => openModal("meds", m)}
          onDelete={(id) => handleDelete("meds", id)}
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
