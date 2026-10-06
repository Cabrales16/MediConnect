import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Modo demo (GitHub Pages): no hay backend, las peticiones las responde una API
// simulada en el navegador. Ver src/mock/.
if (import.meta.env.VITE_DEMO_MODE === "true") {
  api.defaults.adapter = (config) =>
    import("../mock/adapter").then((m) => m.mockAdapter(config));
}

export default api;
