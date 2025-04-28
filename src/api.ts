import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_PROD_API_URL
      : import.meta.env.VITE_DEV_API_URL,
  withCredentials: true,
});

export default api;
