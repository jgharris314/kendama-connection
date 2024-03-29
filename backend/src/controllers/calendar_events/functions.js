const moment = require("moment")
const { addXMonths, addXWeeks } = require("../../lib/date")

function getIntervalEvents(calendarEvent) {
  const limit = 12
  const addedEvents = []

  const tempStart = new Date(calendarEvent.start_date)
  const tempEnd = new Date(calendarEvent.end_date)
  const modifiedEvent = {
    ...calendarEvent,
    start_date: moment(tempStart).toDate(),
    end_date: moment(tempEnd).toDate(),
  }

  const startDate = modifiedEvent.start_date
  const endDate = modifiedEvent.end_date

  if (calendarEvent.interval === "weekly") {
    for (let i = 0; i < limit; i++) {
      addedEvents.push({
        ...modifiedEvent,
        start_date: addXWeeks(startDate, i),
        end_date: addXWeeks(endDate, i),
      })
    }
  } else if (calendarEvent.interval === "monthly") {
    for (let i = 0; i < limit; i++) {
      addedEvents.push({
        ...modifiedEvent,
        start_date: addXMonths(startDate, i),
        end_date: addXMonths(endDate, i),
      })
    }
  } else {
    addedEvents.push(modifiedEvent)
  }
  return addedEvents
}

module.exports = { getIntervalEvents }
