const asyncErrorBoundary = require("../../errors/asyncErrorBoundary")
const service = require("../../services/calendar_events")
const { validateCalendarEventData } = require("../../validation/calendarEvent")
const { getIntervalEvents } = require("./functions")

async function listEvents(req, res, next) {
  const { location_city_state } = req.params

  const calendarEvents =
    location_city_state === "all"
      ? await service.listAllEvents()
      : await service.getEventByLocation(location_city_state)

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

async function getEventLocations(req, res, next) {
  const locations = await service.getEventLocations()

  const modified = locations.map(
    ({ location_city_state }) => location_city_state
  )

  return res.status(200).json([...new Set(modified)])
}

module.exports = {
  listEvents: asyncErrorBoundary(listEvents),
  post: [validateCalendarEventData, asyncErrorBoundary(post)],
  getEventLocations: asyncErrorBoundary(getEventLocations),
}
