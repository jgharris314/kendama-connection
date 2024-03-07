import React from "react"
import { UseFormSetValue } from "react-hook-form"
import moment from "moment"
import type { CreateEventFormData } from "../types"
import { defaultFormData, defaultInterval } from "./constants"

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
    "location_name",
    "location_city",
    "location_state",
    "hosted_by",
  ]

  for (const key of keysToCheck) {
    if (!formData[key]) {
      const convertedKey = key === "title" ? "event name" : key
      return `${convertedKey.replace(/_/g, " ")} is required`
    }
  }

  if (formData.location_state.toLowerCase() === "select state") {
    return "state is required"
  }

  return ""
}

export function getDefaultFormdata(createMode: boolean, eventDetails: any) {
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

    return modifiedEventDetails
  }

  return defaultFormData
}

export function reformatFormData(formData: any, user_id: number) {
  const modifiedData = {
    ...formData,
    start_date: String(moment(new Date(formData.start_date)).toDate()),
    end_date: String(moment(new Date(formData.end_date)).toDate()),
    location_city_state: `${formData.location_city
      .split(" ")
      .join("^")
      .toLocaleLowerCase()}_${formData.location_state.toLocaleLowerCase()}`,
    user_id,
  }
  delete modifiedData.location_city
  delete modifiedData.location_state
  return modifiedData
}

export function getEventDate(
  isCreateMode: boolean,
  eventDetails: any,
  isStart: boolean
) {
  if (isCreateMode) {
    return new Date(Date.now())
  }
  return isStart ? eventDetails.start_date : eventDetails.end_date
}

export function getDefaultInterval(isCreateMode: boolean, eventDetails: any) {
  return isCreateMode ? defaultInterval : eventDetails.interval
}

export function getDefaultSelectedState(
  isCreateMode: boolean,
  eventDetails: any
) {
  if (isCreateMode) {
    return "Select State"
  } else {
    const locationCityState = eventDetails.location_city_state.split("_")
    return locationCityState[1].toUpperCase()
  }
}
