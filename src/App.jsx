import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DoctorPage from './pages/DoctorPage'
import AIPage from './pages/AIPage'
import EmergencyPage from './pages/EmergencyPage'
import HistoryPage from './pages/HistoryPage'
import AcceptedPage from './pages/AcceptedPage'
import ProfilePage from './pages/ProfilePage'
import ClinicsPage from './pages/ClinicsPage'
import DoctorsPage from './pages/DoctorsPage'
import BookingPage from './pages/BookingPage'
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctor/:id" element={<DoctorPage />} />
        <Route path="/ai" element={<AIPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/accepted" element={<AcceptedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/clinics" element={<ClinicsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/booking/:doctorId" element={<BookingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  )
}

export default App
