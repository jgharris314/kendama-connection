import { useState, useEffect } from "react"
import Dropdown from "components/elements/Dropdown"
import {
  CreateEventInterval,
  CreateEventFormData,
} from "pages/Events/Content/Modal/CreateForm/types"
import DatePick from "../components/DatePick"
import { parentClasses, labelClasses } from "../styles"
import { handleDateChange } from "../functions"
import { useFormContext } from "react-hook-form"

export default function DateOccurenceInputs() {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
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
            handleDateChange(date, "start", setValue, setStartDate)
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
            handleDateChange(date, "end", setValue, setEndDate)
          }
          control={control}
        />
      </div>

      <div className="">
        <label className={`${labelClasses} `}>Event Frequency</label>
        <Dropdown
          selectedValue={selectedInterval}
          setSelectedValue={setSelectedInterval}
          values={["one day", "weekly", "monthly"]}
          parentClasses={`${parentClasses} border-2 !border-kenConnect-black`}
        />
      </div>
    </>
  )
}
