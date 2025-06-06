import React from 'react'
import Navbar from "../components/Navbar"
import Schedule from "../components/Schedule"
import { useUserStore } from '@/stores/userStore'
import BizSchedule from "../components/BizSchedule"

const Home = () => {
  const role = useUserStore(state => state.role)
  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      <div>
        {role === "customer" ? <Schedule /> : <BizSchedule />}
      </div>
    </>
  )
}

export default Home
