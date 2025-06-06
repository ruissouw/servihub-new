import { useBookingStore } from '../stores/useBookingStore'
import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'

describe('useBookingStore', () => {
  beforeEach(() => {
    useBookingStore.setState({ bookings: [], seeded: false })
  })

  it('adds new bookings', () => {
    const booking = {
      id: '1',
      templateId: 'test-template',
      start: new Date(),
      end: new Date(),
      status: 'pending' as const,
      resourceIds: [],
      customFields: {},
    }

    act(() => {
      useBookingStore.getState().addBookings([booking])
    })

    const bookings = useBookingStore.getState().bookings
    expect(bookings).toHaveLength(1)
    expect(bookings[0].id).toBe('1')
  })

  it('updates a booking', () => {
    const booking = {
      id: '1',
      templateId: 'test-template',
      start: new Date(),
      end: new Date(),
      status: 'pending' as const,
      resourceIds: [],
      customFields: {},
    }
    act(() => {
      useBookingStore.getState().addBookings([booking])
    })

    const updatedBooking = { ...booking, status: 'approved' as const}

    act(() => {
      useBookingStore.getState().updateBooking(updatedBooking)
    })

    const b = useBookingStore.getState().getBookingById('1')
    expect(b?.status).toBe('approved')
  })

  it('updates booking status in bulk', () => {
    const bookings = [
      { id: '1', templateId: 'a', start: new Date(), end: new Date(), status: 'pending' as const, resourceIds: [], customFields: {} },
      { id: '2', templateId: 'b', start: new Date(), end: new Date(), status: 'pending' as const, resourceIds: [], customFields: {} },
    ]

    act(() => {
      useBookingStore.getState().addBookings(bookings)
    })

    act(() => {
      useBookingStore.getState().updateBookingStatus(['1', '2'], 'approved')
    })

    const allBookings = useBookingStore.getState().bookings
    expect(allBookings.every(b => b.status === 'approved')).toBe(true)
  })
})

