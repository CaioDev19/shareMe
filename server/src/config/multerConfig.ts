import multer from "multer"
import path from "path"

export const storage = multer.diskStorage({
  destination: (req, file, callBack): void => {
    callBack(null, path.resolve("./src/uploads"))
  },
  filename: (req, file, callBack): void => {
    const time = new Date().getTime()

    callBack(null, `${time}_${file.originalname}`)
  },
})
