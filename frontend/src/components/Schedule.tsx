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
import { useBookingStore } from '@/stores/useBookingStore'
import { shallow } from 'zustand/shallow'
import type { BookingEvent } from "@/types"
import bookingTemplates from "@/templates/BookingTemplates"

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

const findTemplate = (id : string) => bookingTemplates.find(t => t.id === id);

const Schedule = () => {
  const [view, setView] = useState<View>("month") 
  const [currentDate, setCurrentDate] = useState(new Date());
  const allBookings = useBookingStore((state) => state.bookings)

  const handleSelectEvent = (event: BookingEvent) => {
    setCurrentDate(new Date(event.start))
    setView("day")
  }

  return (
    <div className="space-y-6 p-4">
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={allBookings}
          view={view}
          date={currentDate}
          onView={(newView) => setView(newView)}
          onNavigate={(date) => setCurrentDate(date)}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={(event: BookingEvent) => `${findTemplate(event.templateId)?.label}`}
          style={{ height: "100%" }}
        />
      </div>
    </div>
      
  )
}

export default Schedule;

