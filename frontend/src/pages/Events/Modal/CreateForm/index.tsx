import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import DatePick from "./DatePick"
import { CreateEventFormData } from "./types"
import { handleDateChange, onSubmit } from "./functions"
import SectionContainer from "components/SectionContainer"
import { parentClasses, labelClasses, inputClasses } from "./styles"
import ErrorSection from "./ErrorSection"

export default function CreateEventForm() {
  const methods = useForm<CreateEventFormData>({ mode: "onSubmit" })
  const { control, setValue } = methods
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [errors, setErrors] = useState("")

  return (
    <SectionContainer
      bgClasses="bg-red-500"
      additionalContentClasses="flex flex-col w-full justify-center items-center"
    >
      <ErrorSection errors={errors} />
      <h1 className="text-[72px] mb-8 text-kenConnect-white underline decoration-kenConnect-yellow underline-offset-[1rem] font-semibold">
        List an event!
      </h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data, setErrors))}
          className="bg-kenConnect-white w-full flex flex-col justify-center items-center md:w-[600px] p-4 rounded shadow-md shadow-kenConnect-white"
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
          <button
            className="my-4 w-32 h-16 bg-kenConnect-blue text-kenConnect-white rounded shadow-md shadow-kenConnect-blue border border-kenConnect-black font-bold"
            type="submit"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </SectionContainer>
  )
}
