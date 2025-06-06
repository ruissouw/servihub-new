import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { Event as RBCEvent, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays, addWeeks, addMonths } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import bookingTemplates from "../templates/BookingTemplates";
import type { BookingEvent, BookingTemplate } from "@/types"
import DynamicForm from './DynamicForm'
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';
import { useBookingStore } from '@/stores/useBookingStore'
import { useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'


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

  const { id } = useParams();
  const getBookingById = useBookingStore((state) => state.getBookingById);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const existing = getBookingById(id);
      if (existing) {
        setSelectedSlot(existing);
        setTemplate(findTemplate(existing.templateId) || bookingTemplates[0]);
        setFormData(existing.customFields);
        setResourceIds(existing.resourceIds);
        setDate(existing.start);
        setView("day");
      }
    }
  }, [id]);

  const addBookings = useBookingStore((state) => state.addBookings);
  const allBookings = useBookingStore((state) => state.bookings)

  
  const bookings = useMemo(() => !template.id ? [] : allBookings.filter(b => b.templateId === template.id && b.id !== id), 
    [allBookings, template.id, id]
  );

  const findTemplate = (id : string) => bookingTemplates.find(t => t.id === id);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (view === 'month') {
        setView('day');
        setDate(start);
        return;
      }

       setSelectedSlot((prev) => ({
        id: prev?.id || uuidv4(),
        templateId: template.id,
        start,
        end,
        status: "pending",
        resourceIds,
        customFields: formData,
      }));
    },
    [view, setView, setDate, template.id, resourceIds, formData]
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
    console.log(formData.recurrenceType);
    let upperBound = parseInt(formData.maxSlots, 10);

    const generatedBookings = [];
    if (freq === "ONE-OFF BOOKING") {
        upperBound = 1;
    }

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
        status: 'pending' as const,
        resourceIds,
        customFields: formData,
      });
    }

    if (id) {
      updateBooking({
        ...selectedSlot,
        customFields: formData,
        resourceIds,
        templateId: template.id,
      })
    } else {
      console.log("Bookings:", generatedBookings);
      addBookings(generatedBookings);
      setSelectedSlot(null);
    }

    navigate("/")
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
            events={[...bookings, ...(selectedSlot ? [selectedSlot] : [])]}
            view={view}
            date={date}
            onView={(newView) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate)}
            selectable
            startAccessor="start"
            endAccessor="end"
            titleAccessor={(event: BookingEvent) => `${findTemplate(event.templateId)?.label}`}
            style={{ height: "100%" }}
            onSelectSlot={handleSelectSlot}
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
          />
      </div>
      {selectedSlot && (
        <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Edit Booking" : "Make Booking"}
        </Button>
      )}
    </form>
  )
}

export default BookingForm

