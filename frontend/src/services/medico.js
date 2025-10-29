import api from "./api";

//Completar perfil medico
export const completarPerfilMedico = async (id_usuario, data) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/medicos/Completa/Medico/${id_usuario}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
