function validateCalendarEventData(req, res, next) {
  const data = req.body

  const keysToCheck = [
    "title",
    "start_date",
    "end_date",
    "location_name",
    "location_city_state",
    "user_id",
    "hostec_by",
  ]

  for (key of keysToCheck) {
    if (!data[key]) {
      return next({ status: 400, message: `${key} is missing` })
    }
  }

  const startDate = new Date(data.start_date)
  const endDate = new Date(data.end_date)

  if (startDate > endDate) {
    return next({ status: 400, message: "start date must be before end date" })
  }

  next()
}

module.exports = {
  validateCalendarEventData,
}
