import React from 'react'
import Navbar from "../components/Navbar"
import Schedule from "../components/Schedule"

const Home = () => {
  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="flex justify-end p-4 h-[500px]">
        <div className="w-1/2">
          <Schedule />
        </div>
      </div>
    </>
  )
}

export default Home
