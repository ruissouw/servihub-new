import React from 'react'
import Navbar from "../components/Navbar"
import Schedule from "../components/Schedule"

const Home = () => {
  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      <div>
        <Schedule />
      </div>
    </>
  )
}

export default Home
