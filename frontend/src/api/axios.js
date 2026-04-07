import axios from "axios";

// FIX: Use env variable instead of hardcoded localhost
// For local dev it falls back to localhost:5000
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

export default instance;
