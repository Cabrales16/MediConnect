import api from "./api";

// Obtener todas las novedades
export const getNovedades = async () => {
  const token = localStorage.getItem("token");
    const res = await api.get("/novedades/ver", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Obtener info novedad por ID
export const getInfoNovedad = async (id_novedad) => {
    const token = localStorage.getItem("token");
    const res = await api.get(`/novedades/info/${id_novedad}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
