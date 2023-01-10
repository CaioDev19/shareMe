require("dotenv").config()

import cors from "cors"
import express from "express"
import routes from "./routes"

const app: express.Application = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
)
