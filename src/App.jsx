import { useState } from 'react'

import './App.css'
import Header from './components/header/Header'
import About from './components/About'
import Team from './components/Team'
import News from './components/News'
import Appointment from './components/Appointment'
import GoogleMap from './components/GoogleMap'
import Footer from './components/Footer'
import AddDoctor from './components/AddDoctor'

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
      <Header onAddDoctor={handleAddDoctor} />
      {showAddDoctor && <AddDoctor onClose={handleCloseAddDoctor} />}
      <About />
      <Team />
      <News />
      <Appointment />
      <GoogleMap />
      <Footer />


      
    </>
  )
}

export default App
