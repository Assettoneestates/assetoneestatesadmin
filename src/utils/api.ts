import axios from "axios";

const API_BASE_URL =
  "https://assettone-rental-management-production.up.railway.app";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
