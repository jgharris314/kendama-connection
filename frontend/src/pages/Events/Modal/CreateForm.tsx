import { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import Input from "components/elements/Input"
import DatePicker from "react-datepicker"

interface FormData {
  start: string
  end: string
  title: string
  interval: "weekly" | "monthly" | "yearly"
}

export default function CreateEventForm() {
  const methods = useForm<FormData>({ mode: "onSubmit" })
  const { control, setValue } = methods
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const handleStartChange = (dateChange: Date) => {
    setValue("start", dateChange.toString(), {
      shouldDirty: true,
    })
    setStartDate(dateChange)
  }

  const handleEndtChange = (dateChange: Date) => {
    setValue("end", dateChange.toString(), {
      shouldDirty: true,
    })
    setEndDate(dateChange)
  }

  function onSubmit(formData: FormData) {
    //ensure start date is before end date
    setErrors("")
    if (new Date(formData.start) > new Date(formData.end)) {
      return setErrors("Start date must be before the end date")
    }
    console.log(formData)
  }

  const parentClasses = "text-white items-center flex flex-col"
  const inputClasses = "h-10 rounded  text-black max-w-[200px]"
  const labelClasses = "text-black whitespace-nowrap p-1"

  const [errors, setErrors] = useState("")

  return (
    <>
      {errors && <span>{errors}</span>}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
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
            <label>StartDate</label>
            <Controller
              control={control}
              name="start"
              defaultValue={startDate.toString()}
              render={() => (
                <DatePicker
                  showTimeSelect
                  selected={startDate}
                  onChange={handleStartChange}
                  timeFormat="HH:mm"
                  dateFormat="MM, dd, yyyy HH:mm"
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            <label>EndDate</label>
            <Controller
              control={control}
              name="end"
              defaultValue={endDate.toString()}
              render={() => (
                <DatePicker
                  showTimeSelect
                  selected={endDate}
                  onChange={handleEndtChange}
                  dateFormat="MM, dd, yyyy HH:mm"
                />
              )}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </>
  )
}
