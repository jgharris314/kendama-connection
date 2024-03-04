import { useQuery } from "@tanstack/react-query"
import get from "api/get"
import { useCalendarEvents } from "pages/Events/Context"
import Modal from "./Modal"
import EventCalendar from "./Calendar"

export default function Content() {
  const { setIsOpen, setIsCreateMode, setIsEditMode } = useCalendarEvents()
  const { data: locations } = useQuery<any>({
    queryKey: ["calendarEventLocations"],
    queryFn: () => get("/calendarEvents/locations"),
  })

  function onClickHandler() {
    setIsCreateMode(true)
    setIsEditMode(false)
    setIsOpen()
  }

  return (
    <>
      <div className="flex w-full justify-end my-4">
        <button
          type="button"
          className="button button-yellow"
          onClick={() => onClickHandler()}
        >
          List an Event!
        </button>
      </div>
      <EventCalendar locations={locations} />

      <Modal />
    </>
  )
}
