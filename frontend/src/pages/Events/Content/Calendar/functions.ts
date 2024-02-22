import moment from "moment"
import type { CalendarEvent } from "./types"
import { CreateEventInterval } from "pages/Events/Content/Modal/CreateForm/types"

function getBackgroundColor(interval: CreateEventInterval) {
  switch (interval) {
    case "monthly":
      return "#ffe01f"
    case "one-off":
      return "#d60000"
    case "weekly":
    default:
      return "#0c3fa7"
  }
}

function getTextColor(interval: CreateEventInterval) {
  switch (interval) {
    case "monthly":
      return "#050a23"
    case "one-off":
      return "black"
    case "weekly":
    default:
      return "#f3f6f4"
  }
}

export function eventStyleGetterfunction(event: CalendarEvent) {
  const style = {
    backgroundColor: getBackgroundColor(event.interval),
    borderRadius: ".5rem",
    opacity: 0.8,
    color: getTextColor(event.interval),
    border: "0px",
    display: "block",
    padding: ".4rem",
    fontWeight: 600,
    textTransform: "capitalize",
  }
  return {
    style: style,
  }
}

export function mergeStringDateTime(date = "", time = "") {
  if (!date) return time ? moment(time).toDate() : undefined
  const [, trueTime] = time.split("T")
  return moment(`${date}T${trueTime}`).toDate()
}
