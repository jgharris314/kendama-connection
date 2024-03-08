import "react-big-calendar/lib/css/react-big-calendar.css"

import moment from "moment"
import { useEffect, useState } from "react"
import { momentLocalizer, Navigate, ToolbarProps } from "react-big-calendar"
const localizer = momentLocalizer(moment)

const CustomToolbar = (props: ToolbarProps) => {
  const [viewState, setViewState] = useState("month")

  const goToDayView = () => {
    props.onView("day")
    setViewState("day")
  }
  const goToWeekView = () => {
    props.onView("week")
    setViewState("week")
  }
  const goToMonthView = () => {
    props.onView("month")
    setViewState("month")
  }

  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS)
  }

  const goToNext = () => {
    props.onNavigate(Navigate.NEXT)
  }

  const goToToday = () => {
    props.onNavigate(Navigate.TODAY)
  }

  const buttonClasses =
    "border border-kenConnect-black/20 bg-kenConnect-blue shadow shadow-kenConnect-blue text-kenConnect-white p-1 rounded w-16 capitalize"

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full mb-2">
      <div className="flex items-center justify-center md:justify-start gap-1 w-full">
        <button className={buttonClasses} onClick={goToBack}>
          prev
        </button>
        <button className={buttonClasses} onClick={goToToday}>
          today
        </button>
        <button className={buttonClasses} onClick={goToNext}>
          next
        </button>
      </div>
      <label className="w-full text-center font-semibold my-2 md:my-0">
        {moment(props.date).format("MMMM YYYY")}
      </label>
      <div className="flex w-full items-center justify-center gap-1 md:justify-end">
        <button className={buttonClasses} onClick={goToMonthView}>
          month
        </button>
        <button className={buttonClasses} onClick={goToWeekView}>
          week
        </button>
        <button className={buttonClasses} onClick={goToDayView}>
          day
        </button>
      </div>
    </div>
  )
}

export default CustomToolbar
