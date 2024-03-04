import SectionContainer from "components/SectionContainer"
import NoCreationsLeft from "pages/Events/Content/Modal/CreateForm/NoCreationsLeft"
import { useCalendarEvents } from "pages/Events/Context"
import { useUser } from "pages/auth/hooks/useUser"
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
        <Form />
      )}
    </SectionContainer>
  )
}
