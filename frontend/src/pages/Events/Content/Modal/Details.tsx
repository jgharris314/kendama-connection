import SectionContainer from "components/SectionContainer"
import { contentContainer } from "pages/Events/Content/Modal/CreateForm/styles"
import { useCalendarEvents } from "pages/Events/Context"

export default function CalendarEventDetails() {
  const { eventDetails } = useCalendarEvents()

  return (
    <SectionContainer additionalContentClasses="flex flex-col w-full justify-center items-center text-white">
      <div className={contentContainer}>
        <div className="flex flex-col">
          <p>{eventDetails.title}</p>
          <p>{eventDetails.start_date.toString()}</p>
          <p>{eventDetails.end_date.toString()}</p>
        </div>
      </div>
    </SectionContainer>
  )
}
