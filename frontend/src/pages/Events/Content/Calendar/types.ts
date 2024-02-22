export interface CalendarEvent {
  title: string
  start_date: Date
  end_date: Date
  allDay?: boolean
  resource?: any
  eventType: string
  description: string
}
