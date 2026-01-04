import axios from "axios";

const api = axios.create({
  baseURL: "https://es-back-xv9z.onrender.com/api",
  withCredentials: true, // cookie support
});

export default api;
