import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import { useCalendarEvents } from "pages/Events/Context"
import DateOccurenceInputs from "pages/Events/Content/Modal/CreateForm/Form/DateOccurenceInputs"
import LocationForm from "pages/Events/Content/Modal/CreateForm/Form/Location"
import { parentClasses, labelClasses, inputClasses } from "../styles"
import { CreateEventFormData } from "../types"
import { submiterino } from "../functions"

export default function Form({
  setErrors,
}: {
  setErrors: React.Dispatch<React.SetStateAction<string>>
}) {
  const { setIsOpen } = useCalendarEvents()
  const methods = useForm<CreateEventFormData>({
    mode: "onSubmit",
  })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) =>
          submiterino(data, setErrors, setIsOpen)
        )}
        className="bg-kenConnect-white w-full flex flex-col justify-center items-center md:w-[600px] p-4 rounded shadow-md shadow-kenConnect-white"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col w-full md:w-1/2 gap-2 ">
            <Input
              name="title"
              id="title"
              parentClasses={parentClasses}
              inputClasses={inputClasses}
              label="Event Name"
              labelClasses={labelClasses}
            />
            <DateOccurenceInputs />
          </div>
          <div className="flex flex-col w-full md:w-1/2 gap-2">
            <LocationForm />
            <Input
              name="description"
              id="description"
              parentClasses={parentClasses}
              inputClasses={`${inputClasses} w-full`}
              label="Description"
              labelClasses={labelClasses}
              rows={5}
            />
          </div>
        </div>

        <button
          className="mt-12 mb-4 w-32 h-16 bg-kenConnect-blue text-kenConnect-white rounded shadow-md shadow-kenConnect-blue border border-kenConnect-black font-bold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
