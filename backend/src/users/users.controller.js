const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./users.service")
const validation = require("./users.validation")

async function listUsers(req, res, next) {
  const users = await service.listUsers()
  res.json({ data: users })
}

async function post(req, res, next) {
  res.status(201).json({ data: await service.post(req.body.data) })
}

module.exports = {
  listUsers: asyncErrorBoundary(listUsers),
  post: [validation.validateUserData, asyncErrorBoundary(post)],
}
