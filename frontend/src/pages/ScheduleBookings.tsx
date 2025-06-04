import React from 'react'
import Navbar from "../components/Navbar"
import BookingForm from "../components/BookingForm"

const ScheduleBookings = () => {
  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      <div style={{ height: '500px', padding: '1rem' }}>
        <BookingForm />
      </div>
    </>
  )
}

export default ScheduleBookings
