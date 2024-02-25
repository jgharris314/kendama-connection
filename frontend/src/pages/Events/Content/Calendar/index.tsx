import { useQuery } from "@tanstack/react-query"
import { Calendar, momentLocalizer } from "react-big-calendar"
import get from "api/get"
import moment from "moment"
import { eventStyleGetterfunction } from "./functions"
import { CalendarEvent } from "./types"

export default function EventCalendar() {
  const { isPending, error, data, isFetching } = useQuery<CalendarEvent[]>({
    queryKey: ["calendarEvents"],
    queryFn: () => get("/calendarEvents"),
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  const localizer = momentLocalizer(moment)

  const modifiedData = data.map((datum) => {
    return {
      ...datum,
      start_date: moment(datum.start_date).toDate(),
      end_date: moment(datum.end_date).toDate(),
    }
  })

  return (
    <div className="flex flex-col items-center justify-center md:w-full  bg-kenConnect-white border-4 border-kenConnect-black/40 rounded shadow shadow-kenConnect-white">
      <div>{isFetching ? "Updating..." : ""}</div>
      <Calendar
        localizer={localizer}
        events={modifiedData}
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
