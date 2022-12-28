import express from "express"
import { getUserInformation } from "../controllers/user"
import { doesTheUserExist } from "../middlewares/user"

const router: express.Router = express.Router()

router.get("/:id", doesTheUserExist, getUserInformation)

export default router
