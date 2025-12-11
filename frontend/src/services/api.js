// frontend/src/services/api.js
import axios from "axios";

// URL base del backend (FastAPI)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Para archivos estáticos que sirves desde FastAPI
export const STATIC_BASE_URL = `${API_BASE_URL}/static`;

console.log("[API] API_BASE_URL =", API_BASE_URL); // 👈 déjalo temporalmente

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
