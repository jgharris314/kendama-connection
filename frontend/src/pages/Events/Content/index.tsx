import Modal from "./Modal"
import EventCalendar from "./Calendar/Calendar"
import { useCalendarEvents } from "pages/Events/Context"

export default function Content() {
  const { setIsOpen } = useCalendarEvents()
  return (
    <>
      <div className="flex w-full justify-end my-4">
        <button
          type="button"
          className="w-32 h-16 bg-kenConnect-yellow shadow-md shadow-kenConnect-yellow rounded"
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
