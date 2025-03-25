import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "https://8cf2-49-207-184-78.ngrok-free.app", // Change to match your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

