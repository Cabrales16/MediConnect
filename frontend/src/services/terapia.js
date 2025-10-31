import api from "./api";

// Obtener terapias
export const getTerapias = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get(`/terapia/ver`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Agregar nueva terapia
export const addTerapia = async (terapiaData) => {
    const token = localStorage.getItem("token");
    const res = await api.post(`/terapia/agregar`, terapiaData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Eliminar terapia por id
export const deleteTerapia = async (id_terapia) => {
    const token = localStorage.getItem("token");
    const res = await api.delete(`/terapia/eliminar/${id_terapia}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}