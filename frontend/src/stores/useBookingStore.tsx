import { create } from 'zustand'
import type { BookingEvent } from '@/types'

type BookingStore = {
  bookings: BookingEvent[]
  addBookings: (events: BookingEvent[]) => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  addBookings: (events) =>
    set((state) => ({
      bookings: [...state.bookings, ...events],
    })),
}))


