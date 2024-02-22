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
      className={`flex items-center px-4 py-1 border border-[#cccccc] rounded bg-white cursor-pointer relative m-auto ${parentClasses}`}
      role="button"
      aria-hidden
      onClick={dropDownHandleClick}
    >
      <span className="mr-2 text-black text-[1.1rem]">{selectedValue}</span>
      <div className="shop-contacts-arrow h-4 w-4 bg-no-repeat -mb-2" />
      <div
        className={`w-full rounded absolute z-10 bg-white top-[57px] left-0 h-64 overflow-hidden overflow-y-scroll border-r border-[#dddddd] ${
          dropDownOpen ? "visible" : "invisible"
        }`}
      >
        {values.map((value) => (
          <div
            className="text-lensGray-4 hover:bg-lensBlue-5 text-[1.1rem] p-1 border-r-1 cursor-pointer"
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
