import React, { createContext, useContext, useMemo } from "react"

type CalendarEventsProviderProps = {
  children: React.ReactNode
}

const CalendarEvents = createContext<{ setIsOpen: () => void }>({
  setIsOpen: () => null,
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
  const value = useMemo(
    () => ({
      setIsOpen,
    }),
    []
  )

  return (
    <CalendarEvents.Provider value={value}>{children}</CalendarEvents.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCalendarEvents() {
  return useContext(CalendarEvents)
}
