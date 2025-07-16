import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // change to your backend base URL
  withCredentials: true,
});

export default API;
