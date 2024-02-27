import { useQuery } from "@tanstack/react-query"
import get from "api/get"
import { useCalendarEvents } from "pages/Events/Context"
import Modal from "./Modal"
import EventCalendar from "./Calendar"

export default function Content() {
  const { setIsOpen } = useCalendarEvents()
  const { data: locations } = useQuery<any>({
    queryKey: ["calendarEventLocations"],
    queryFn: () => get("/calendarEvents/locations"),
  })
  return (
    <>
      <div className="flex w-full justify-end my-4">
        <button
          type="button"
          className="button button-yellow"
          onClick={() => setIsOpen()}
        >
          Create
        </button>
      </div>
      <EventCalendar locations={locations} />

      <Modal isCreateMode />
    </>
  )
}
