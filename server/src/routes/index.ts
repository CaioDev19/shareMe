import express from "express"
import loginRouter from "./login"

const router: express.Router = express.Router()

router.use("/login", loginRouter)

export default router
