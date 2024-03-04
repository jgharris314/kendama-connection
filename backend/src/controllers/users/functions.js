const userService = require("../../services/users")

async function restoreOneUserCalendarEventCreation(user_id) {
  const user = await userService.getUserById(user_id)

  const modifiedData = {
    ...user,
    remaining_calendar_event_creations:
      (user.remaining_calendar_event_creations += 1),
  }

  await userService.update(user.user_id, modifiedData)
}

module.exports = { restoreOneUserCalendarEventCreation }
