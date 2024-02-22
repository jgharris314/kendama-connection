import { useState } from "react"
import SectionContainer from "components/SectionContainer"
import ErrorSection from "./components/ErrorSection"
import Form from "./Form"

export default function CreateEventForm() {
  const [errors, setErrors] = useState("")

  return (
    <SectionContainer additionalContentClasses="flex flex-col w-full justify-center items-center">
      <ErrorSection errors={errors} />
      <h1 className="text-[72px] mb-8 text-kenConnect-white underline decoration-kenConnect-yellow underline-offset-[1rem] font-semibold">
        List an event!
      </h1>
      <Form setErrors={setErrors} />
    </SectionContainer>
  )
}
