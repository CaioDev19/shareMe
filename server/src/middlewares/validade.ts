import { Request, Response, NextFunction } from "express"
import { z, AnyZodObject } from "zod"
import { generateErrorMessage, ErrorMessageOptions } from "zod-error"

const options: ErrorMessageOptions = {
  maxErrors: 1,
  delimiter: {
    component: " ",
  },
  path: {
    enabled: true,
    type: "objectNotation",
    label: "Error - ",
  },
  code: {
    enabled: false,
  },
  message: {
    enabled: true,
    label: "",
  },
}

export function validade(schema: AnyZodObject) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        file: req.file,
      })
      return next()
    } catch (error: any) {
      return res.status(400).json({
        message: generateErrorMessage(error.issues, options),
      })
    }
  }
}
