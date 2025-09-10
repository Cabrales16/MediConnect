import api from "./api";

// Login
export const login = async (correo, contrasena) => {
  const response = await api.post("/auth/login", { correo, contrasena });
  return response.data; // { access_token, token_type }
};

// Registro
export const register = async (usuarioData) => {
  const response = await api.post("/auth/register", usuarioData);
  return response.data;
};

// Recuperar contraseña
export const recuperarContrasena = async (correo) => {
  const response = await api.post("/auth/recuperar-contrasena", { correo });
  return response.data;
};

// Restablecer contraseña
export const restablecerContrasena = async (token, nuevaContrasena) => {
  const response = await api.post(`/auth/restablecer-contrasena/${token}`, {
    nueva_contrasena: nuevaContrasena,
  });
  return response.data;
};