import SectionContainer from "components/SectionContainer"
import NoCreationsLeft from "pages/Events/Content/CreateForm/NoCreationsLeft"
import { useCalendarEvents } from "pages/Events/Context"
import { useUser } from "hooks/useUser"
import { getUserHasRemainingEventCreations } from "utils/UserAuth/functions"
import Form from "./Form"

export default function CreateEventForm() {
  const user = useUser()
  const { isCreateMode } = useCalendarEvents()
  const userHaseRemainingEventCreations =
    getUserHasRemainingEventCreations(user)
  return (
    <SectionContainer additionalContentClasses="flex flex-col w-full justify-start items-center">
      {isCreateMode && !userHaseRemainingEventCreations ? (
        <NoCreationsLeft />
      ) : (
        <>
          <h1 className="standard-header mt-4">List an Event!</h1>
          <Form />
        </>
      )}
    </SectionContainer>
  )
}
