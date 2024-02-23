import Modal from "./Modal"
import EventCalendar from "./Calendar"
import { useCalendarEvents } from "pages/Events/Context"

export default function Content() {
  const { setIsOpen } = useCalendarEvents()
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
      <EventCalendar />

      <Modal isCreateMode />
    </>
  )
}
