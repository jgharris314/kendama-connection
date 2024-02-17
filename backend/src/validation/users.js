const service = require("../services/users")

async function validateUserData(req, res, next) {
  const data = req.body.data
  console.dir(data, { depth: null })

  const keysToCheck = ["username", "password", "password_confirmation", "email"]

  for (key of keysToCheck) {
    if (!data[key]) {
      return next({ status: 400, message: `${key} is missing` })
    }
  }

  const isValidPassword =
    /^(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/
  if (!isValidPassword.test(data.password)) {
    return next({
      status: 400,
      message:
        "password must contain at least 12 characters with at least 1 number and 1 special character",
    })
  }

  if (data.password !== data.password_confirmation) {
    return next({
      status: 400,
      message: "password and password confirmation do not match",
    })
  }

  const getUserByEmail = await service.getUserByEmail(data.email)
  if (getUserByEmail) {
    return next({
      status: 400,
      message: "email already in use",
    })
  }

  const getUserByUsername = await service.getUserByUsername(data.username)
  if (getUserByUsername) {
    return next({
      status: 400,
      message: "username already in use",
    })
  }
  next()
}

module.exports = { validateUserData }
