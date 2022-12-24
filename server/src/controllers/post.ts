import { Response } from "express"
import knex from "../config/dataBase"
import {
  CustomBodyRequest,
  CustomParamsQueryRequest,
  CustomQueryRequest,
} from "../interfaces/express"
import { ValidationPost } from "../validators/postSchema"
import { convertToBase64Url } from "../utils/convert"
import { deleteFile, compressFile } from "../utils/file"
import { Post, User } from "../interfaces/db"

export async function makePost(
  req: CustomBodyRequest<ValidationPost>,
  res: Response
) {
  const { title, description, category_id } = req.body.data
  const user = <User>req.loggedUser

  try {
    const imageBuffer = await compressFile(req.file!.path)

    const newPost = await knex<Post>("post")
      .insert({
        title,
        image_name: req.file!.originalname,
        image: imageBuffer,
        description: description && description,
        user_id: user.id,
        category_id,
      })
      .returning("*")

    await deleteFile(req.file!.path)

    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    newPost[0].image = convertToBase64Url(<Buffer>newPost[0].image)

    return res.status(201).json({
      ...newPost[0],
      category_name: req.category_name,
    })
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function listPosts(
  req: CustomQueryRequest<{
    page: string
    limit: string
  }>,
  res: Response
) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20

  try {
    const posts = await knex<Post>("post")
      .join("category", "category.id", "post.category_id")
      .select("post.*", "category.name as category_name")
      .limit(limit)
      .offset((page - 1) * limit)
      .debug(true)

    if (typeof posts === "undefined") {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    posts.forEach((post) => {
      post.image = convertToBase64Url(<Buffer>post.image)
    })

    res.status(200).json(posts)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function listUserPosts(
  req: CustomParamsQueryRequest<
    { id: string },
    {
      page: string
      limit: string
    }
  >,
  res: Response
) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const { id } = req.params

  try {
    const posts = await knex<Post>("post")
      .join("category", "category.id", "post.category_id")
      .select("post.*", "category.name as category_name")
      .where({ user_id: id })
      .limit(limit)
      .offset((page - 1) * limit)
      .debug(true)

    if (typeof posts === "undefined") {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    posts.forEach((post) => {
      post.image = convertToBase64Url(<Buffer>post.image)
    })

    res.status(200).json(posts)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}
