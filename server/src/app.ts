require("dotenv").config()
import express from "express"
import routes from "./routes"

const app: express.Application = express()

app.use(express.json())

app.use(routes)

app.listen(8000)
