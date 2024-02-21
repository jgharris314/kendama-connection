import React from "react"
import type { CreateEventFormData } from "./types"
import { UseFormSetValue } from "react-hook-form"

export function handleDateChange(
  dateChange: Date,
  name: "start" | "end",
  setValue: UseFormSetValue<CreateEventFormData>,
  dateSetter: React.Dispatch<React.SetStateAction<Date>>
) {
  setValue(name, dateChange.toString(), {
    shouldDirty: true,
  })
  dateSetter(dateChange)
}

export function onSubmit(
  formData: CreateEventFormData,
  setErrors: React.Dispatch<React.SetStateAction<string>>
) {
  //ensure start date is before end date
  setErrors("")
  if (new Date(formData.start) > new Date(formData.end)) {
    return setErrors("Start date must be before the end date")
  }
  console.log(formData)
}
