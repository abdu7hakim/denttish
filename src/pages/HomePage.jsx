import { Search, Home, Clock, Box, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pb-20">
        {/* Greeting Section */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">Xayrli tong, Sarah</h1>
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
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">Kelasi qabul</h2>
          <div className="bg-blue-100 rounded-2xl p-4">
            <div className="flex gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Doctor"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-bold">Dr. Emily Chen</h3>
                <p className="text-sm text-gray-600">SmileCare klinikasi</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="bg-white px-2 py-1 rounded">BUGUN 14:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">Kategoriyalar</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['Hammasi', 'Umumiy', 'Ortodontist'].map((category) => (
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
            {[
              { name: 'Lumina Dental Hub', rating: 4.8, distance: 1.2, km: true },
            ].map((clinic) => (
              <div key={clinic.name} className="bg-white rounded-lg p-4 flex gap-3 cursor-pointer hover:shadow-md">
                <img
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=clinic"
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
                    <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded">UMUMIY</span>
                    <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded">RENTGEN</span>
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
            {[
              { name: 'Dr. Marcus Vance', specialty: 'Ortodontist', action: 'Band qilish' },
            ].map((doctor) => (
              <div
                key={doctor.name}
                className="bg-white rounded-lg p-4 flex gap-3 cursor-pointer hover:shadow-md"
                onClick={() => navigate('/doctor/1')}
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
                <button className="text-gray-400 text-xs">{doctor.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
