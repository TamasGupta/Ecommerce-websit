import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // or your deployed backend
  withCredentials: true,
});

export default API;
