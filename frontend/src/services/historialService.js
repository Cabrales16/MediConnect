import api from "./api";

// Obtener historial de un paciente
export const getHistorialPaciente = async (id_paciente) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/historial/paciente/historial/${id_paciente}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cancelar una cita
export const cancelarCita = async (id_cita) => {
  const token = localStorage.getItem("token");
  const res = await api.put(
    `/historial/paciente/${id_cita}/cancelar`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}