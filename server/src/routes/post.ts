import express from "express"
import multer from "multer"
import { storage } from "../config/multerConfig"
import { makePost } from "../controllers/post"
import { validade } from "../middlewares/validade"
import { postSchmea } from "../validators/postSchema"

const router: express.Router = express.Router()
const upload = multer({ storage })

router.post(
  "/",
  upload.single("image"),
  validade(postSchmea),
  makePost
)

export default router
