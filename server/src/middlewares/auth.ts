import { verifyTokenJwt } from "../utils/jwt"
import { isInTheDataBase } from "../utils/db"
import { NextFunction, Response } from "express"
import { CustomRequest } from "../interfaces/express"
import { User } from "../interfaces/db"

export async function checkToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const headerAuth = req.headers.authorization

  if (!headerAuth)
    return res.status(401).json({ message: "Token must be sent." })

  const token = headerAuth.split(" ")[1]

  try {
    const payLoad: { id: string } = await verifyTokenJwt(
      token,
      <string>process.env.JWTSECRETKEY
    )

    if (!payLoad) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    const { data, response } = await isInTheDataBase<User>(
      { id: payLoad.id },
      "user"
    )

    if (!response) {
      return res.status(401).json({
        message:
          "To access this feature, a valid authentication token must be submitted.",
      })
    }

    req.loggedUser = data
    return next()
  } catch {
    return res.status(401).json({
      message:
        "To access this feature, a valid authentication token must be submitted.",
    })
  }
}
