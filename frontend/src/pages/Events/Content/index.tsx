import { useQuery } from "@tanstack/react-query"
import get from "api/get"
import { useCalendarEvents } from "pages/Events/Context"
import Modal from "components/Layout/Modal"
import { useUser } from "hooks/useUser"
import { getLoggedInStatus } from "utils/UserAuth/functions"
import EventCalendar from "./Calendar"
import CalendarEventDetails from "./Details"
import CreateEventForm from "./CreateForm"
import NotAMember from "./NotAMember"
import { defaultFormData } from "./CreateForm/Form/constants"

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
    setCalendarEventDetails,
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

  function closeHandler() {
    setIsEditMode(false)
    setIsCreateMode(true)
    setCalendarEventDetails(defaultFormData)
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

      <Modal onClickHandler={closeHandler}>
        <Component />
      </Modal>
    </>
  )
}
