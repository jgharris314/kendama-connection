const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("../services/users")
const bcrypt = require("bcrypt")

async function login(req, res, next) {
  try {
    const { username, password } = req.body
    const user = await service.getUserByUsername(username)

    if (!user) {
      return next({ status: 400, message: "Invalid username" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return next({ status: 400, message: "Invalid username or password" })
    }

    req.session.user = { id: user.user_id, username: user.username }

    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        username: user.username,
        userID: user.user_id,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Error in login:", error)
    return next({ status: 500, message: "Failed to log in" })
  }
}

async function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      return next({ status: 500, message: "Failed to log out." })
    } else {
      return res.status(200).json({ message: "Logged out successfully" })
    }
  })
}

async function current(req, res, next) {
  if (req.session && req.session.user) {
    const username = req.session.user.username
    try {
      const user = await userServices.getUserByUsername(username)

      if (!user) {
        return next({ status: 404, message: "user not found" })
      }

      // Respond with combined data
      const modified = { ...user }
      delete modified.password
      res.status(200).json({
        user: modified,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      return next({ status: 500, message: "Internal server error" })
    }
  } else {
    return next({ status: 401, message: "Not authenticated" })
  }
}

module.exports = {
  login: asyncErrorBoundary(login),
  logout: asyncErrorBoundary(logout),
  current: asyncErrorBoundary(current),
}
