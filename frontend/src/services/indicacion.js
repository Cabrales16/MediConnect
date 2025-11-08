import api from "./api"

//crear indicacion
export const crearIndicacion = async (indicacionData) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/indicacion/crear`, indicacionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

//obtener indicaciones de un paciente
export const obtenerIndicacionesPaciente = async (id_paciente) => {
  const token = localStorage.getItem("token");
    const res = await api.get(`/indicacion/paciente/${id_paciente}`, {
    headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}