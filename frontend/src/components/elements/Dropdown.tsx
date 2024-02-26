import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function Dropdown<T>({
  values,
  selectedValue,
  setSelectedValue,
  parentClasses,
}: {
  values: string[]
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<T>>
  parentClasses?: string
}) {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const dropDownHandleClick = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const selectValue = (value: T) => {
    setSelectedValue(value)
    setDropDownOpen(!dropDownOpen)
  }

  return (
    <div
      className={`flex items-center px-4 py-1 border border-[#cccccc] rounded bg-white cursor-pointer relative ${parentClasses}`}
      role="button"
      aria-hidden
      onClick={dropDownHandleClick}
    >
      <span className="mr-2 text-black text-[1.1rem]">{selectedValue}</span>
      <div className="h-4 w-4 bg-no-repeat -mb-2" />
      <div
        className={`w-full rounded absolute z-10 bg-white top-[50px] left-0 max-h-64 overflow-hidden overflow-y-scroll border-r border-[#dddddd] shadow-lg shadow-kenConnect-black ${
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
            {value}
          </div>
        ))}
      </div>
    </div>
  )
}
