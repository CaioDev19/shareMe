import { Response, Request } from "express"
import knex from "../config/dataBase"
import { Category } from "../interfaces/db"

export async function listAllCategories(
  _req: Request,
  res: Response
) {
  try {
    const response = await knex<Category>("category")
    res.status(200).json(response)
  } catch {
    res.status(500).json({ message: "Server internal error." })
  }
}
