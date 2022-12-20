import knex from "../config/dataBase"

type tables = "user"

interface DbResponse {
  response: boolean
  data?: any
}

export async function isInTheDataBase(
  data: object,
  table: tables
): Promise<DbResponse> {
  try {
    const queryRes = await knex(table).where(data)

    if (queryRes.length > 0) {
      return {
        response: true,
        data: queryRes[0],
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
