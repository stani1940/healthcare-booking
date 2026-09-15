import { useState } from 'react'

import './App.css'
import Header from './components/header/Header'
import About from './components/About'
import Team from './components/Team'
import News from './components/News'
import Appointment from './components/Appointment'
import GoogleMap from './components/GoogleMap'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
      <Header />
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
