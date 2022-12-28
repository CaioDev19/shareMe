import express from "express"
import loginRouter from "./login"
import categoryRouter from "./category"
import postRouter from "./post"
import userRouter from "./user"

import { checkToken } from "../middlewares/auth"

const router: express.Router = express.Router()

router.use("/login", loginRouter)

router.use(checkToken)

router.use("/category", categoryRouter)
router.use("/post", postRouter)
router.use("/user", userRouter)

export default router
