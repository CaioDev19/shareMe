import { Response } from "express"
import {
  CustomBodyRequest,
  CustomParamsRequest,
} from "../interfaces/express"
import { signJwt } from "../utils/jwt"
import { User } from "../interfaces/db"
import knex from "../config/dataBase"

export async function logUserIn(
  req: CustomBodyRequest<User>,
  res: Response
) {
  const { id } = req.body

  try {
    const token = await signJwt(
      { id },
      <string>process.env.JWTSECRETKEY,
      {
        expiresIn: "8h",
      }
    )

    return res.status(200).json({
      user: <User>req.userData,
      token: token,
    })
  } catch (error) {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function getUserInformation(
  req: CustomParamsRequest<{ id: string }>,
  res: Response
) {
  const { id } = req.params

  try {
    const user = await knex<User>("user").where({ id }).first()

    if (typeof user === "undefined") {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    return res.status(200).json(user)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}
