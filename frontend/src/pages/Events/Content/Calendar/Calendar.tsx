import { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import fetcher from "api/fetcher"
import { eventStyleGetterfunction } from "./functions"
import type { CalendarEvent } from "./types"

export default function EventCalendar() {
  const [calendarEventList, setCalendarEventList] = useState<CalendarEvent[]>(
    []
  )

  useEffect(() => {
    async function getData() {
      const res = await fetcher("/calendarEvents")
      const modifiedRes = res.map((calendarEvent: CalendarEvent) => {
        return {
          ...calendarEvent,
          start_date: new Date(calendarEvent.start_date),
          end_date: new Date(calendarEvent.end_date),
        }
      })
      setCalendarEventList(modifiedRes)
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
