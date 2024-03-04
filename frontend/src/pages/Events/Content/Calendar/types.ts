import { CreateEventInterval } from "pages/Events/Content/CreateForm/types"

export interface CalendarEvent {
  title: string
  start_date: Date
  end_date: Date
  interval: CreateEventInterval
}
