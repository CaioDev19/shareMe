import express from "express"
import multer from "multer"
import { storage } from "../config/multerConfig"
import { listPosts, makePost } from "../controllers/post"
import { checkIfCategoryExists } from "../middlewares/post"
import { validade } from "../middlewares/validade"
import { postSchmea } from "../validators/postSchema"

const router: express.Router = express.Router()
const upload = multer({ storage })

router
  .route("/")
  .post(
    upload.single("image"),
    validade(postSchmea),
    checkIfCategoryExists,
    makePost
  )
  .get(listPosts)

export default router
