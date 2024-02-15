const service = require("./users.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function listUsers(req, res, next) {
  const users = await service.listUsers()
  res.json({ data: users })
}

module.exports = {
  listUsers: asyncErrorBoundary(listUsers),
}
