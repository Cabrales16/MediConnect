// src/api/usuarios.js
import api from "./api";    

// Obtener usuarios según el rol
export const getUsuarios = async (id_rol) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`/Usuarios/rol/${id_rol}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Cambiar rol de usuario
export const cambiarRolUsuario = async (id_usuario, data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.put(`/Usuarios/cambiar_rol/${id_usuario}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al cambiar el rol del usuario:", error);
    throw error;
  }
};

// Cambiar datos de usuario
export const cambiarDatosUsuario = async (id_usuario, data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.put(`/Usuarios/editar_usuario/${id_usuario}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al cambiar los datos del usuario:", error);
    throw error;
  }
};

// Cambiar estado de usuario (activo/suspendido)
export const cambiarEstadoUsuario = async (id_usuario, estado) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.put(
      `/Usuarios/cambiar_estado/${id_usuario}`,
      { estado }, // 👈 Enviamos un objeto, no un string
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error al cambiar el estado del usuario:", error);
    throw error;
  }
};