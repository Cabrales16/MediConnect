import React, { useState, useEffect, useMemo } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import MedicamentosTable from "../components/GestOpcio/MedicamentosTable";
import TerapiasTable from "../components/GestOpcio/TerapiasTable";
import ModalOpciones from "../components/UI/ModalOpciones";
import BarraBusquedaOpcio from "../components/GestOpcio/BarraBusquedaOpcio";
import FiltroOpciones from "../components/GestOpcio/FiltroOpciones";

import {
  obtenerMedicamentos,
  crearMedicamento,
  editarMedicamento,
  eliminarMedicamento,
} from "../../services/medicamentos";

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

  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [terapias, setTerapias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editItem, setEditItem] = useState(null);

  // 🔹 Cargar datos desde la BD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medsData, terapiasData] = await Promise.all([
          obtenerMedicamentos(),
          getTerapias(),
        ]);
        setMedicamentos(medsData);
        setTerapias(terapiasData);
      } catch (error) {
        console.error("❌ Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, []);

  // 🔹 Evitar scroll del navegador y dejar scroll interno del contenedor
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 🔹 Abrir y cerrar modal
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  // 🔹 Guardar o editar
  const handleSave = async (data) => {
    try {
      if (modalType === "meds") {
        if (editItem?.id_medicamento) {
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
      } else if (modalType === "terapia") {
        const formData = new FormData();
        formData.append("nombre", data.nombre);
        const idAdmin = parseInt(localStorage.getItem("id_usuario")) || 1;
        formData.append("id_admin", idAdmin);
        if (data.file) formData.append("file", data.file);
        if (data.estado) formData.append("estado", data.estado);

        if (editItem?.id_terapia) {
          const updated = await updateTerapia(editItem.id_terapia, formData);
          setTerapias((prev) =>
            prev.map((t) =>
              t.id_terapia === editItem.id_terapia ? updated : t
            )
          );
        } else {
          const nueva = await addTerapia(formData);
          setTerapias((prev) => [...prev, nueva]);
        }
      }
    } catch (error) {
      console.error("❌ Error guardando datos:", error);
    } finally {
      closeModal();
    }
  };

  // 🔹 Eliminar
  const handleDelete = async (type, id) => {
    try {
      if (type === "meds") {
        await eliminarMedicamento(id);
        setMedicamentos((prev) => prev.filter((m) => m.id_medicamento !== id));
      } else {
        await deleteTerapia(id);
        setTerapias((prev) => prev.filter((t) => t.id_terapia !== id));
      }
    } catch (error) {
      console.error("Error eliminando elemento:", error);
    }
  };

  // 🔹 Búsqueda global (para ambos)
  const medicamentosFiltrados = useMemo(() => {
    const term = busqueda.toLowerCase();
    return medicamentos.filter((m) =>
      (m.nombre || "").toLowerCase().includes(term)
    );
  }, [busqueda, medicamentos]);

  const terapiasFiltradas = useMemo(() => {
    const term = busqueda.toLowerCase();
    return terapias.filter((t) =>
      (t.nombre || "").toLowerCase().includes(term)
    );
  }, [busqueda, terapias]);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* Contenedor con scroll interno */}
      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-4">Gestión de Opciones de Usuario</h2>
        <p className="text-sm text-gray-600 mb-6">
          Busca, filtra y administra los medicamentos o terapias registrados.
        </p>

        {/* Filtro y búsqueda */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <FiltroOpciones filtro={filtro} setFiltro={setFiltro} />
          <BarraBusquedaOpcio valor={busqueda} onChange={setBusqueda} />
        </div>

        {/* Tablas con paginación interna */}
        {(filtro === "medicamentos" || filtro === "todos") && (
          <MedicamentosTable
            data={medicamentosFiltrados}
            onAdd={() => openModal("meds")}
            onEdit={(m) => openModal("meds", m)}
            onDelete={(id) => handleDelete("meds", id)}
          />
        )}

        {(filtro === "terapias" || filtro === "todos") && (
          <TerapiasTable
            data={terapiasFiltradas}
            onAdd={() => openModal("terapia")}
            onEdit={(t) => openModal("terapia", t)}
            onDelete={(id) => handleDelete("terapia", id)}
          />
        )}
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