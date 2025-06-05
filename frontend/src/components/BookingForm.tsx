import React, { useState, useCallback } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { Event as RBCEvent, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays, addWeeks, addMonths } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import bookingTemplates from "../templates/BookingTemplates";
import type { BookingEvent, BookingTemplate } from "@/types"
import mockBookingEvents from '@/data/events'
import DynamicForm from './DynamicForm'
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


const BookingForm: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<BookingEvent | null>(null);
  const [view, setView] = useState<View>("month") 
  const [template, setTemplate] = useState<BookingTemplate>(bookingTemplates[0]);
  const [resourceIds, setResourceIds] = useState<string[]>([])
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [date, setDate] = useState<Date>(new Date());

  const findTemplate = (id : string) => bookingTemplates.find(t => t.id === id);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (view === 'month') {
        setView('day');
        setDate(start);
        return;
      }

      setSelectedSlot({
        id: "Current Booking",
        templateId: template.id,
        start,
        end,
        status: "pending",
        resourceIds: [],
        customFields: {},
      });
    },
    [view, setView, setDate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      console.log("No time slot selected"); 
      return;
    }

    if (!template) {
      console.log("No template selected");
      return;
    }

    if (!selectedSlot?.start || !selectedSlot?.end) {
      console.error("Invalid time slot");
      return;
    }

    const { start, end } = selectedSlot

    const freq = formData.recurrenceType;
    const upperBound = parseInt(formData.maxSlots, 10);

    const generatedBookings = [];

    for (let i = 0; i < upperBound; i++) {
      let newStart = start;
      let newEnd = end;

      switch (freq) {
        case "DAILY":
          newStart = addDays(start, i);
          newEnd = addDays(end, i);
          break;
        case "WEEKLY":
          newStart = addWeeks(start, i);
          newEnd = addWeeks(end, i);
          break;
        case "MONTHLY":
          newStart = addMonths(start, i);
          newEnd = addMonths(end, i);
          break;
        default:
          break; 
      }

      generatedBookings.push({
        id: uuidv4(),
        templateId: template.id,
        start: newStart,
        end: newEnd,
        status: 'pending',
        resourceIds,
        customFields: formData,
      });
    }

    console.log("Bookings:", generatedBookings);

  };

  const filteredFields = template.fields.filter(
    field => !(field.id === 'recurrenceType' && !template.recurrence?.allowed)
  );


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

      <DynamicForm
        fields={filteredFields}
        formData={formData}
        setFormData={setFormData}
      />

      <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={[...mockBookingEvents[template.id], ...(selectedSlot ? [selectedSlot] : [])]}
            view={view}
            date={date}
            onView={(newView) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate)}
            selectable
            startAccessor="start"
            endAccessor="end"
            titleAccessor={(event: BookingEvent) => `${event.id}`}
            style={{ height: "100%" }}
            onSelectSlot={handleSelectSlot}
          />
      </div>
      {selectedSlot && (
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Make Booking
        </button>
      )}
    </form>
  )
}

export default BookingForm

