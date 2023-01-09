import { useCallback } from "react"
import { api } from "../services/api"
import { AxiosResponse } from "axios"
import { useLoggedUser } from "./useLoggedUser"
import { useEffect } from "react"

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

export interface QueryRequest {
  pageParam?: number
  queryKey: string[]
}

export function useRequests() {
  const { user } = useLoggedUser()

  useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user?.token}`
  }, [user?.token])

  const logIn = useCallback(
    (body: User): Promise<AxiosResponse<LogIn>> => {
      return api.post("/login", body)
    },
    []
  )

  const listCategories = useCallback((): Promise<
    AxiosResponse<Category[]>
  > => {
    return api.get("/category")
  }, [])

  const createPost = useCallback(
    (body: FormData): Promise<AxiosResponse<Post>> => {
      return api.post("/post", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
    },
    []
  )

  const listUserPosts = useCallback(
    ({
      pageParam = 1,
      queryKey,
    }: QueryRequest): Promise<AxiosResponse<Posts>> => {
      return api.get(`/post/${queryKey[1]}/?page=${pageParam}`)
    },
    []
  )

  const listAllPosts = useCallback(
    ({
      pageParam = 1,
    }: QueryRequest): Promise<AxiosResponse<Posts>> => {
      return api.get(`/post/?page=${pageParam}`)
    },
    []
  )

  const listPostById = useCallback(
    ({ queryKey }: QueryRequest): Promise<AxiosResponse<Post>> => {
      return api.get(`/post//detail/${queryKey[1]}`)
    },
    []
  )

  const deletePost = useCallback(
    (postId: number): Promise<AxiosResponse> => {
      return api.delete(`/post/${postId}`)
    },
    []
  )

  const getUserById = useCallback(
    ({ queryKey }: QueryRequest): Promise<AxiosResponse<User>> => {
      return api.get(`/user/${queryKey[1]}`)
    },
    []
  )

  const createComment = useCallback(
    (config: {
      body: { description: string }
      postId: string
    }): Promise<AxiosResponse<Comment>> => {
      return api.post(`/post/${config.postId}/comment`, config.body)
    },
    []
  )

  return {
    logIn,
    listCategories,
    createPost,
    listUserPosts,
    listAllPosts,
    listPostById,
    deletePost,
    getUserById,
    createComment,
  }
}
