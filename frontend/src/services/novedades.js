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

// Crear una nueva novedad
export const crearNovedad = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.post("/novedades/crear", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error al crear la novedad:", error.response?.data || error);
    throw error;
  }
};
//Eliminar novedad
export const eliminarNovedad = async (id_novedad) => {
    const token = localStorage.getItem("token");
    const res = await api.delete(`/novedades/eliminar/${id_novedad}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

// Actualizar novedad
export const actualizarNovedad = async (id_novedad, formData) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/novedades/actualizar/${id_novedad}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};