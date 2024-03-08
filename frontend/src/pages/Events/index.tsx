import "react-datepicker/dist/react-datepicker.css"
import CalendarEventsProvider from "pages/Events/Context"
import Content from "pages/Events/Content"

export default function EventsPage() {
  return (
    <CalendarEventsProvider>
      <Content />
    </CalendarEventsProvider>
  )
}
