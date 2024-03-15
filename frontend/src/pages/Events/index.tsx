import "react-datepicker/dist/react-datepicker.css"
import CalendarEventsProvider from "pages/Events/Context"
import Content from "pages/Events/Content"
import { useParams } from "react-router-dom"

export default function EventsPage() {
  const { calendar_event_id } = useParams()

  return (
    <CalendarEventsProvider calendarEventId={calendar_event_id}>
      <Content />
    </CalendarEventsProvider>
  )
}
