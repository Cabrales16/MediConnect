// frontend/src/services/terapia.js
import api from "./api";

// 🔹 Obtener terapias
export const getTerapias = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/terapia/ver`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🔹 Agregar terapia (usa FormData porque incluye archivo)
export const addTerapia = async (terapiaData) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/terapia/subir`, terapiaData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 🔹 Eliminar terapia
export const deleteTerapia = async (id_terapia) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/terapia/eliminar/${id_terapia}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🔹 Actualizar terapia
export const updateTerapia = async (id_terapia, terapiaData) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/terapia/actualizar/${id_terapia}`, terapiaData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 🔹 Asignar terapia a paciente
export const asignarTerapia = async (asignarData) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/terapia/asignar`, asignarData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


export const obtenerTerapias = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/terapia/todas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const obtenerTerapiasPaciente = async (id_usuario) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/terapia/paciente/${id_usuario}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};