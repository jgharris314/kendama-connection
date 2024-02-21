import EventCalendar from "./Calendar"
import SectionContainer from "components/SectionContainer"
import Modal from "./Modal"
import "react-datepicker/dist/react-datepicker.css"

export default function EventsPage() {
  function setIsOpen() {
    document.getElementById("modal-container")?.classList.toggle("invisible")
    document.getElementById("modal-bg")?.classList.toggle("opacity-0")
    document.getElementById("modal-bg")?.classList.toggle("opacity-80")
    document.getElementById("modal")?.classList.toggle("lg:translate-x-full")
    document.getElementById("modal")?.classList.toggle("translate-y-full")
  }

  return (
    <SectionContainer
      bgClasses=" w-full"
      additionalContentClasses="flex flex-col w-full items-center justify-center "
    >
      <div className="flex w-full justify-end my-4">
        <button
          type="button"
          className="w-32 h-16 bg-kenConnect-yellow"
          onClick={() => setIsOpen()}
        >
          Create
        </button>
      </div>
      <EventCalendar />

      <Modal isCreateMode setIsOpen={setIsOpen} />
    </SectionContainer>
  )
}
