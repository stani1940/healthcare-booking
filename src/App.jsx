import { useState } from 'react'

import './App.css'
import Appointment from './components/Appointment'
import AddDoctor from './components/AddDoctor'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UserAppointments from './components/UserAppointments'  
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  function handleAddDoctor() {
    setShowAddDoctor(true);
  }
  function handleCloseAddDoctor() {   
    setShowAddDoctor(false);
  }

  return (
    <>

    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-appointments" element={<UserAppointments />} />  
          </Routes>
    </BrowserRouter>


      
    </>
  )
}

export default App
