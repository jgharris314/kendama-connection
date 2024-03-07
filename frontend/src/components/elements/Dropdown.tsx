import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function Dropdown<T>({
  values,
  selectedValue,
  setSelectedValue,
  parentClasses,
  isLocationDropdown,
}: {
  values: string[]
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<T>>
  parentClasses?: string
  isLocationDropdown?: boolean
}) {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const dropDownHandleClick = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const selectValue = (value: T) => {
    setSelectedValue(value)
    setDropDownOpen(!dropDownOpen)
  }

  function formatLocationString(location: string) {
    const temp = location.split("_").join(", ")
    return temp.split("^").join(" ")
  }

  return (
    <div
      className={`flex items-center px-2 py-1 border border-[#cccccc] rounded bg-white cursor-pointer relative ${parentClasses}`}
      role="button"
      aria-hidden
      onClick={dropDownHandleClick}
    >
      <span className="text-black text-[1.1rem] capitalize">
        {isLocationDropdown
          ? formatLocationString(selectedValue)
          : selectedValue}
      </span>
      {/* <div className="h-4 w-4 bg-no-repeat -mb-2" /> */}
      <div
        className={`rounded absolute z-10 bg-white top-[40px] left-0 max-h-64 w-40 overflow-hidden overflow-y-scroll border-r border-[#dddddd] shadow-lg shadow-kenConnect-black ${
          dropDownOpen ? "visible" : "invisible"
        }`}
      >
        {values?.map((value) => (
          <div
            className="text-[1.1rem] p-1 border-r-1 cursor-pointer hover:bg-kenConnect-blue/20 px-2"
            onClick={() => selectValue(value)}
            role="button"
            aria-hidden
            key={uuidv4()}
          >
            {isLocationDropdown ? formatLocationString(value) : value}
          </div>
        ))}
      </div>
    </div>
  )
}
