const service = require("../services/calendar_events")
const { getDifferenceInDays } = require("../lib/date")

async function removeOutdatedOneOffEvents() {
  const maxAgeInDays = 90
  const oneOffEvents = await service.getEventsByInterval("one-off")
  const today = new Date()

  oneOffEvents.forEach(async (calendar_event) => {
    try {
      const eventEndDate = new Date(calendar_event.end_date)
      const differenceInDays = getDifferenceInDays(today, eventEndDate)

      if (differenceInDays >= maxAgeInDays) {
        console.log("removing event id: ", calendar_event.calendar_event_id)
        await service.destroy(calendar_event.calendar_event_id)
      }
    } catch (error) {
      throw error
    }
  })

  return `One off events older than ${maxAgeInDays} days removed`
}

module.exports = {
  removeOutdatedOneOffEvents,
}
