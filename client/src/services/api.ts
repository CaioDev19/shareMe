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

export interface Post {
  title: string
  image_name: string
  image: string
  description: string
  user_id: string
  user_name: string
  user_image: string
  category_id: number
  category_name: string
}

export interface Posts {
  totalPages: number
  currentPage: number
  results: Post[]
}

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

export function logIn(body: object): Promise<AxiosResponse<UserApi>> {
  return api.post("/login", body)
}

export function listCategories(
  body: object
): Promise<AxiosResponse<Category[]>> {
  return api.get("/category", body)
}

export function createPost(
  body: object
): Promise<AxiosResponse<Post>> {
  return api.post("/post", body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
}

export function listUserPosts({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number
  queryKey: string[]
}): Promise<AxiosResponse<Posts>> {
  return api.get(`/post/${queryKey[1]}/?page=${pageParam}`)
}

export function listAllPosts({
  pageParam = 1,
}: {
  pageParam?: number
}): Promise<AxiosResponse<Posts>> {
  return api.get(`/post/?page=${pageParam}`)
}
