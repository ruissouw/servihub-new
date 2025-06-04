import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import ScheduleBookings from './pages/ScheduleBookings'


const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<ScheduleBookings />} />
      </Routes>
    </main>
  );
};


export default App
