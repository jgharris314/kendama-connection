import { Control, Controller } from "react-hook-form"
import DatePicker from "react-datepicker"
import { CreateEventFormData } from "./types"
import { inputClasses } from "./styles"

export default function DatePick({
  control,
  name,
  date,
  handleChange,
}: {
  control: Control<CreateEventFormData, unknown, CreateEventFormData>
  name: keyof CreateEventFormData
  date: Date
  handleChange: (dateChange: Date) => void
}) {
  return (
    <div className="customDatePickerWidth">
      <Controller
        control={control}
        name={name}
        defaultValue={date.toString()}
        render={() => (
          <DatePicker
            showTimeSelect
            selected={date}
            onChange={handleChange}
            timeFormat="HHHH:mm"
            dateFormat="MM, dd, yyyy HH:mm"
            className={`${inputClasses}`}
            popperPlacement="bottom-start"
          />
        )}
      />
    </div>
  )
}
