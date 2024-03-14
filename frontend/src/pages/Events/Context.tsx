import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "constants/queryKeys"
import get from "api/get"
import { defaultFormData } from "./Content/CreateForm/Form/constants"

type CalendarEventsProviderProps = {
  initialEventDetails: Record<string, any>
  children: React.ReactNode
  calendarEventId: string | undefined
}

const CalendarEvents = createContext<{
  isCreateMode: boolean
  setIsCreateMode: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpen: () => void
  isEditMode: boolean
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>

  eventDetails: any
  setCalendarEventDetails: React.Dispatch<React.SetStateAction<any>>
}>({
  isCreateMode: true,
  setIsCreateMode: () => null,
  isEditMode: false,
  setIsEditMode: () => null,
  setIsOpen: () => null,
  eventDetails: {},
  setCalendarEventDetails: () => null,
})

export default function CalendarEventsProvider({
  calendarEventId,
  children,
}: CalendarEventsProviderProps) {
  function setIsOpen() {
    document.getElementById("modal-container")?.classList.toggle("invisible")
    document.getElementById("modal-bg")?.classList.toggle("opacity-0")
    document.getElementById("modal-bg")?.classList.toggle("opacity-80")
    document.getElementById("modal")?.classList.toggle("lg:translate-x-full")
    document.getElementById("modal")?.classList.toggle("translate-y-full")
  }
  const [eventDetails, setCalendarEventDetails] = useState(defaultFormData)
  const [isCreateMode, setIsCreateMode] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEY.calendarEventDetails],
    queryFn: () => get(`/calendarEvents/id/${calendarEventId}`),
  })

  useEffect(() => {
    refetch()
    if (data && data[0] && data[0].calendar_event_id) {
      setCalendarEventDetails(data[0])
      setIsCreateMode(false)
      setIsEditMode(false)
      setIsOpen()
    }
  }, [calendarEventId, data, refetch])

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
