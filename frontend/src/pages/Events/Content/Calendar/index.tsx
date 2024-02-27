import { useQuery } from "@tanstack/react-query"
import { Calendar, momentLocalizer } from "react-big-calendar"
import get from "api/get"
import moment from "moment"
import Dropdown from "components/elements/Dropdown"
import { parentClasses } from "pages/Events/Content/Modal/CreateForm/styles"
import { eventStyleGetterfunction } from "./functions"
import { CalendarEvent } from "./types"
import { useState } from "react"

export default function EventCalendar({
  locations = [],
}: {
  locations: any[]
}) {
  const [selectedLocation, setSelectedLocation] = useState("all")

  const { isPending, error, data, isFetching } = useQuery<CalendarEvent[]>({
    queryKey: ["calendarEvents", selectedLocation],
    queryFn: () => get(`/calendarEvents/${selectedLocation}`),
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
    <div className="flex flex-col items-start justify-center md:w-full  bg-kenConnect-white border-2 border-kenConnect-black/40 rounded shadow shadow-kenConnect-white p-2">
      <div>{isFetching ? "Updating..." : ""}</div>
      <div className="flex items-center gap-4 mb-2">
        <span className="font-bold">Location</span>
        <Dropdown<string>
          selectedValue={selectedLocation}
          setSelectedValue={setSelectedLocation}
          values={["all", ...locations]}
          parentClasses={`${parentClasses} border-2 !border-kenConnect-black`}
          isLocationDropdown
        />
      </div>
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
