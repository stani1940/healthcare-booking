import { useState } from 'react'

import './App.css'
import Appointment from './components/Appointment'
import AddDoctor from './components/AddDoctor'
import Home from './components/Home'
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
            <Route path="/add-doctor" element={<AddDoctor />} />
          </Routes>
    </BrowserRouter>


      
    </>
  )
}

export default App
