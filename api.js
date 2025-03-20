import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5500", // Change to match your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

