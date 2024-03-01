import { IUseUser } from "pages/auth/hooks/useUser"

export function getLoggedInStatus(data: IUseUser) {
  if (data) {
    if (data.message) {
      return data.message.includes("successfully")
    }
  }
  return false
}
