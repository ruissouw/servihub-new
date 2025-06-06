import './App.css'
import './index.css'
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import ScheduleBookings from './pages/ScheduleBookings'
import Login from './pages/Login'


const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<ScheduleBookings />} />
        <Route path="/schedule/:id" element={<ScheduleBookings />} />
      </Routes>
    </main>
  );
};


export default App
