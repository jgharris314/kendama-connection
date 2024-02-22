import moment from "moment"
import type { CalendarEvent } from "./types"

export function eventStyleGetterfunction(event: CalendarEvent) {
  const backgroundColor = event.eventType === "weekly" ? "#0c3fa7" : "#ffe01f"
  const style = {
    backgroundColor: backgroundColor,
    borderRadius: "0px",
    opacity: 0.8,
    color: "black",
    border: "0px",
    display: "block",
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
