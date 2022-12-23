import axios, { AxiosResponse } from "axios"

export interface Category {
  id: number
  name: string
  image: string
}

export interface UserApi {
  user: {
    email: string
    id: string
    image: string
    name: string
  }
  token: string
}

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function logIn(
  body: object
): Promise<AxiosResponse<UserApi>> {
  const response = await api.post("/login", body)
  return response
}

export async function listCategories(
  body: object
): Promise<AxiosResponse<Category[]>> {
  const response = await api.get("/category", body)
  return response
}
