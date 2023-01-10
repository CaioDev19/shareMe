import express from "express"
import { upload } from "../config/multerConfig"
import {
  createComment,
  deletePost,
  listPostById,
  listPosts,
  listUserPosts,
  makePost,
} from "../controllers/post"
import {
  checkIfCategoryExists,
  checkIfPostBelongsToUser,
  checkIfPostExits,
  checkIfThePageExists,
  paginatedResults,
} from "../middlewares/post"
import { doesTheUserExist } from "../middlewares/user"
import { validade } from "../middlewares/validade"
import { commentSchema } from "../validators/commentSchema"
import { postSchmea } from "../validators/postSchema"

const router: express.Router = express.Router()

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

router
  .route("/:id")
  .get(
    doesTheUserExist,
    checkIfThePageExists,
    paginatedResults,
    listUserPosts
  )
  .delete(checkIfPostExits, checkIfPostBelongsToUser, deletePost)

router.post(
  "/:id/comment",
  checkIfPostExits,
  validade(commentSchema),
  createComment
)

export default router
