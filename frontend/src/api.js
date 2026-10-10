import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiUrl =
  configuredApiUrl || (import.meta.env.DEV ? "http://localhost:5000" : null);

const api = axios.create({
  baseURL: apiUrl ? `${apiUrl.replace(/\/+$/, "")}/api/expenses` : undefined,
});

api.interceptors.request.use((config) => {
  if (!apiUrl) {
    return Promise.reject(
      new Error("VITE_API_URL must be set for production deployments.")
    );
  }

  return config;
});

export default api;
