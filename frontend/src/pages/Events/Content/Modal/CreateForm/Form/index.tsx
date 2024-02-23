import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import { useCalendarEvents } from "pages/Events/Context"
import DateOccurenceInputs from "pages/Events/Content/Modal/CreateForm/Form/DateOccurenceInputs"
import LocationForm from "pages/Events/Content/Modal/CreateForm/Form/Location"
import { parentClasses, labelClasses, inputClasses } from "../styles"
import { CreateEventFormData } from "../types"
import { validateFormData } from "./functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import post from "api/post"

export default function Form({
  setErrors,
}: {
  setErrors: React.Dispatch<React.SetStateAction<string>>
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: CreateEventFormData) =>
      post<CreateEventFormData>("/calendarEvents/new", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] })
    },
  })
  const { setIsOpen } = useCalendarEvents()
  const methods = useForm<CreateEventFormData>({
    mode: "onSubmit",
  })
  const { handleSubmit } = methods

  function submitHandler(formData: CreateEventFormData) {
    setErrors("")
    const errors = validateFormData(formData)

    if (errors.length) {
      return setErrors(errors)
    }

    const modifiedData = {
      ...formData,
      start_date: new Date(formData.start_date).toString(),
      end_date: new Date(formData.end_date).toString(),
    }

    mutation.mutate(modifiedData)

    return setIsOpen()
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(submitHandler)}
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
          {/* <div className="flex flex-col w-full md:w-1/2 gap-2">
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
          </div> */}
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
