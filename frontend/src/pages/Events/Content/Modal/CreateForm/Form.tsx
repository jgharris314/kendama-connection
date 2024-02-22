import React, { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import Dropdown from "components/elements/Dropdown"
import { CreateEventInterval } from "./types"
import { parentClasses, labelClasses, inputClasses } from "./styles"
import DatePick from "./components/DatePick"
import { CreateEventFormData } from "./types"
import { handleDateChange, submiterino } from "./functions"
import { useCalendarEvents } from "pages/Events/Context"

export default function Form({
  setErrors,
}: {
  setErrors: React.Dispatch<React.SetStateAction<string>>
}) {
  const { setIsOpen } = useCalendarEvents()
  const methods = useForm<CreateEventFormData>({
    mode: "onSubmit",
  })
  const { control, setValue, handleSubmit } = methods
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [selectedInterval, setSelectedInterval] =
    useState<CreateEventInterval>("one-off")

  useEffect(() => {
    methods.setValue("interval", selectedInterval)
  }, [selectedInterval, methods])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) =>
          submiterino(data, setErrors, setIsOpen)
        )}
        className="bg-kenConnect-white w-full flex flex-col justify-center items-center md:w-[600px] p-4 rounded shadow-md shadow-kenConnect-white gap-4"
      >
        <Input
          name="title"
          id="title"
          parentClasses={parentClasses}
          inputClasses={inputClasses}
          label="title"
          labelClasses={labelClasses}
        />

        <div className={parentClasses}>
          <label className={labelClasses}>Start Date</label>
          <DatePick
            name="start"
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
            name="end"
            date={endDate}
            handleChange={(date) =>
              handleDateChange(date, "end", setValue, setEndDate)
            }
            control={control}
          />
        </div>

        <div className="">
          <label className={`${labelClasses} `}>
            How frequenly will this event occur?{" "}
          </label>
          <Dropdown
            selectedValue={selectedInterval}
            setSelectedValue={setSelectedInterval}
            values={["one day", "weekly", "monthly"]}
            parentClasses={`${parentClasses} border-2 !border-kenConnect-black`}
          />
        </div>
        <button
          className="my-4 w-32 h-16 bg-kenConnect-blue text-kenConnect-white rounded shadow-md shadow-kenConnect-blue border border-kenConnect-black font-bold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
