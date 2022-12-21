import express from "express"
import loginRouter from "./login"
import categoryRouter from "./category"
import { checkToken } from "../middlewares/auth"

const router: express.Router = express.Router()

router.use("/login", loginRouter)

router.use(checkToken)

router.use("/category", categoryRouter)

export default router
