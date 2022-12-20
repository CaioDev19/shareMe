import express from "express"
import { logUserIn } from "../controllers/user"
import { doesTheUserExist } from "../middlewares/user"
import { validade } from "../middlewares/validade"
import { userSchema } from "../validators/userSchema"

const router: express.Router = express.Router()

router.post("/", validade(userSchema), doesTheUserExist, logUserIn)

export default router
