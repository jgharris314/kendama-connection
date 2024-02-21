import { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import fetcher from "api/fetcher"

interface CalendarEvent {
  title: string
  start_date: Date
  end_date: Date
  allDay?: boolean
  resource?: any
  eventType: string
  description: string
}

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

export default function EventCalendar() {
  const [calendarEventList, setCalendarEventList] = useState<CalendarEvent[]>(
    []
  )

  useEffect(() => {
    async function getData() {
      const res = await fetcher("/calendarEvents")
      setCalendarEventList(res)
    }

    getData()
  }, [])
  const localizer = momentLocalizer(moment)

  return (
    <div className="flex flex-col items-center justify-center md:w-[700px] xl:w-[1200px] bg-kenConnect-white">
      <Calendar
        localizer={localizer}
        events={calendarEventList}
        startAccessor="start_date"
        endAccessor="end_date"
        style={{ height: 500 }}
        className="w-full"
        selectable
        eventPropGetter={eventStyleGetterfunction}
      />
    </div>
  )
}
