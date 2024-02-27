import { useCalendarEvents } from "pages/Events/Context"

export default function CalendarEventDetails() {
  const { eventDetails } = useCalendarEvents()

  return <div className="text-white">{eventDetails.title}</div>
}
