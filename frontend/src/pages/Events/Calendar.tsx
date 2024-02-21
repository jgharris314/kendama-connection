import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

export default function EventCalendar() {
  const localizer = momentLocalizer(moment)

  interface CalendarEvent {
    title: string
    start: Date
    end: Date
    allDay?: boolean
    resource?: any
    eventType: string
    description: string
  }

  const calendarEventList: CalendarEvent[] = [
    {
      title: "Test",
      start: new Date(2024, 1, 17),
      end: new Date(2024, 1, 19),
      eventType: "weekly",
      description: "",
    },
    {
      title: "Test w",
      start: new Date(2024, 0, 13),
      end: new Date(2024, 1, 15),
      eventType: "major",
      description: "",
    },
  ]

  function eventStyleGetterfunction(event: CalendarEvent) {
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

  return (
    <div className="flex flex-col items-center justify-center md:w-[700px] xl:w-[1200px] bg-kenConnect-white">
      <Calendar
        localizer={localizer}
        events={calendarEventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="w-full"
        selectable
        eventPropGetter={eventStyleGetterfunction}
      />
    </div>
  )
}
