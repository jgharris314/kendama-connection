import React from "react"
import type { CreateEventFormData } from "../types"
import { UseFormSetValue } from "react-hook-form"

export function handleDateChange(
  dateChange: Date,
  name: "start_date" | "end_date",
  setValue: UseFormSetValue<CreateEventFormData>,
  dateSetter: React.Dispatch<React.SetStateAction<Date>>
) {
  setValue(name, dateChange.toString(), {
    shouldDirty: true,
  })
  dateSetter(dateChange)
}

export function validateFormData(formData: CreateEventFormData) {
  const startDate = new Date(formData.start_date)
  const endDate = new Date(formData.end_date)
  if (startDate > endDate) {
    return "Start date must be before the end date"
  }

  const keysToCheck = [
    "title",
    "start_date",
    "end_date",
    // "location_name",
    // "location_city",
  ]

  for (const key of keysToCheck) {
    if (!formData[key]) {
      return `${key.replace(/_/g, " ")} is required`
    }
  }

  // if (formData.location_state.toLowerCase() === "select state") {
  //   return "state is required"
  // }

  return ""
}
