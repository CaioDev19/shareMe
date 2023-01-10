import { Response, NextFunction } from "express"
import {
  CustomBodyRequest,
  CustomParamsQueryRequest,
  pagination,
  CustomParamsRequest,
} from "../interfaces/express"
import { getPostsFromDatabase, isInTheDataBase } from "../utils/db"
import { ValidationPost } from "../validators/postSchema"
import { Category, Post, PostJoinUser, User } from "../interfaces/db"
import knex from "../config/dataBase"
import { PostResponse } from "../interfaces/response"

export async function checkIfCategoryExists(
  req: CustomBodyRequest<ValidationPost>,
  res: Response,
  next: NextFunction
) {
  const { category_id } = req.body.data

  const { response, data } = await isInTheDataBase<Category>(
    { id: category_id },
    "category"
  )

  if (!response) {
    return res.status(404).json({ mensagem: "Invalid category" })
  }

  req.category_name = data!.name
  return next()
}

export async function checkIfThePageExists(
  req: CustomParamsQueryRequest<{ id?: string }, pagination>,
  res: Response,
  next: NextFunction
) {
  const page = req.query.page ? Number(req.query.page) : null
  const limit = Number(req.query.limit) || 10
  const { id } = req.params

  let totalPosts:
    | {
        count: string
      }
    | undefined

  if (typeof id !== "undefined") {
    totalPosts = <
      | {
          count: string
        }
      | undefined
    >await knex<Post>("post").where({ user_id: id }).count("*").first()
  } else {
    totalPosts = <
      | {
          count: string
        }
      | undefined
    >await knex<Post>("post").count("*").first()
  }

  if (typeof totalPosts === "undefined") {
    return res.status(500).json({ message: "Server internal error." })
  }

  const totalPages = Math.ceil(Number(totalPosts.count) / limit)

  if (page === null) {
    req.totalPages = totalPages
    return next()
  }

  if ((totalPages > 0 && page > totalPages) || page < 1) {
    return res.status(404).json({ message: "Page not found." })
  }

  req.totalPages = totalPages
  return next()
}

export async function paginatedResults(
  req: CustomParamsQueryRequest<{ id?: string }, pagination>,
  res: Response,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const totalPages = <number>req.totalPages
  const offset = (page - 1) * limit
  const { id } = req.params

  let posts: PostJoinUser[] | undefined

  try {
    if (typeof id !== "undefined") {
      posts = await getPostsFromDatabase({ id, limit, offset })
    } else {
      posts = await getPostsFromDatabase({ limit, offset })
    }
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }

  if (typeof posts === "undefined") {
    return res.status(500).json({ message: "Server internal error." })
  }

  const results: PostResponse[] = posts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      image: {
        name: post.image_name,
        url: <string>post.image,
      },
      description: post.description,
      user: {
        id: post.user_id,
        name: post.user_name,
        image: post.user_image,
        email: post.user_email,
      },
      category: {
        id: post.category_id,
        name: <string>post.category_name,
      },
    }
  })

  req.paginatedPosts = {
    totalPages,
    currentPage: totalPages === 0 ? 0 : page,
    results,
  }
  next()
}

export async function checkIfPostExits(
  req: CustomParamsRequest<{ id?: string }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params

  const { response } = await isInTheDataBase<Post>(
    { id: Number(id) },
    "post"
  )

  if (!response) {
    return res.status(404).json({ mensagem: "Post not found." })
  }

  return next()
}

export async function checkIfPostBelongsToUser(
  req: CustomParamsRequest<{ id?: string }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params
  const { id: user_id } = <User>req.loggedUser

  const { response } = await isInTheDataBase<Post>(
    { id: Number(id), user_id },
    "post"
  )

  if (!response) {
    return res
      .status(403)
      .json({ mensagem: "Post doesn't belong to the logged user." })
  }

  return next()
}
