import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import Input from "components/elements/Input"
import { useCalendarEvents } from "pages/Events/Context"
import DateOccurenceInputs from "pages/Events/Content/Modal/CreateForm/Form/DateOccurenceInputs"
import LocationForm from "pages/Events/Content/Modal/CreateForm/Form/Location"
import {
  parentClasses,
  labelClasses,
  inputClasses,
  contentContainer,
} from "../styles"
import { CreateEventFormData } from "../types"
import { validateFormData } from "./functions"

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
      queryClient.invalidateQueries({ queryKey: ["calendarEventLocations"] })
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
      return setErrors(errors.charAt(0).toUpperCase() + errors.slice(1))
    }

    const modifiedData = {
      ...formData,
      start_date: String(moment(new Date(formData.start_date)).toDate()),
      end_date: String(moment(new Date(formData.end_date)).toDate()),
      location_city_state: `${formData.location_city
        .split(" ")
        .join("^")
        .toLocaleLowerCase()}_${formData.location_state.toLocaleLowerCase()}`,
    }
    delete modifiedData.location_city
    delete modifiedData.location_state
    try {
      mutation.mutate(modifiedData)
    } catch (error) {
      return
    }

    return setIsOpen()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)} className={contentContainer}>
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

        <button className="mt-12 mb-4 button button-yellow" type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
