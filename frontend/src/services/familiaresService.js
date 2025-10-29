import api from "./api";

// Obtener familiares de un paciente
export const getFamiliaresPaciente = async (id_paciente) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/familiares/ver/${id_paciente}`, { 
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Crear un nuevo familiar
export const crearFamiliar = async (id_paciente, familiarData) => {
  const token = localStorage.getItem("token");
    const res = await api.post(`/familiares/crear/${id_paciente}`,
    familiarData,
    { headers: { Authorization: `Bearer ${token}` }, }
  );
  return res.data;
}

// Eliminar un familiar
export const eliminarFamiliar = async (id_familiar) => {
  const token = localStorage.getItem("token");
    const res = await api.delete(`/familiares/eliminar/${id_familiar}`,
    { headers: { Authorization: `Bearer ${token}` }, }
  );
  return res.data;
}

export const actualizarFamiliar = async (id_familiar, familiarData) => {
  const token = localStorage.getItem("token");
  const res = await api.put(
    `/familiares/actualizar/${id_familiar}`,
    familiarData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};