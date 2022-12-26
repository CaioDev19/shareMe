import { Response, NextFunction } from "express"
import {
  CustomBodyRequest,
  CustomParamsQueryRequest,
  pagination,
} from "../interfaces/express"
import { isInTheDataBase } from "../utils/db"
import { ValidationPost } from "../validators/postSchema"
import { Category, Post } from "../interfaces/db"
import knex from "../config/dataBase"
import { convertToBase64Url } from "../utils/convert"

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

  let posts: Post[] | undefined

  if (typeof id !== "undefined") {
    try {
      posts = await knex<Post>("post")
        .innerJoin("category", "category.id", "post.category_id")
        .innerJoin("user", "user.id", "post.user_id")
        .select(
          "post.*",
          "category.name as category_name",
          "user.name as user_name",
          "user.image as user_image"
        )
        .where({ user_id: id })
        .limit(limit)
        .offset(offset)
        .orderBy("post.id", "desc")
        .debug(true)
    } catch {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }
  } else {
    try {
      posts = await knex<Post>("post")
        .join("category", "category.id", "post.category_id")
        .select("post.*", "category.name as category_name")
        .innerJoin("user", "user.id", "post.user_id")
        .select(
          "post.*",
          "category.name as category_name",
          "user.name as user_name",
          "user.image as user_image"
        )
        .limit(limit)
        .offset(offset)
        .orderBy("post.id", "desc")
        .debug(true)
    } catch {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }
  }

  if (typeof posts === "undefined") {
    return res.status(500).json({ message: "Server internal error." })
  }

  posts.forEach((post) => {
    post.image = convertToBase64Url(<Buffer>post.image)
  })

  req.paginatedPosts = {
    totalPages,
    currentPage: totalPages === 0 ? 0 : page,
    results: posts,
  }
  next()
}
