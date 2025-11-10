import api from "./api"

//Traer todos los hospitales
export const getTodosHospitales = async () => {
  const token = localStorage.getItem("token");
    const res = await api.get(`/hospitales/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}