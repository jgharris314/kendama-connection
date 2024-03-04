import { useQuery } from "@tanstack/react-query"
import get from "api/get"
import { useCalendarEvents } from "pages/Events/Context"
import Modal from "../../../components/Layout/Modal"
import EventCalendar from "./Calendar"
import CalendarEventDetails from "./Details"
import CreateEventForm from "./CreateForm"
import NotAMember from "./NotAMember"
import { useUser } from "pages/auth/hooks/useUser"
import { getLoggedInStatus } from "utils/UserAuth/functions"

function getComponent(
  isCreateMode: boolean,
  isEditMode: boolean,
  isLoggedIn: boolean
) {
  if (isCreateMode) {
    if (!isLoggedIn) {
      return NotAMember
    }
  } else if (!isEditMode) {
    return CalendarEventDetails
  }

  return CreateEventForm
}

export default function Content() {
  const user = useUser()
  const {
    setIsOpen,
    setIsCreateMode,
    isCreateMode,
    setIsEditMode,
    isEditMode,
  } = useCalendarEvents()
  const { data: locations } = useQuery<any>({
    queryKey: ["calendarEventLocations"],
    queryFn: () => get("/calendarEvents/locations"),
  })

  const isLoggedIn = getLoggedInStatus(user)

  function onClickHandler() {
    setIsCreateMode(true)
    setIsEditMode(false)
    setIsOpen()
  }

  const Component = getComponent(isCreateMode, isEditMode, isLoggedIn)

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

      <Modal onClickHandler={setIsOpen}>
        <Component />
      </Modal>
    </>
  )
}
