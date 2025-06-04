import React, { useState, useCallback, useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { Event as RBCEvent, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import bookingTemplates from "../templates/BookingTemplates";
import type { BookingEvent, BookingTemplate } from "@/types"
import mockEvents from '../data/events'

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


const BookingForm: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<RBCEvent | null>(null)
  const [view, setView] = useState<View>("month") 
  const [template, setTemplate] = useState<BookingTemplate | null>(bookingTemplates[0]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<RBCEvent[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };



  const findTemplate = (id : string) => bookingTemplates.find(t => t.id === id);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (view === 'month') {
        setView('day');
        setDate(start);
        return;
      }

      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [view, setView, setDate, setEvents]
  );


  const handleSelectEvent = useCallback(
    (event: RBCEvent) => window.alert(event.title),
    []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!template || !selectedSlot) {
      alert('Please select a service and time slot')
      return
    }

    alert(`Booked ${template.label} at ${selectedSlot.start.toLocaleString()}`)
  }

  return (
    <div className="p-4 space-y-6">
      <select
        className="border p-2 rounded"
        value={template?.id || ""}
        onChange={(e) => {
          const selectedTemplate = bookingTemplates.find(t => t.id === e.target.value);
          setTemplate(selectedTemplate || null);
        }}
      >
        <option value="">Select a Service</option>
        {bookingTemplates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>


      {template && (
        <div style={{ height: '400px' }}>
          <Calendar
            localizer={localizer}
            events={mockEvents[template.id]}
            view={view}
            date={date}
            onView={(newView) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate)}
            selectable
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
          />
      </div>
    )}

      {selectedSlot &&(<button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit Booking
      </button>)}

      {selectedSlot?.start && (
        <div className="text-green-600">
          Selected slot: {selectedSlot.start.toLocaleString()}
        </div>
      )}
    </div>
  )
}

export default BookingForm

