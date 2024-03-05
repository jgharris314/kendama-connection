import { IUseUser } from "pages/auth/hooks/useUser"

export function getLoggedInStatus(data: IUseUser) {
  if (data) {
    if (data.message) {
      return data.message.includes("successfully")
    }
  }
  return false
}

export function getUserHasRemainingEventCreations(user: IUseUser) {
  if (user && user.user) {
    return user.user?.remaining_calendar_event_creations > 0
  }
}
