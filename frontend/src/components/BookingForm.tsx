import React, { useState, useCallback, useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { Event as RBCEvent, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import bookingTemplates from "../templates/BookingTemplates";
import type { BookingEvent, BookingTemplate } from "@/types"
import mockBookingEvents from '@/data/events'
import DynamicForm from './DynamicForm'
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

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
  const [template, setTemplate] = useState<BookingTemplate>(bookingTemplates[0]);
  const [recurrence, setRecurrence] = useState<string>("One-off booking");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<RBCEvent[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  const recurrenceTypes: string[] = ["One-off booking", "Daily", "Weekly", "Monthly"];

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
        setSelectedSlot({ start, end, title });
      }
    },
    [view, setView, setDate, setEvents]
  );


  const handleSelectEvent = useCallback(
    (event: RBCEvent) => window.alert(event.title),
    []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!template || !selectedSlot) {
      alert('Please select a service and time slot');
      return;
    }

    const { start, end } = selectedSlot;
    alert(`Booked ${template.label} from ${start?.toLocaleString()} to ${end?.toLocaleString()}`);
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <Select
        key='template'
        onValueChange={(t) => {
                        const temp = findTemplate(t);
                        temp ? setTemplate(temp) : console.log("Template not found!");
                      }}
        value={template.id}
      >
        <SelectTrigger>{template.label || "Select a service"}</SelectTrigger>
        <SelectContent>
          {bookingTemplates?.map(t => (
            <SelectItem key={t.id} value={t.id}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DynamicForm fields={template.fields} />
      <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={mockBookingEvents[template.id]}
            view={view}
            date={date}
            onView={(newView) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate)}
            selectable
            startAccessor="start"
            endAccessor="end"
            titleAccessor={(event: BookingEvent) => `${event.id}`}
            style={{ height: "100%" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
          />
      </div>
      <Select
        key="recurrence"
        onValueChange={(r) => setRecurrence(r)}
        value={recurrence}
      >
        <SelectTrigger>{recurrence || "Select frequency"}</SelectTrigger>
        <SelectContent>
          {recurrenceTypes.map(r => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedSlot && (
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Make Booking
        </button>
      )}
    </form>
  )
}

export default BookingForm

