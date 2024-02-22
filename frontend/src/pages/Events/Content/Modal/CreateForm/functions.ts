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

function onSubmit(
  formData: CreateEventFormData,
  setErrors: React.Dispatch<React.SetStateAction<string>>
) {
  setErrors("")
  const startDate = new Date(formData.start)
  const endDate = new Date(formData.end)
  if (startDate > endDate) {
    return setErrors("Start date must be before the end date")
  }

  if (!formData.title.length) {
    return setErrors("Title is required")
  }

  const modifiedData = {
    title: formData.title,
    start_date: startDate.toString(),
    end_date: endDate.toString(),
    interval: formData.interval,
  }

  try {
    fetcher("/calendarEvents/new", modifiedData)
  } catch (error) {
    setErrors(error.message)
  }
}

export function submiterino(
  data: CreateEventFormData,
  setErrors: React.Dispatch<React.SetStateAction<string>>,
  setIsOpen: () => void
) {
  try {
    onSubmit(data, setErrors)
    setIsOpen()
  } catch (error: any) {
    return setErrors(error.message)
  }
  return
}
