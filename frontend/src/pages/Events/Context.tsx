import React, { createContext, useContext, useMemo, useState } from "react"

type CalendarEventsProviderProps = {
  children: React.ReactNode
}

const CalendarEvents = createContext<{
  isCreateMode: boolean
  setIsCreateMode: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpen: () => void
  eventDetails: Record<string, any>
  setCalendarEventDetails: React.Dispatch<
    React.SetStateAction<Record<string, any>>
  >
}>({
  isCreateMode: true,
  setIsCreateMode: () => null,
  setIsOpen: () => null,
  eventDetails: {},
  setCalendarEventDetails: () => null,
})

export default function CalendarEventsProvider({
  children,
}: CalendarEventsProviderProps) {
  function setIsOpen() {
    document.getElementById("modal-container")?.classList.toggle("invisible")
    document.getElementById("modal-bg")?.classList.toggle("opacity-0")
    document.getElementById("modal-bg")?.classList.toggle("opacity-80")
    document.getElementById("modal")?.classList.toggle("lg:translate-x-full")
    document.getElementById("modal")?.classList.toggle("translate-y-full")
  }
  const [eventDetails, setCalendarEventDetails] = useState({})
  const [isCreateMode, setIsCreateMode] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)

  const value = useMemo(
    () => ({
      isCreateMode,
      setIsCreateMode,
      setIsOpen,
      eventDetails,
      setCalendarEventDetails,
      isEditMode,
      setIsEditMode,
    }),
    [
      eventDetails,
      setCalendarEventDetails,
      isCreateMode,
      setIsCreateMode,
      isEditMode,
      setIsEditMode,
    ]
  )

  return (
    <CalendarEvents.Provider value={value}>{children}</CalendarEvents.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCalendarEvents() {
  return useContext(CalendarEvents)
}
