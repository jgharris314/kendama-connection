const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("../services/calendar_events")

async function listEvents(req, res, next) {
  const calendar_events = await service.listEvents()
  res.json(calendar_events)
}

async function post(req, res, next) {
  const data = req.body

  res.status(201).json({
    data: await service.post(data),
  })
}

module.exports = {
  listEvents: asyncErrorBoundary(listEvents),
  post: [asyncErrorBoundary(post)],
}
