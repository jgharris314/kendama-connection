import SectionContainer from "components/SectionContainer"
import NotAMember from "pages/Events/Content/Modal/CreateForm/NotAMember"
import MemberView from "pages/Events/Content/Modal/CreateForm/MemberView"
import { useUser } from "pages/auth/hooks/useUser"
import { getLoggedInStatus } from "utils/UserAuth/functions"

export default function CreateEventForm() {
  const user = useUser()
  const isLoggedIn = getLoggedInStatus(user)

  return (
    <SectionContainer additionalContentClasses="flex flex-col w-full justify-start items-center">
      {isLoggedIn ? (
        <>
          {" "}
          <h1 className="standard-header">List an event!</h1>
          <MemberView />
        </>
      ) : (
        <NotAMember />
      )}
    </SectionContainer>
  )
}
