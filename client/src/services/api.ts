import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function logIn(body: object) {
  const response = await api.post("/login", body)
  return response
}
