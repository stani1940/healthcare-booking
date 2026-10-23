import './App.css'
import Appointment from './components/Appointment'
import AddDoctor from './components/AddDoctor'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Team from './components/Team'
import UserAppointments from './components/UserAppointments'  
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/login" element={<Home showLogin />} />
            <Route path="/register" element={<Home showRegister />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/doctors" element={<Team />} />
            <Route path="/dashboard/appointments" element={<UserAppointments />} />
            <Route path="/my-appointments" element={<UserAppointments />} />  
          </Routes>
    </AuthProvider>
  )
}

export default App
