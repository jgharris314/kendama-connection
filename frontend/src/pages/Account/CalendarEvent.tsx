import {
  removeUnderscore,
  formatDateFromString,
  formatLocationString,
} from "utils/string"

function formatCalendarEventData(key: string, calendarEvent: any) {
  switch (key) {
    case "start_date":
    case "end_date":
      return formatDateFromString(calendarEvent[key])
    case "location_city_state":
      return formatLocationString(calendarEvent[key])
    default:
      return calendarEvent[key]
  }
}

export function CalendarEvent({
  calendarEvent,
  deleteHandler,
}: {
  calendarEvent: any
  deleteHandler: any
}) {
  const keys = [
    "title",
    "start_date",
    "end_date",
    "interval",
    "location_city_state",
  ]
  return (
    <div className="flex flex-col w-full border border-kenConnect-white p-2 bg-kenConnect-white/10">
      {keys.map((key) => {
        return (
          <div className="flex">
            <span className="font-semibold capitalize mr-2 whitespace-nowrap w-20">
              {key.includes("location") ? "Location" : removeUnderscore(key)}:
            </span>{" "}
            <p className="capitalize">
              {formatCalendarEventData(key, calendarEvent)}
            </p>
          </div>
        )
      })}
      <div className="flex flex-col md:flex-row w-full my-4 gap-4">
        <a
          className="button button-yellow flex items-center justify-center"
          href={`/events/${calendarEvent.calendar_event_id}`}
        >
          View Details
        </a>
        <button
          type="button"
          className="button button-red"
          onClick={() => deleteHandler(calendarEvent.calendar_event_id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
