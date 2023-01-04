import axios, { AxiosResponse } from "axios"

export interface Category {
  id: number
  name: string
  image: string
}

export interface User {
  id: string
  email: string
  image: string
  name: string
}

export interface LogIn {
  user: User
  token: string
}

export interface Comment {
  id: number
  description: string
  user: User
}

export interface Post {
  id: number
  description?: string | undefined
  title: string
  category: Omit<Category, "image">
  user: User
  image: {
    name: string
    data: string
  }
  comments?: Comment[]
}

export interface Posts {
  totalPages: number
  currentPage: number
  results: Post[]
}

interface QueryRequest {
  pageParam?: number
  queryKey: string[]
}

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

export function logIn(body: User): Promise<AxiosResponse<LogIn>> {
  return api.post("/login", body)
}

export function listCategories(): Promise<AxiosResponse<Category[]>> {
  return api.get("/category")
}

export function createPost(
  body: FormData
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
}: QueryRequest): Promise<AxiosResponse<Posts>> {
  return api.get(`/post/${queryKey[1]}/?page=${pageParam}`)
}

export function listAllPosts({
  pageParam = 1,
}: QueryRequest): Promise<AxiosResponse<Posts>> {
  return api.get(`/post/?page=${pageParam}`)
}

export function listPostById({
  queryKey,
}: QueryRequest): Promise<AxiosResponse<Post>> {
  return api.get(`/post//detail/${queryKey[1]}`)
}

export function getUserById({
  queryKey,
}: QueryRequest): Promise<AxiosResponse<User>> {
  return api.get(`/user/${queryKey[1]}`)
}

export function makeComment(config: {
  body: { description: string }
  postId: string
}): Promise<AxiosResponse<Comment>> {
  return api.post(`/post/${config.postId}/comment`, config.body)
}

export function deletePost(postId: number): Promise<AxiosResponse> {
  return api.delete(`/post/${postId}`)
}
