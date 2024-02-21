import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import DatePick from "./DatePick"
import { CreateEventFormData } from "./types"
import { handleDateChange, onSubmit } from "./functions"
import SectionContainer from "components/SectionContainer"

export default function CreateEventForm() {
  const methods = useForm<CreateEventFormData>({ mode: "onSubmit" })
  const { control, setValue } = methods
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const parentClasses = "text-white items-center flex flex-col"
  const inputClasses = "h-10 rounded  text-black max-w-[200px]"
  const labelClasses = "text-black whitespace-nowrap p-1"

  const [errors, setErrors] = useState("")

  return (
    <SectionContainer
      bgClasses="bg-kenConnect-white"
      additionalContentClasses="flex w-full justify-center items-center"
    >
      {errors && <span>{errors}</span>}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data, setErrors))}
          className="bg-white w-[600px] h-[300px]"
        >
          <Input
            name="title"
            id="title"
            parentClasses={parentClasses}
            inputClasses={inputClasses}
            label="title"
            labelClasses={labelClasses}
          ></Input>

          <div className="flex flex-col">
            <label>Start Date</label>
            <DatePick
              name="start"
              date={startDate}
              handleChange={(date) =>
                handleDateChange(date, "start", setValue, setStartDate)
              }
              control={control}
            />
          </div>
          <div className="flex flex-col">
            <label>End Date</label>
            <DatePick
              name="end"
              date={endDate}
              handleChange={(date) =>
                handleDateChange(date, "end", setValue, setEndDate)
              }
              control={control}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </SectionContainer>
  )
}
