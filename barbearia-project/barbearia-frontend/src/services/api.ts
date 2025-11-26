import axios from "axios"
import { parseCookies } from "nookies"

const { "barbearia.token": token } = parseCookies()

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
})

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`
}

export { api }
      