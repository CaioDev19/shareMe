import express from "express"
import { listAllCategories } from "../controllers/category"

const router: express.Router = express.Router()

router.get("/", listAllCategories)

export default router
