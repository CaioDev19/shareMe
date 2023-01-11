import { Response, NextFunction } from "express"
import {
  CustomBodyRequest,
  CustomParamsQueryRequest,
  pagination,
  CustomParamsRequest,
  filter,
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
  req: CustomParamsQueryRequest<{ id?: string }, pagination & filter>,
  res: Response,
  next: NextFunction
) {
  const page = req.query.page ? Number(req.query.page) : null
  const limit = Number(req.query.limit) || 10
  const { categoryId } = req.query
  const category = Number(categoryId)
  const { id } = req.params

  let totalPosts:
    | {
        count: string
      }
    | undefined

  if (typeof id !== "undefined") {
    const condition =
      category && category !== 0
        ? { user_id: id, category_id: categoryId }
        : { user_id: id }

    totalPosts = <
      | {
          count: string
        }
      | undefined
    >await knex<Post>("post").where(condition).count("*").first()
  } else {
    const condition =
      category && category !== 0 ? { category_id: categoryId } : {}

    totalPosts = <
      | {
          count: string
        }
      | undefined
    >await knex<Post>("post").where(condition).count("*").first()
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
  req: CustomParamsQueryRequest<{ id?: string }, pagination & filter>,
  res: Response,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const { categoryId } = req.query
  const category = Number(categoryId)
  const totalPages = <number>req.totalPages
  const offset = (page - 1) * limit
  const { id } = req.params

  let posts: PostJoinUser[] | undefined

  try {
    if (typeof id !== "undefined") {
      const condition =
        category && category !== 0
          ? { user_id: id, category_id: categoryId }
          : { user_id: id }

      posts = await getPostsFromDatabase({ condition, limit, offset })
    } else {
      const condition =
        category && category !== 0 ? { category_id: categoryId } : {}

      posts = await getPostsFromDatabase({ limit, offset, condition })
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
