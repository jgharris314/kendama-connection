import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import get from "api/get"
import { QUERY_KEY } from "constants/queryKeys"
import { useUser } from "hooks/useUser"
import deleteReq from "api/delete"
import { CalendarEvent } from "./CalendarEvent"

export default function AccountPage() {
  const user = useUser()

  const {
    isPending,
    error,
    data: userCalendarEvents,
    isFetching,
  } = useQuery<any[]>({
    queryKey: [QUERY_KEY.userCalendarEvents],
    queryFn: () => get(`/calendarEvents/user/${user.user?.user_id}`),
  })

  const queryClient = useQueryClient()

  const [displayEvents, setDisplayEvents] = useState(false)

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  const calendarEventRemaining = user.user?.remaining_calendar_event_creations

  async function confirmAndDelete(calendarEventId: string) {
    if (window.confirm("Are you sure? This is irreversible!")) {
      await deleteReq(`/calendarEvents/remove/${calendarEventId}`)
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] })
      queryClient.invalidateQueries({ queryKey: ["calendarEventLocations"] })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.userCalendarEvents],
      })
      return true
    }
  }

  return (
    <div>
      <div>{isFetching ? "Updating..." : ""}</div>
      <h1 className="standard-header text-center leading-[60px]">Account</h1>
      <p className="text-[20px] w-full text-center mb-4">
        You have {calendarEventRemaining} calendar event&nbsp;
        {calendarEventRemaining === 1 ? "creation" : "creations"} left this
        month
      </p>
      <h2
        className={`text-[28px] h-16 border border-kenConnect-white mb-2  flex items-center justify-center md:max-w-min whitespace-nowrap md:px-8  ${
          !displayEvents && "bg-kenConnect-white/10 cursor-pointer"
        }`}
        onClick={() => setDisplayEvents(!displayEvents)}
      >
        Scheduled Events{" "}
      </h2>

      {displayEvents && (
        <div className="flex flex-col gap-4">
          {userCalendarEvents.length
            ? userCalendarEvents.map((calendarEvent) => {
                return (
                  <CalendarEvent
                    calendarEvent={calendarEvent}
                    key={uuidv4()}
                    deleteHandler={confirmAndDelete}
                  />
                )
              })
            : "You dont have any scheduled events at this time"}
        </div>
      )}
    </div>
  )
}
