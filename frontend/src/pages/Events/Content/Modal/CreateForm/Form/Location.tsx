import { useEffect, useState } from "react"
import Dropdown from "components/elements/Dropdown"
import Input from "components/elements/Input"
import {
  parentClasses,
  labelClasses,
  inputClasses,
} from "pages/Events/Content/Modal/CreateForm/styles"
import { US_STATES } from "./constants"
import { useFormContext } from "react-hook-form"

export default function LocationForm() {
  const [selectedState, setSelectedState] = useState<string>("Select State")
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue("location_state", selectedState)
  }, [selectedState, setValue])

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
      <div className="">
        <label className={`${labelClasses} `}>State</label>
        <Dropdown
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          values={US_STATES}
          parentClasses={`${parentClasses} border-2 !border-kenConnect-black`}
        />
      </div>
    </>
  )
}
