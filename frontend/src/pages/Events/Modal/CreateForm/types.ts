export type CreateEventInterval = "weekly" | "monthly" | "yearly"

export interface CreateEventFormData {
  start: string
  end: string
  title: string
  interval: CreateEventInterval
}
