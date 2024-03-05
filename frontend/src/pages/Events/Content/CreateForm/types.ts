export type CreateEventInterval = "weekly" | "monthly" | "one-off"

export interface CreateEventFormData {
  start_date: string
  end_date: string
  title: string
  interval: CreateEventInterval
  location_name: string
  location_city: string
  location_state: string
}
