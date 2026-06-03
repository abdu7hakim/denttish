import { Search, Calendar, MapPin, Phone, Clock, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function HomePage() {
  const navigate = useNavigate()
  const { doctors, clinics, appointments, clinicSettings, categories } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const activeDoctors = doctors.filter(d => d.status === 'FAOL')

  const searched = activeDoctors.filter(d =>
    !searchQuery ||
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayed = selectedCategory
    ? searched.filter(d => d.specialization === selectedCategory)
    : searched

  const mainClinic = clinics[0] || clinicSettings
  const upcoming = appointments.find(a => a.status === 'Kutilmoqda' || a.status === 'Tasdiqlangan')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {/* Clinic Info Banner */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <MapPin size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{mainClinic?.name || clinicSettings.clinicName}</h1>
              <p className="text-sm text-blue-100">{mainClinic?.address || clinicSettings.address}</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-blue-100 ml-11">
            <span className="flex items-center gap-1"><Phone size={14} /> {mainClinic?.phone || clinicSettings.phone}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {mainClinic?.hours || `${clinicSettings.workingHoursStart} - ${clinicSettings.workingHoursEnd}`}</span>
          </div>
        </div>

        {/* Upcoming Appointment */}
        {upcoming && (
          <div className="mx-4 -mt-3">
            <div className="bg-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Calendar className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-blue-600 font-semibold mb-1">KELASI QABUL</p>
                  <p className="font-bold text-gray-900">{upcoming.doctor}</p>
                  <p className="text-sm text-gray-600">{upcoming.date} • {upcoming.time}</p>
                </div>
                <button onClick={() => navigate('/history')} className="text-blue-600 text-sm font-semibold">Batafsil</button>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="px-4 mt-5">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Shifokor nomi yoki mutaxassislik..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null) }}
                className="flex-1 ml-2 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                !selectedCategory ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              Barcha shifokorlar
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor count */}
        <div className="px-4 mt-3">
          <p className="text-sm text-gray-500">
            {displayed.length} ta shifokor
            {selectedCategory && ` • ${selectedCategory}`}
            {searchQuery && ` • "${searchQuery}"`}
          </p>
        </div>

        {/* Doctors */}
        <div className="px-4 mt-3 space-y-3">
          {displayed.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="bg-white rounded-xl p-4 flex gap-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
            >
              {doctor.image ? (
                <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-100" />
              ) : (
                <div className={`w-14 h-14 rounded-full border-2 border-blue-100 flex items-center justify-center text-white font-bold text-sm ${doctor.avatarBg}`}>
                  {doctor.avatar}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{doctor.name}</h3>
                  {doctor.verified && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">✓</span>}
                </div>
                <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <Clock size={12} className="inline mr-1" />
                  {doctor.workingHours} • {doctor.experience} tajriba
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-0.5 text-yellow-500 text-sm font-bold">
                  ⭐{doctor.rating}
                </div>
                <span className="text-xs text-gray-400">({doctor.reviews})</span>
              </div>
            </div>
          ))}
          {displayed.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">Hech narsa topilmadi</p>
              <p className="text-sm mt-1">Boshqa qidiruv so'zini kiriting yoki kategoryani o'zgartiring</p>
            </div>
          )}
        </div>

        {/* Branches */}
        {clinics.length > 1 && (
          <div className="px-4 mt-5">
            <h2 className="text-lg font-bold mb-3">Filiallar</h2>
            <div className="space-y-2">
              {clinics.map(c => (
                <div key={c.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                  <MapPin size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
