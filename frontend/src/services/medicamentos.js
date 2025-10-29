import api from "./api";

// Obtener todos los medicamentos
export const obtenerMedicamentos = async () => {
  const response = await api.get("/medicamentos/ver");
  return response.data;
};

// Crear nuevo medicamento
export const crearMedicamento = async (medicamentoData) => {
  const response = await api.post("/medicamentos/crear", medicamentoData);
  return response.data;
};

// Editar medicamento existente (usa id en la URL )
export const editarMedicamento = async (id_medicamento, medicamentoData) => {
  const response = await api.put(`/medicamentos/editar/${id_medicamento}`, medicamentoData);
  return response.data;
};

// Eliminar medicamento
export const eliminarMedicamento = async (id_medicamento) => {
  const response = await api.delete(`/medicamentos/eliminar/${id_medicamento}`);
  return response.data;
};
