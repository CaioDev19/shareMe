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

type user = {
  id: string
  name: string
  image: string
}

export type comment = {
  id: number
  text: string
  user: user
}

export interface Post {
  id: number
  description?: string | undefined
  title: string
  category: {
    id: number
    name: string
  }
  user: user
  image: {
    name: string
    data: string
  }
  comments?: comment[]
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

export function listPostById({
  queryKey,
}: {
  queryKey: string[]
}): Promise<AxiosResponse<Post>> {
  return api.get(`/post//detail/${queryKey[1]}`)
}
