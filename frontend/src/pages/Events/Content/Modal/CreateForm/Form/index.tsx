import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useSnackbar } from "notistack"
import post from "api/post"
import Input from "components/elements/Input"
import { useCalendarEvents } from "pages/Events/Context"
import DateOccurenceInputs from "./DateOccurenceInputs"
import LocationForm from "./Location"
import { QUERY_KEY } from "constants/queryKeys"
import { useUser } from "pages/auth/hooks/useUser"
import {
  parentClasses,
  labelClasses,
  inputClasses,
  contentContainer,
} from "../styles"
import { CreateEventFormData } from "../types"
import { validateFormData } from "./functions"
import { useEffect, useState } from "react"
import { defaultFormData } from "./constants"

function getDefaultFormdata(createMode: boolean, eventDetails: any) {
  if (!createMode) {
    const modifiedEventDetails = { ...eventDetails }

    const locationCityState =
      modifiedEventDetails.location_city_state.split("_")

    modifiedEventDetails.location_city = locationCityState[0]
      .split("^")
      .join(" ")
    modifiedEventDetails.location_state = locationCityState[1].toUpperCase()
    delete modifiedEventDetails.created_at
    delete modifiedEventDetails.updated_at
    delete modifiedEventDetails.calendar_event_id

    return modifiedEventDetails
  }

  return defaultFormData
}

export default function Form() {
  const queryClient = useQueryClient()
  const user = useUser()

  const { enqueueSnackbar } = useSnackbar()

  const mutation = useMutation({
    mutationFn: (data: CreateEventFormData) =>
      post<CreateEventFormData>("/calendarEvents/new", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] })
      queryClient.invalidateQueries({ queryKey: ["calendarEventLocations"] })
    },
  })
  const { setIsOpen, isCreateMode, eventDetails } = useCalendarEvents()

  const methods = useForm<CreateEventFormData>({
    mode: "onSubmit",
    defaultValues: getDefaultFormdata(isCreateMode, eventDetails),
  })
  const { handleSubmit } = methods

  function submitHandler(formData: CreateEventFormData) {
    const errors = validateFormData(formData)

    if (errors.length) {
      return enqueueSnackbar(errors.charAt(0).toUpperCase() + errors.slice(1), {
        variant: "error",
      })
    }

    if (!user?.user?.username.length) {
      return enqueueSnackbar("User is not signed in", {
        variant: "error",
      })
    }

    const modifiedData = {
      ...formData,
      start_date: String(moment(new Date(formData.start_date)).toDate()),
      end_date: String(moment(new Date(formData.end_date)).toDate()),
      location_city_state: `${formData.location_city
        .split(" ")
        .join("^")
        .toLocaleLowerCase()}_${formData.location_state.toLocaleLowerCase()}`,
      user_id: user.user.user_id,
    }
    delete modifiedData.location_city
    delete modifiedData.location_state
    try {
      mutation.mutate(modifiedData)
    } catch (error) {
      return
    }

    const modifiedUserData = {
      ...user,
      user: {
        ...user.user,
        remaining_calendar_event_creations:
          user.user.remaining_calendar_event_creations - 1,
      },
    }
    queryClient.setQueryData([QUERY_KEY.user], modifiedUserData)

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
              name="hosted_by"
              id="hosted_by"
              parentClasses={parentClasses}
              inputClasses={inputClasses}
              label="Hosted By"
              labelClasses={labelClasses}
            />
          </div>
        </div>
        <Input
          name="description"
          id="description"
          parentClasses={`${parentClasses} w-full !max-w-none`}
          inputClasses={`${inputClasses} !max-w-none w-full h-16`}
          label="Description"
          labelClasses={labelClasses}
          rows={5}
        />
        <button className="mt-12 mb-4 button button-yellow" type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
