import { useState, useEffect } from "react"
import Dropdown from "components/elements/Dropdown"
import {
  CreateEventInterval,
  CreateEventFormData,
} from "pages/Events/Content/CreateForm/types"
import DatePick from "../DatePick"
import { parentClasses, labelClasses } from "../styles"
import { handleDateChange } from "./functions"
import { useFormContext } from "react-hook-form"
import { useCalendarEvents } from "pages/Events/Context"

export default function DateOccurenceInputs() {
  const { eventDetails } = useCalendarEvents()
  const [startDate, setStartDate] = useState<Date>(
    new Date(eventDetails.start_date || Date.now())
  )
  const [endDate, setEndDate] = useState<Date>(
    new Date(eventDetails.end_date || Date.now())
  )
  const [selectedInterval, setSelectedInterval] =
    useState<CreateEventInterval>("one-off")
  const { setValue, control } = useFormContext<CreateEventFormData>()

  useEffect(() => {
    setValue("interval", selectedInterval)
  }, [selectedInterval, setValue])

  return (
    <>
      <div className={parentClasses}>
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
    </>
  )
}
