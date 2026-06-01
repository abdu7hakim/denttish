import { ArrowLeft, Star, MapPin, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { useAppContext } from '../context/AppContext'

export default function DoctorsPage() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const { doctors } = useAppContext()

  // Map admin doctors to display format
  const displayDoctors = doctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialization + (doctor.subspecialty ? ` - ${doctor.subspecialty}` : ''),
    clinic: 'DentTish Klinika',
    rating: 4.8,
    reviews: parseInt(doctor.patients.replace(/\D/g, '')) || 100,
    experience: parseInt(doctor.experience),
    distance: 2.5,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`,
    verified: doctor.status === 'FAOL',
    phone: doctor.phone,
    status: doctor.status,
  }))

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  // Old dummy data - removed and replaced with AppContext data
  // (This data is not used anymore, displayDoctors is used instead)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Header */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold flex-1">Shifokorlar</h1>
          </div>
          <p className="text-gray-600 text-sm">{displayDoctors.length} ta shifokor</p>
        </div>

        {/* Doctors List */}
        <div className="p-4 space-y-3">
          {displayDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg p-4 hover:shadow-md transition">
              <div className="flex gap-3">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{doctor.name}</h3>
                        {doctor.verified && (
                          <span className="text-xs bg-blue-100 text-primary px-2 py-0.5 rounded">
                            ✓ Faol
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{doctor.specialty}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(doctor.id)}
                      className={`p-2 rounded-full ${
                        favorites.includes(doctor.id)
                          ? 'bg-red-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={
                          favorites.includes(doctor.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }
                      />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">{doctor.clinic}</p>

                  <div className="flex gap-3 text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-600">({doctor.reviews})</span>
                    </div>
                    <span className="text-gray-600">• {doctor.experience} yil</span>
                    <span className="text-gray-600">• {doctor.distance} km</span>
                  </div>

                  <button
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                    className="w-full text-primary font-bold text-sm hover:underline py-2"
                  >
                    PROFIL KO'RISH →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
