import { ReactNode } from "react"
import SectionContainer from "components/SectionContainer"
import { contentContainer } from "pages/Events/Content/CreateForm/styles"
import { useCalendarEvents } from "pages/Events/Context"
import { useUser } from "pages/auth/hooks/useUser"
import deleteReq from "api/delete"

function DataRow({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="flex py-0.5 md:py-2 capitalize">
      <label className="capitalize w-28 font-bold text-[1.125rem] text-right mr-4">
        {label}:
      </label>
      <p>{content}</p>
    </div>
  )
}

export default function CalendarEventDetails() {
  const user = useUser()
  const { eventDetails, setIsCreateMode, setIsEditMode, setIsOpen } =
    useCalendarEvents()

  const handleClick = () => {
    setIsCreateMode(false)
    setIsEditMode(true)
  }

  async function confirmDelete() {
    if (window.confirm("Are you sure? This is irreversible!")) {
      await deleteReq(
        `/calendarEvents/remove/${eventDetails.calendar_event_id}`
      )
      return setIsOpen()
    }
  }

  const isCreator =
    user && user.user && user.user.user_id === eventDetails.user_id

  return (
    <SectionContainer additionalContentClasses="flex flex-col w-full justify-center items-center text-white">
      <div className={contentContainer}>
        <div className="flex flex-col w-full items-start">
          <DataRow label="event name" content={eventDetails.title} />
          <DataRow
            label="start"
            content={`${new Date(
              eventDetails.start_date
            ).toLocaleDateString()} ${new Date(
              eventDetails.start_date
            ).toLocaleTimeString()}`}
          />
          <DataRow
            label="end"
            content={`${new Date(
              eventDetails.end_date
            ).toLocaleDateString()} ${new Date(
              eventDetails.end_date
            ).toLocaleTimeString()}`}
          />
          <DataRow label="hosted by" content={eventDetails.hosted_by} />
          <DataRow
            label="details"
            content={
              eventDetails.description.length
                ? eventDetails.description
                : "No details provided..."
            }
          />
        </div>
        {isCreator && (
          <div className="flex w-full justify-end gap-4">
            <button
              type="button"
              className="button button-blue"
              onClick={() => handleClick()}
            >
              Edit
            </button>
            <button
              type="button"
              className="button button-red"
              onClick={() => confirmDelete()}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </SectionContainer>
  )
}
