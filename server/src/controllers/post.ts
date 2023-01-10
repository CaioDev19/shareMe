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
import {
  Post,
  User,
  Comment,
  CommentJoinUser,
  PostJoinUser,
} from "../interfaces/db"
import {
  commentResponse,
  PostDetail,
  PostResponse,
} from "../interfaces/response"
import { uniqueName } from "../utils/convert"
import { deleteFile, uploadFile } from "../utils/storage"

export async function makePost(
  req: CustomBodyRequest<ValidationPost>,
  res: Response
) {
  const { title, description, category_id } = req.body.data
  const user = <User>req.loggedUser

  try {
    const image = await uploadFile(req.file!)

    const newPost = await knex<Post>("post")
      .insert({
        title,
        image_name: image.Key,
        image: image.Location,
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

    const response: PostResponse = {
      id: newPost[0].id,
      title: newPost[0].title,
      image: {
        name: newPost[0].image_name,
        url: newPost[0].image,
      },
      description: newPost[0].description,
      user,
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
  res: Response
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
  res: Response
) {
  const { id } = req.params

  try {
    const post: PostJoinUser = await knex<PostJoinUser>("post")
      .select(
        "post.*",
        "category.name as category_name",
        "user.name as user_name",
        "user.image as user_image",
        "user.email as user_email"
      )
      .innerJoin("category", "category.id", "post.category_id")
      .innerJoin("user", "user.id", "post.user_id")
      .where("post.id", Number(id))
      .first()

    const comments: CommentJoinUser[] = await knex<CommentJoinUser>(
      "comment"
    )
      .select(
        "comment.id",
        "comment.description",
        "comment.user_id",
        "user.name as user_name",
        "user.image as user_image",
        "user.email as user_email"
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

    const formatedComments: commentResponse[] = comments.map(
      (comment) => {
        return {
          id: comment.id,
          description: comment.description,
          user: {
            id: comment.user_id,
            name: comment.user_name,
            image: comment.user_image,
            email: comment.user_email,
          },
        }
      }
    )

    const response: PostDetail = {
      id: post.id,
      title: post.title,
      image: {
        name: post.image_name,
        url: post.image,
      },
      description: post.description,
      user: {
        id: post.user_id,
        name: post.user_name,
        image: <string>post.user_image,
        email: post.user_email,
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
      description: comment[0].description,
      user: {
        id: user.id,
        name: user.name,
        image: <string>user.image,
        email: user.email,
      },
    }

    return res.status(201).json(response)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function deletePost(
  req: CustomParamsRequest<{ id?: string }>,
  res: Response
) {
  const { id } = req.params
  const user = <User>req.loggedUser

  try {
    const deletedComments = await knex<Comment>("comment")
      .delete()
      .where({ post_id: Number(id) })

    const deletedPost = await knex<Post>("post")
      .delete()
      .where({ id: Number(id) })
      .andWhere({ user_id: user.id })
      .returning("*")

    if (
      typeof deletedPost === "undefined" ||
      typeof deletedComments === "undefined"
    ) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    const deleteObjectBucket = await deleteFile(
      deletedPost[0].image_name
    )

    if (!deleteObjectBucket) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}
