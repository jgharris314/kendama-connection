const express = require("express")
const router = express.Router()
const userServices = require("../services/users")
const bcrypt = require("bcrypt")

router.post("/login", async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = await userServices.getUserByUsername(username)

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password" })
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
    return res.status(500).json({ error: "Failed to log in." })
  }
})

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." })
    } else {
      return res.status(200).json({ message: "Logged out successfully" })
    }
  })
})

router.get("/current", async (req, res) => {
  if (req.session && req.session.user) {
    const username = req.session.user.username
    try {
      const user = await userServices.getUserByUsername(username)

      if (!user) {
        return res.status(404).send("User not found")
      }

      // Respond with combined data
      const modified = { ...user }
      delete modified.password
      res.status(200).json({
        user: modified,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      res.status(500).send("Internal Server Error")
    }
  } else {
    res.status(401).send("Not authenticated")
  }
})

module.exports = router
