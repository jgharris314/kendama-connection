const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const cron = require("node-cron")
const calendarEventCronJobs = require("./cron/calendar_events")
const userCron = require("./cron/user")
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
const calendarEventsRouter = require("./routers/calendar_events")

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
app.use("/calendarEvents", calendarEventsRouter)

app.use(notFound)
app.use(errorHandler)

cron.schedule("0 0 0 * * *", async () => {
  const job = await calendarEventCronJobs.removeOutdatedOneOffEvents()
  console.log(job)
})

cron.schedule("0 0 1 * *", async () => {
  const job = await userCron.restoreUserCalendarEventCreations()
  console.log(job)
})

module.exports = app
