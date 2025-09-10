import api from "./api";

// Obtener perfil por id
export const getPerfil = async (id_usuario) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/perfil/perfil/${id_usuario}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Editar perfil
export const updatePerfil = async (id_usuario, perfilData) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/perfil/editar/usuario/${id_usuario}`, perfilData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
