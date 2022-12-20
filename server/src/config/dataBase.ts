import { knex, Knex } from "knex"

export default knex<Knex>({
  client: "pg",
  connection: {
    host: process.env.HOST,
    port: Number(process.env.DBPORT),
    user: process.env.USER,
    password: String(process.env.PASSWORD),
    database: process.env.DATABASE,
  },
})
