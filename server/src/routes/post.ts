import express from "express"
import multer from "multer"
import { storage } from "../config/multerConfig"
import {
  createComment,
  listPostById,
  listPosts,
  listUserPosts,
  makePost,
} from "../controllers/post"
import {
  checkIfCategoryExists,
  checkIfPostExits,
  checkIfThePageExists,
  paginatedResults,
} from "../middlewares/post"
import { doesTheUserExist } from "../middlewares/user"
import { validade } from "../middlewares/validade"
import { commentSchema } from "../validators/commentSchema"
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
  .get(checkIfThePageExists, paginatedResults, listPosts)

router.get("/detail/:id", checkIfPostExits, listPostById)

router.get(
  "/:id",
  doesTheUserExist,
  checkIfThePageExists,
  paginatedResults,
  listUserPosts
)

router.post(
  "/:id/comment",
  checkIfPostExits,
  validade(commentSchema),
  createComment
)

export default router
