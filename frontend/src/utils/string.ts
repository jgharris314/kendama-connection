export function removeUnderscore(str: string) {
  return str.split("_").join(" ")
}

export function formatLocationString(location: string) {
  const city_state = location.split("_")
  const temp = [city_state[0], city_state[1].toUpperCase()].join(", ")
  return temp.split("^").join(" ")
}

export function formatDateFromString(str: string) {
  const date = new Date(str)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
