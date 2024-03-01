const userService = require("../services/users")
const { MembershipCreationLimits } = require("../constants")

async function restoreUserCalendarEventCreations() {
  const allUsers = await userService.listUsers()

  for (user of allUsers) {
    const modifiedData = {
      ...user,
      remaining_calendar_event_creations:
        MembershipCreationLimits[user.membership_type],
    }

    await userService.update(user.user_id, modifiedData)
  }

  return "User restoration complete"
}

module.exports = {
  restoreUserCalendarEventCreations,
}
