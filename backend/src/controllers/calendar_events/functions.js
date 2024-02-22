const { addXMonths, addXWeeks } = require("../../lib/date")

function getIntervalEvents(calendarEvent) {
  const addedEvents = []
  if (calendarEvent.interval === "weekly") {
    const modifiedEvent = {
      ...calendarEvent,
      start_date: new Date(calendarEvent.start_date),
      end_date: new Date(calendarEvent.end_date),
    }
    const limit = 12
    const startDate = new Date(calendarEvent.start_date)
    const endDate = new Date(calendarEvent.end_date)
    for (let i = 0; i < limit; i++) {
      addedEvents.push({
        ...modifiedEvent,
        start_date: addXWeeks(startDate, i),
        end_date: addXWeeks(endDate, i),
      })
    }
  } else if (calendarEvent.interval === "monthly") {
    const modifiedEvent = {
      ...calendarEvent,
      start_date: new Date(calendarEvent.start_date),
      end_date: new Date(calendarEvent.end_date),
    }
    const limit = 12
    const startDate = new Date(calendarEvent.start_date)
    const endDate = new Date(calendarEvent.end_date)
    for (let i = 0; i < limit; i++) {
      addedEvents.push({
        ...modifiedEvent,
        start_date: addXMonths(startDate, i),
        end_date: addXMonths(endDate, i),
      })
    }
  } else {
    addedEvents.push(calendarEvent)
  }

  return addedEvents
}

module.exports = { getIntervalEvents }
