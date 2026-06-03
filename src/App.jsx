import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ProtectedRoute from './admin/utils/auth'
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
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import DoctorsManagement from './admin/pages/DoctorsManagement'
import AppointmentsManagement from './admin/pages/AppointmentsManagement'
import AdminSettings from './admin/pages/AdminSettings'
import CategoriesManagement from './admin/pages/CategoriesManagement'

function App() {
  return (
    <AppProvider>
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
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute><DoctorsManagement /></ProtectedRoute>} />
          <Route path="/admin/appointments" element={<ProtectedRoute><AppointmentsManagement /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><CategoriesManagement /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
