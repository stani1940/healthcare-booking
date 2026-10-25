import './App.css'
import Appointment from './components/Appointment'
import AddDoctor from './components/AddDoctor'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Team from './components/Team'
import UserAppointments from './components/UserAppointments'  
import ProtectedRoute from './components/ProtectedRoute'
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
            <Route path="/add-doctor" element={
              <ProtectedRoute>
                <AddDoctor />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/doctors" element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/appointments" element={
              <ProtectedRoute>
                <UserAppointments />
              </ProtectedRoute>
            } />
            <Route path="/my-appointments" element={
              <ProtectedRoute>
                <UserAppointments />
              </ProtectedRoute>
            } />
          </Routes>
    </AuthProvider>
  )
}

export default App
