const path = require("path")

require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const express = require("express")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const knex = require("./db/connection")
const passport = require("passport")

const errorHandler = require("./errors/errorHandler")
const notFound = require("./errors/notFound")
const usersRouter = require("./routers/users")
const authRouter = require("./routers/auth")

const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 3600000,
      httpOnly: true,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/users", usersRouter)
app.use("/auth", authRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
