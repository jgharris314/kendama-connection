const asyncErrorBoundary = require("../../errors/asyncErrorBoundary")
const service = require("../../services/calendar_events")
const { getIntervalEvents } = require("./functions")

async function listEvents(req, res, next) {
  const calendarEvents = await service.listEvents()

  const modifedEvents = calendarEvents.map((calendarEvent) => {
    return getIntervalEvents(calendarEvent)
  })

  res.json(modifedEvents.flat(1))
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
