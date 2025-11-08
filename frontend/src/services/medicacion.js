import api from "./api";

// Obtener medicación de un paciente
export const getMedicacionPaciente = async (id_paciente) => {
  const token = localStorage.getItem("token");
    const res = await api.get(`/medicacion/paciente/${id_paciente}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Crear nueva medicación
export const crearMedicacion = async (medicacionData) => {
  const token = localStorage.getItem("token");
    const res = await api.post(`/medicacion/crear`, medicacionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export const obtenerMedicamentos = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/medicacion/", {   // <-- usa el prefijo real de tu backend
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};