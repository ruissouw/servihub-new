import { useState, useEffect } from "react"
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
import type { BookingEvent } from "@/types"
import bookingTemplates from "@/templates/BookingTemplates"
import mockBookingEvents from "@/data/events"
import '@/index.css'
import EventView from "./EventView"
import { Button } from "./ui/button"
import { useUserStore } from '@/stores/userStore'
import { X } from 'lucide-react' 

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
  const [markedForDelete, setMarkedForDelete] = useState<BookingEvent[]>([])
  
  const seeded = useBookingStore(state => state.seeded)
  const markSeeded = useBookingStore(state => state.markSeeded)
  const addBookings = useBookingStore((state) => state.addBookings);
  
    const role = useUserStore(state => state.role)
    console.log(role);

  const myBookings = useBookingStore((state) => state.bookings);

  useEffect(() => {
    const allMockEvents = Object.values(mockBookingEvents).flat();
    const existingTemplateIds = new Set(myBookings.map(e => e.templateId));
    
    const missingEvents = allMockEvents.filter(e => !existingTemplateIds.has(e.templateId));
    
    if (missingEvents.length > 0) {
      addBookings(missingEvents);
    }
    }, [myBookings, addBookings]
  );


  const updateBookingStatus = useBookingStore((state) => state.updateBookingStatus)

  const handleMarkedBookings = (event: BookingEvent) => {
    if (!markedForDelete.find(e => e.id === event.id)) {
      setMarkedForDelete([...markedForDelete, event])
    }
  }

  const handleCancelAll = () => {
    console.log("Cancelling: ", markedForDelete);
    const idsToCancel = markedForDelete.map((event) => event.id);
    updateBookingStatus(idsToCancel, "cancelled");
    setMarkedForDelete([]);
  }

  const handleSelectEvent = (event: BookingEvent) => {
    setCurrentDate(new Date(event.start))
    setView("day")
  }

  const onRemoveFromDeletion = (event: BookingEvent) => {
    setMarkedForDelete(prev => prev.filter(e => e.id !== event.id));
  };

  return (
    <div className="space-y-6 p-4">
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={myBookings}
          view={view}
          date={currentDate}
          onView={(newView) => setView(newView)}
          onNavigate={(date) => setCurrentDate(date)}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={(event: BookingEvent) => `${findTemplate(event.templateId)?.label}`}
          style={{ height: "100%" }}
          eventPropGetter={(event) => {
            let bgColor = ""
            switch (event.status) {
              case "approved":
                bgColor = "var(--chart-2)"
                break
              case "pending":
                bgColor = "var(--chart-4)"
                break
              case "rejected":
                bgColor = "var(--destructive)"
                break
              case "cancelled":
                bgColor = "var(--muted)"
                break
              default:
                bgColor = "lightgray"
            }

            return {
              style: {
                backgroundColor: bgColor,
                color: event.status === "cancelled" ? "black" : "white",
                border: "none",
                borderRadius: "0.5rem",
              },
            }
          }}
          components={{
            event: (props) => <EventView {...props} onMarkDelete={handleMarkedBookings} />
          }}
        />
      </div>
      {markedForDelete.length > 0 && (
        <div className="mt-6 space-y-2 p-4 border rounded bg-red-50">
          <h3 className="text-lg font-semibold">Marked for Deletion</h3>
          {markedForDelete.map(event => (
              <li key={event.id} className="flex">
                  {findTemplate(event.templateId)?.label} — {new Date(event.start).toLocaleString()}
              <button
                  onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromDeletion(event);
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Remove from deletion"
              >
                  <X size={15} />
              </button>
              </li>
          ))}
          <Button
            onClick={handleCancelAll}
            className="mt-2 px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {markedForDelete.length > 1 ? "Cancel Bookings" : "Cancel Booking"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Schedule;

