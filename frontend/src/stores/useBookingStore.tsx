import { create } from 'zustand'
import type { BookingEvent } from '@/types'

type BookingStore = {
  bookings: BookingEvent[]
  addBookings: (events: BookingEvent[]) => void
  updateBookingStatus: (ids: string[], newStatus: BookingEvent['status']) => void
  seeded: boolean
  markSeeded: () => void
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  seeded: false,
  addBookings: events => {
    const existing = get().bookings
    const newEvents = events.filter(
      e => !existing.find((existingEvent) => existingEvent.id === e.id)
    )
    set({
      bookings: [...existing, ...newEvents],
    })
  },
  updateBookingStatus: (ids, newStatus) =>
    set(state => ({
      bookings: state.bookings.map((event) =>
        ids.includes(event.id) ? { ...event, status: newStatus } : event
      ),
    })),
  markSeeded: () => set({ seeded: true }),
}))
