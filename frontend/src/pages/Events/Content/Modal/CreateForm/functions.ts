import React from "react"
import type { CreateEventFormData } from "./types"
import { UseFormSetValue } from "react-hook-form"
import fetcher from "api/fetcher"

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

function validateFormData(
  formData: CreateEventFormData,
  setErrors: React.Dispatch<React.SetStateAction<string>>
) {
  const startDate = new Date(formData.start_date)
  const endDate = new Date(formData.end_date)
  if (startDate > endDate) {
    return setErrors("Start date must be before the end date")
  }

  if (!formData.title.length) {
    return setErrors("Title is required")
  }
}

export function submiterino(
  formData: CreateEventFormData,
  setErrors: React.Dispatch<React.SetStateAction<string>>,
  setIsOpen: () => void
) {
  setErrors("")
  validateFormData(formData, setErrors)

  const modifiedData = {
    ...formData,
    start_date: new Date(formData.start_date).toString(),
    end_date: new Date(formData.end_date).toString(),
  }

  try {
    // fetcher("/calendarEvents/new", modifiedData)
    console.log(modifiedData)
  } catch (error) {
    setErrors(error.message)
  }
  return setIsOpen()
}
