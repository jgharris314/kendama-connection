export function getLoggedInStatus(
  data: Record<string, any> | null | undefined
) {
  if (data) {
    if (data.message) {
      return data.message.includes("successfully")
    }
  }
  return false
}
