import { useGlobalContext } from "context/Global"
import SectionContainer from "components/SectionContainer"
import NotAMember from "pages/Events/Content/Modal/CreateForm/NotAMember"
import MemberView from "pages/Events/Content/Modal/CreateForm/MemberView"

export default function CreateEventForm() {
  const { isLoggedIn } = useGlobalContext()

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
