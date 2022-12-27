import knex from "../config/dataBase"
import { Post } from "../interfaces/db"

type tables = "user" | "category" | "post" | "comment"

interface DbResponse<T> {
  response: boolean
  data?: T
}

export async function isInTheDataBase<T>(
  data: object,
  table: tables
): Promise<DbResponse<T>> {
  try {
    const queryRes = await knex(table).where(data)

    if (queryRes.length > 0) {
      return {
        response: true,
        data: <T>queryRes[0],
      }
    }

    return {
      response: false,
    }
  } catch (error) {
    return {
      response: false,
    }
  }
}

interface FuncProps {
  id?: string
  limit: number
  offset: number
}

export async function getPostsFromDatabase({
  id,
  limit,
  offset,
}: FuncProps): Promise<Post[]> {
  let query = knex<Post>("post")
    .select(
      "post.*",
      "category.name as category_name",
      "user.name as user_name",
      "user.image as user_image"
    )
    .innerJoin("category", "category.id", "post.category_id")
    .innerJoin("user", "user.id", "post.user_id")
    .limit(limit)
    .offset(offset)
    .orderBy("post.id", "desc")
    .debug(true)

  if (typeof id !== "undefined") {
    query = query.where({ user_id: id })
  }

  return await query
}
