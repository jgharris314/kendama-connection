const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const service = require("./services/userAccountsServices")

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await service.read(username)

      if (!user) {
        return done(null, false, { message: "Incorrect username." })
      }

      if (!service.validatePassword(user, password)) {
        return done(null, false, { message: "Incorrect password." })
      }

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.userID)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await service.read(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
