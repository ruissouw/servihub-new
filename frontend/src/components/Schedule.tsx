import { useState } from "react"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { View } from 'react-big-calendar'
import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns"
import {enUS} from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: "Event 1",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "Event 1",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "Event 1",
    start: new Date(),
    end: new Date(),
  },
]

const Schedule = () => {
  const [view, setView] = useState<View>("month") 
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div style={{ height: "500px", padding: "1rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        view={view}
        date={currentDate}
        onView={(newView) => setView(newView)}
        onNavigate={(date) => setCurrentDate(date)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  )
}

export default Schedule;

