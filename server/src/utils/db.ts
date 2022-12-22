import knex from "../config/dataBase"

type tables = "user" | "category"

interface DbResponse<T> {
  response: boolean
  data?: T
}

export async function isInTheDataBase<T extends object>(
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
