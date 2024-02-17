const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("../services/users")
const validation = require("../validation/users")

async function listUsers(req, res, next) {
  const users = await service.listUsers()
  res.json({ data: users })
}

async function getUserByUsername(req, res, next) {
  res.json({ data: await service.getUserById(req.params.username) })
}

async function post(req, res, next) {
  const data = { ...req.body.data }
  delete data.password_confirmation
  res.status(201).json({
    data: await service.post(data),
  })
}

module.exports = {
  getUserByUsername: asyncErrorBoundary(getUserByUsername),
  listUsers: asyncErrorBoundary(listUsers),
  post: [validation.validateUserData, asyncErrorBoundary(post)],
}
