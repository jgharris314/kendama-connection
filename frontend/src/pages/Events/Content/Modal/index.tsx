import { IoMdArrowRoundForward } from "react-icons/io"

import CreateEventForm from "./CreateForm"
import { useCalendarEvents } from "pages/Events/Context"
import CalendarEventDetails from "pages/Events/Content/Modal/Details"

export default function Modal() {
  const { setIsOpen, isCreateMode } = useCalendarEvents()
  return (
    <div
      id="modal-container"
      className="fixed inset-0 w-full h-full z-50 invisible"
    >
      <div
        id="modal-bg"
        className=" absolute inset-0 w-full h-full bg-gray-900 opacity-0 duration-500 ease-out transition-all"
      />
      <div
        id="modal"
        className="absolute w-full lg:w-[66vw] xl:w-[50vw] h-full bg-kenConnect-black right-0 top-0 translate-y-full lg:translate-x-full lg:translate-y-0 duration-500 ease-out transition-all"
      >
        <button
          className="w-12 h-12 bg-red-700 text-red font-black text-kenConnect-white flex items-center justify-center "
          onClick={() => setIsOpen()}
        >
          <IoMdArrowRoundForward size={45} />
        </button>
        <div className="mt-4">
          {isCreateMode ? <CreateEventForm /> : <CalendarEventDetails />}
        </div>
      </div>
    </div>
  )
}
