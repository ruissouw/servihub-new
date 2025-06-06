import { useState, useEffect } from "react"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { View, EventProps } from 'react-big-calendar'
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
import BizEventView from "./BizEventView"
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

const BizSchedule = () => {
    const [view, setView] = useState<View>("month") 
    const [currentDate, setCurrentDate] = useState(new Date());
    const [markedForApproval, setMarkedForApproval] = useState<BookingEvent[]>([])
    const [markedForRejection, setMarkedForRejection] = useState<BookingEvent[]>([])

    const seeded = useBookingStore(state => state.seeded)
    const markSeeded = useBookingStore(state => state.markSeeded)
    const addBookings = useBookingStore((state) => state.addBookings);
    const clearBookings = useBookingStore((state) => state.clearBookings)
    const role = useUserStore(state => state.role)

    useEffect(() => {
        const allMockEvents = Object.values(mockBookingEvents).filter(e => e.templateId === role)
        clearBookings()
        addBookings(allMockEvents)
        }, [role]
    )

    const updateBookingStatus = useBookingStore((state) => state.updateBookingStatus)
    const bookings = useBookingStore((state) => state.bookings)

    const handleMarkApprove = (event: BookingEvent) => {
        setMarkedForRejection(prev => prev.filter(e => e.id !== event.id));
        setMarkedForApproval(prev =>
            prev.find(e => e.id === event.id) ? prev : [...prev, event]
        );
    };

    const handleMarkReject = (event: BookingEvent) => {
        setMarkedForApproval(prev => prev.filter(e => e.id !== event.id));
        setMarkedForRejection(prev =>
            prev.find(e => e.id === event.id) ? prev : [...prev, event]
        );
    };


    const handleRejectAll = () => {
        console.log("Rejecting: ", markedForRejection);
        const idsToReject = markedForRejection.map((event) => event.id);
        updateBookingStatus(idsToReject, "rejected");
        setMarkedForRejection([]);
    }

    const handleApproveAll = () => {
        console.log("Approving: ", markedForApproval);
        const idsToApprove = markedForApproval.map((event) => event.id);
        updateBookingStatus(idsToApprove, "approved");
        setMarkedForApproval([]);
    }

    const handleSelectEvent = (event: BookingEvent) => {
        setCurrentDate(new Date(event.start))
        setView("day")
    }

    const EventWrapper = (props: EventProps<BookingEvent>) => {
        return (
            <BizEventView
            {...props}
            onMarkApprove={handleMarkApprove}
            onMarkReject={handleMarkReject}
            />
        );
    };

    const onRemoveFromApproval = (event: BookingEvent) => {
        setMarkedForApproval(prev => prev.filter(e => e.id !== event.id));
    };

    const onRemoveFromRejection = (event: BookingEvent) => {
        setMarkedForRejection(prev => prev.filter(e => e.id !== event.id));
    };


    return (
        <div className="space-y-6 p-4">
            <div style={{ height: '500px' }}>
                <Calendar
                localizer={localizer}
                events={bookings}
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
                    event: EventWrapper
                }}
                />
            </div>
            {markedForApproval.length > 0 && (
                <div className="mt-6 space-y-2 p-4 border rounded bg-green-50">
                    <h3 className="text-lg font-semibold">Marked for Approval</h3>
                    {markedForApproval.map(event => (
                        <li key={event.id} className="flex">
                            {findTemplate(event.templateId)?.label} — {new Date(event.start).toLocaleString()}
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFromApproval(event);
                            }}
                            className="text-red-500 hover:text-red-700"
                            title="Remove from approval"
                        >
                            <X size={15} />
                        </button>
                        </li>
                    ))}
                    <Button
                    onClick={handleApproveAll}
                    className="mt-2 px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                    {markedForApproval.length > 1 ? "Approve Bookings" : "Approve Booking"}
                    </Button>
                </div>
            )}

            {markedForRejection.length > 0 && (
                <div className="mt-6 space-y-2 p-4 border rounded bg-red-50">
                <h3 className="text-lg font-semibold">Marked for Rejection</h3>
                {markedForRejection.map(event => (
                        <li key={event.id} className="flex">
                            {findTemplate(event.templateId)?.label} — {new Date(event.start).toLocaleString()}
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFromRejection(event);
                            }}
                            className="text-red-500 hover:text-red-700"
                            title="Remove from rejection"
                        >
                            <X size={15} />
                        </button>
                        </li>
                ))}
                <Button
                    onClick={handleRejectAll}
                    className="mt-2 px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                    {markedForRejection.length > 1 ? "Reject Bookings" : "Reject Booking"}
                </Button>
                </div>
            )}
        </div>
    )
}

export default BizSchedule