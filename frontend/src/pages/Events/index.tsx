import SectionContainer from "components/SectionContainer"
import "react-datepicker/dist/react-datepicker.css"
import CalendarEventsProvider from "pages/Events/Context"
import Content from "pages/Events/Content"

export default function EventsPage() {
  return (
    <CalendarEventsProvider>
      <SectionContainer
        bgClasses=" w-full"
        additionalContentClasses="flex flex-col w-full items-center justify-center "
      >
        <Content />
      </SectionContainer>
    </CalendarEventsProvider>
  )
}
