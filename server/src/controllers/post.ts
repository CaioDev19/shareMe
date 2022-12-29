import { Response } from "express"
import knex from "../config/dataBase"
import {
  CustomBodyRequest,
  CustomParamsQueryRequest,
  CustomParamsRequest,
  CustomQueryRequest,
  pagination,
} from "../interfaces/express"
import { ValidationPost } from "../validators/postSchema"
import { convertToBase64Url } from "../utils/convert"
import { compressFile } from "../utils/file"
import {
  Post,
  User,
  Comment,
  CommentJoinUser,
} from "../interfaces/db"
import {
  commentResponse,
  PostDetail,
  PostResponse,
} from "../interfaces/response"

export async function makePost(
  req: CustomBodyRequest<ValidationPost>,
  res: Response<PostResponse | { message: string }>
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

    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    newPost[0].image = convertToBase64Url(<Buffer>newPost[0].image)

    const response: PostResponse = {
      id: newPost[0].id,
      title: newPost[0].title,
      image: {
        name: newPost[0].image_name,
        data: newPost[0].image,
      },
      description: newPost[0].description,
      user: {
        id: user.id,
        name: user.name,
        image: <string>user.image,
      },
      category: {
        id: category_id,
        name: <string>req.category_name,
      },
    }

    return res.status(201).json(response)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function listPosts(
  req: CustomQueryRequest<pagination>,
  res: Response<typeof req.paginatedPosts>
) {
  res.status(200).json(req!.paginatedPosts)
}

export async function listUserPosts(
  req: CustomParamsQueryRequest<{ id?: string }, pagination>,
  res: Response<typeof req.paginatedPosts>
) {
  res.status(200).json(req!.paginatedPosts)
}

export async function listPostById(
  req: CustomParamsRequest<{ id?: string }>,
  res: Response<PostDetail | { message: string }>
) {
  const { id } = req.params

  try {
    const post = await knex<Post>("post")
      .select(
        "post.*",
        "category.name as category_name",
        "user.name as user_name",
        "user.image as user_image"
      )
      .innerJoin("category", "category.id", "post.category_id")
      .innerJoin("user", "user.id", "post.user_id")
      .where("post.id", Number(id))
      .first()

    const comments = await knex<CommentJoinUser>("comment")
      .select(
        "comment.id",
        "comment.description as text",
        "comment.user_id",
        "user.name as user_name",
        "user.image as user_image"
      )
      .innerJoin("user", "user.id", "comment.user_id")
      .where("comment.post_id", Number(id))
      .orderBy("comment.id", "asc")

    if (
      typeof post === "undefined" ||
      typeof comments === "undefined"
    ) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    post.image = convertToBase64Url(<Buffer>post.image)

    const formatedComments: commentResponse[] = comments.map(
      (comment) => {
        return {
          id: comment.id,
          text: comment.text,
          user: {
            id: comment.user_id,
            name: comment.user_name,
            image: comment.user_image,
          },
        }
      }
    )

    const response: PostDetail = {
      id: post.id,
      title: post.title,
      image: {
        name: post.image_name,
        data: post.image,
      },
      description: post.description,
      user: {
        id: post.user_id,
        name: post.user_name,
        image: <string>post.user_image,
      },
      category: {
        id: post.category_id,
        name: post.category_name,
      },
      comments: formatedComments,
    }

    return res.status(200).json(response)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function createComment(
  req: CustomBodyRequest<{ description: string }>,
  res: Response
) {
  const { description } = req.body
  const user = <User>req.loggedUser
  const { id } = req.params

  try {
    const comment = await knex<Comment>("comment")
      .insert({
        description,
        user_id: user.id,
        post_id: Number(id),
      })
      .returning("*")

    if (!comment) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    const response: commentResponse = {
      id: comment[0].id,
      text: comment[0].description,
      user: {
        id: user.id,
        name: user.name,
        image: <string>user.image,
      },
    }

    return res.status(201).json(response)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}
