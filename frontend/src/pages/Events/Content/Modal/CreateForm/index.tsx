import { useState } from "react"
import SectionContainer from "components/SectionContainer"
import ErrorSection from "./components/ErrorSection"
import Form from "./Form"

export default function CreateEventForm() {
  const [errors, setErrors] = useState("")

  return (
    <SectionContainer additionalContentClasses="flex flex-col w-full justify-center items-center">
      <ErrorSection errors={errors} />
      <h1 className="standard-header">List an event!</h1>
      <Form setErrors={setErrors} />
    </SectionContainer>
  )
}
