import { Search, Home, Clock, Box, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function HomePage() {
  const navigate = useNavigate()
  const { doctors, clinics, appointments } = useAppContext()
  const upcomingAppointment = appointments.find(a => a.status === 'Tasdiqlangan' || a.status === 'Kutilmoqda')
  const activeDoctors = doctors.filter(d => d.status === 'FAOL')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pb-20">
        {/* Greeting Section */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">Xayrli tong, Abdulloh</h1>
          <p className="text-gray-600">Tishlaringiz sog'lig'i haqida qayg'urish vaqti keldi.</p>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-white rounded-full px-4 py-3 shadow-sm">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Klinikalar yoki shifokorlarni izlash"
                className="flex-1 ml-2 outline-none text-sm"
              />
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold">
              Qidirish
            </button>
          </div>
        </div>

        {/* Upcoming Appointment */}
        {upcomingAppointment && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold mb-3">Kelasi qabul</h2>
            <div className="bg-blue-100 rounded-2xl p-4">
              <div className="flex gap-3">
                <img
                  src={doctors.find(d => d.name === upcomingAppointment.doctor)?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor'}
                  alt="Doctor"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{upcomingAppointment.doctor}</h3>
                  <p className="text-sm text-gray-600">{upcomingAppointment.clinic}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="bg-white px-2 py-1 rounded">{upcomingAppointment.date} {upcomingAppointment.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">Kategoriyalar</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['Hammasi', 'Umumiy', 'Ortodontist', 'Kosmetik', 'Implant'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Clinics */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Yaqin atrofdagi klinikalar</h2>
            <button onClick={() => navigate('/clinics')} className="text-primary text-sm font-semibold">Barchasi</button>
          </div>
          <div className="space-y-3">
            {clinics.slice(0, 3).map((clinic) => (
              <div key={clinic.id} className="bg-white rounded-lg p-4 flex gap-3 cursor-pointer hover:shadow-md">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{clinic.name}</h3>
                  <div className="flex items-center gap-2 my-1">
                    <span className="text-yellow-400">⭐</span>
                    <span>{clinic.rating}</span>
                    <span className="text-gray-500">• {clinic.distance} km</span>
                  </div>
                  <div className="flex gap-2">
                    {clinic.services.slice(0, 2).map((s) => (
                      <span key={s} className="text-xs bg-blue-100 text-primary px-2 py-1 rounded">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="text-primary text-xl">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Doctors */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Mashhur shifokorlar</h2>
            <button onClick={() => navigate('/doctors')} className="text-primary text-sm font-semibold">Barchasi</button>
          </div>
          <div className="space-y-3">
            {activeDoctors.slice(0, 3).map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg p-4 flex gap-3 cursor-pointer hover:shadow-md"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>
                <button className="text-gray-400 text-xs">Band qilish</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
