import { useEffect, useState } from "react"
import Dropdown from "components/elements/Dropdown"
import Input from "components/elements/Input"
import {
  parentClasses,
  labelClasses,
  inputClasses,
} from "pages/Events/Content/CreateForm/styles"
import { US_STATES } from "./constants"
import { useFormContext } from "react-hook-form"
import { useCalendarEvents } from "pages/Events/Context"
import { getDefaultSelectedState } from "./functions"

export default function LocationForm() {
  const { setValue } = useFormContext()
  const { isCreateMode, eventDetails } = useCalendarEvents()
  const [selectedState, setSelectedState] = useState<string>(
    getDefaultSelectedState(isCreateMode, eventDetails)
  )

  useEffect(() => {
    setValue("location_state", selectedState)
  }, [selectedState, setValue])

  useEffect(() => {
    setSelectedState(getDefaultSelectedState(isCreateMode, eventDetails))
  }, [isCreateMode, eventDetails, setValue])

  return (
    <>
      <Input
        name="location_name"
        id="location_name"
        parentClasses={parentClasses}
        inputClasses={inputClasses}
        label="Name / Street Address"
        labelClasses={labelClasses}
      />
      <Input
        name="location_city"
        id="location_city"
        parentClasses={parentClasses}
        inputClasses={inputClasses}
        label="City"
        labelClasses={labelClasses}
      />
      <div className="text-left md:w-[90%]">
        <label className={`${labelClasses}`}>State</label>
        <Dropdown
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          values={US_STATES}
          parentClasses="h-10 text-kenConnect-black z-0"
        />
      </div>
    </>
  )
}
