// URL base del backend (FastAPI)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Para archivos estáticos que sirves desde FastAPI
export const STATIC_BASE_URL = `${API_BASE_URL}/static`;
