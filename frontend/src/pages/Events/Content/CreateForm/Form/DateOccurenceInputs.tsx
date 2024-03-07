import { useState, useEffect } from "react"
import Dropdown from "components/elements/Dropdown"
import {
  CreateEventInterval,
  CreateEventFormData,
} from "pages/Events/Content/CreateForm/types"
import DatePick from "../DatePick"
import { parentClasses, labelClasses } from "../styles"
import { handleDateChange, getEventDate, getDefaultInterval } from "./functions"
import { useFormContext } from "react-hook-form"
import { useCalendarEvents } from "pages/Events/Context"
import { defaultInterval } from "./constants"

export default function DateOccurenceInputs() {
  const { eventDetails, isCreateMode } = useCalendarEvents()

  const [startDate, setStartDate] = useState<Date>(
    getEventDate(isCreateMode, eventDetails, true)
  )
  const [endDate, setEndDate] = useState<Date>(
    getEventDate(isCreateMode, eventDetails, false)
  )
  const [selectedInterval, setSelectedInterval] = useState<CreateEventInterval>(
    getDefaultInterval(isCreateMode, eventDetails)
  )
  const { setValue, control } = useFormContext<CreateEventFormData>()

  useEffect(() => {
    setValue("interval", selectedInterval)
  }, [selectedInterval, setValue])

  useEffect(() => {
    setStartDate(getEventDate(isCreateMode, eventDetails, true))
    setEndDate(getEventDate(isCreateMode, eventDetails, false))
    setSelectedInterval(getDefaultInterval(isCreateMode, eventDetails))
  }, [eventDetails, isCreateMode])

  return (
    <div className="">
      <div className={`${parentClasses}`}>
        <label className={labelClasses}>Start Date</label>
        <DatePick
          name="start_date"
          date={startDate}
          handleChange={(date) =>
            handleDateChange(date, "start_date", setValue, setStartDate)
          }
          control={control}
        />
      </div>
      <div className={parentClasses}>
        <label className={labelClasses}>End Date</label>
        <DatePick
          name="end_date"
          date={endDate}
          handleChange={(date) =>
            handleDateChange(date, "end_date", setValue, setEndDate)
          }
          control={control}
        />
      </div>

      <div className="text-left md:w-[90%]">
        <label className={labelClasses}>Event Frequency</label>
        <Dropdown
          selectedValue={selectedInterval}
          setSelectedValue={setSelectedInterval}
          values={["one-off", "weekly", "monthly"]}
          parentClasses="h-10"
        />
      </div>
    </div>
  )
}
