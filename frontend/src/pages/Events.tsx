import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

export default function EventsPage() {
  const localizer = momentLocalizer(moment)

  interface CalendarEvent {
    title: string
    start: Date
    end: Date
    allDay?: boolean
    resource?: any
    eventType: string
  }

  const calendarEventList: CalendarEvent[] = [
    {
      title: "Test",
      start: new Date(2024, 1, 17),
      end: new Date(2024, 1, 19),
      eventType: "weekly",
    },
    {
      title: "Test w",
      start: new Date(2024, 1, 13),
      end: new Date(2024, 1, 15),
      eventType: "major",
    },
  ]

  function eventStyleGetterfunction(event, start, end, isSelected) {
    console.log(event)
    const backgroundColor = event.eventType === "weekly" ? "#444" : "#aaa"
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

  const MyCalendar = (props: any) => (
    <div className="flex flex-col items-center justify-center md:w-[700px] xl:w-[1200px] bg-red-500">
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
  return (
    <div className="flex w-full justify-center">
      <MyCalendar />
    </div>
  )
}
