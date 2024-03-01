import { ReactNode } from "react"
import SectionContainer from "components/SectionContainer"
import { contentContainer } from "pages/Events/Content/Modal/CreateForm/styles"
import { useCalendarEvents } from "pages/Events/Context"

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
  const { eventDetails } = useCalendarEvents()

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
          <DataRow label="hosted by" content="" />
          <DataRow label="details" content={eventDetails.description} />
        </div>
      </div>
    </SectionContainer>
  )
}
