const asyncErrorBoundary = require("../../errors/asyncErrorBoundary")
const service = require("../../services/calendar_events")
const userService = require("../../services/users")
const { validateCalendarEventData } = require("../../validation/calendarEvent")
const { getIntervalEvents } = require("./functions")
const { restoreOneUserCalendarEventCreation } = require("../users/functions")

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

async function listEventsByUserId(req, res, next) {
  const { user_id } = req.params

  const events = await service.listEventsByUserId(user_id)

  res.status(200).json(events)
}

async function getEventById(req, res, next) {
  const { calendar_event_id } = req.params

  const event = await service.getEventById(calendar_event_id)

  res.status(200).json(event)
}

async function post(req, res, next) {
  const data = req.body

  const { user_id } = data

  const userInfo = await userService.getUserById(user_id)
  if (!userInfo.remaining_calendar_event_creations) {
    return next({
      status: 400,
      message: "User has used all event creations for the month",
    })
  }

  const updatedData = {
    ...userInfo,
    remaining_calendar_event_creations:
      userInfo.remaining_calendar_event_creations - 1,
  }

  const updatedUser = await userService.update(user_id, updatedData)

  if (updatedUser.user_id) {
    res.status(201).json({
      data: await service.post(data),
    })
  }
}

async function getEventLocations(req, res, next) {
  const locations = await service.getEventLocations()

  const modified = locations.map(
    ({ location_city_state }) => location_city_state
  )

  return res.status(200).json([...new Set(modified)])
}

async function put(req, res, next) {
  res.status(201).json({
    data: await service.put(req.body),
  })
}

async function deleteEvent(req, res, next) {
  const { calendar_event_id } = req.params
  const user_id = await service.getEventCreatorUserId(calendar_event_id)

  const deleted = await service.destroy(calendar_event_id)

  await restoreOneUserCalendarEventCreation(user_id[0].user_id)

  res.status(204).json({
    data: deleted,
  })
}

module.exports = {
  listEvents: asyncErrorBoundary(listEvents),
  listEventsByUserId: asyncErrorBoundary(listEventsByUserId),
  post: [validateCalendarEventData, asyncErrorBoundary(post)],
  put: [validateCalendarEventData, asyncErrorBoundary(put)],
  getEventLocations: asyncErrorBoundary(getEventLocations),
  delete: asyncErrorBoundary(deleteEvent),
  getEventById: asyncErrorBoundary(getEventById),
}
