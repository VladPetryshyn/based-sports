import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.ENDPOINT || "http://localhost:8000",
  timeout: 2000
})
