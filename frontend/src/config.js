// URL base del backend (FastAPI). En modo demo los archivos estáticos
// (PDFs, imágenes) se sirven desde el propio sitio (carpeta public/static).
export const API_BASE_URL =
  import.meta.env.VITE_DEMO_MODE === "true"
    ? import.meta.env.BASE_URL.replace(/\/$/, "")
    : import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Para archivos estáticos que sirves desde FastAPI
export const STATIC_BASE_URL = `${API_BASE_URL}/static`;
