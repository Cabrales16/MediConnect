// src/services/api.js
import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // ponlo en true solo si usas cookies
});

export default api;
