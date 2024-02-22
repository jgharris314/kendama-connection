export type CreateEventInterval = "weekly" | "monthly" | "one-off"

export interface CreateEventFormData {
  start: string
  end: string
  title: string
  interval: CreateEventInterval
}
