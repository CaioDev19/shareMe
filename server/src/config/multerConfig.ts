import multer from "multer"
import path from "path"

export const storage = multer.diskStorage({
  destination: (_req, _file, callBack): void => {
    callBack(null, path.resolve("./src/uploads"))
  },
  filename: (_req, file, callBack): void => {
    const time = new Date().getTime()

    callBack(null, `${time}_${file.originalname}`)
  },
})
