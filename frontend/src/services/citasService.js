// src/services/citasService.js
import api from "./api";

// Obtener todas las citas de un paciente
export const getCitasPaciente = async (id_paciente) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/Citas/paciente/${id_paciente}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Obtener detalle de una cita por ID
export const getCitaDetalle = async (id_cita) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/Citas/${id_cita}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Agendar una nueva cita
export const agendarCita = async (citaData) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/Citas/agendar`, citaData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Editar (reagendar) una cita
export const editarCita = async (cita_id, citaData) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/Citas/${cita_id}/editar`, citaData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cancelar una cita
export const cancelarCita = async (id_cita) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/Citas/paciente/${id_cita}/cancelar`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
