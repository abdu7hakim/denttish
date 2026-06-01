import { ArrowLeft, MapPin, Heart, Share2, Calendar, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function DoctorPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { doctors, clinics } = useAppContext()
  const doctor = doctors.find(d => d.id === parseInt(id))
  const doctorClinic = clinics.find(c => c.name === doctor?.clinic)

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Shifokor topilmadi</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Back Button */}
        <div className="flex items-center gap-3 p-4 bg-white">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary">
            <ArrowLeft size={20} />
            <span>Shifokor profili</span>
          </button>
        </div>

        {/* Doctor Info */}
        <div className="bg-white p-6 text-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <div className="flex justify-center gap-2 mb-2">
            {doctor.verified && (
              <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded">Tasdiqlangan</span>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-1">{doctor.name}</h1>
          <p className="text-gray-600 mb-4">{doctor.specialization}</p>

          {/* Stats */}
          <div className="flex justify-around py-4 border-y border-gray-200 mb-4">
            <div>
              <div className="flex items-center justify-center gap-1">
                <Star size={16} className="text-yellow-400" />
                <span className="font-bold">{doctor.rating}</span>
              </div>
              <p className="text-xs text-gray-600">{doctor.reviews}+ sharhlar</p>
            </div>
            <div>
              <span className="font-bold text-lg">{doctor.experience.replace(' yil', '')}</span>
              <p className="text-xs text-gray-600">Yil tajribasi</p>
            </div>
            <div>
              <span className="font-bold text-lg">{doctor.patients}</span>
              <p className="text-xs text-gray-600">Bemorlar</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg">
              <Heart size={20} />
              Sevimli
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg">
              <Share2 size={20} />
              Ulashish
            </button>
          </div>
        </div>

        {/* Doctor Info Section */}
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <span>ℹ️</span> Shifokor haqida
            </h3>
            <p className="text-sm text-gray-600">
              {doctor.name} — {doctor.specialization} bo'yicha mutaxassis. {doctor.experience} tajribaga ega. {doctor.patients} dan ortiq bemorlarga xizmat ko'rsatgan.
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <MapPin size={20} /> Manzili va klinika
            </h3>
            <p className="text-sm font-semibold mb-1">{doctor.clinic}</p>
            <p className="text-sm text-gray-600">{doctorClinic?.address || doctorClinic?.name || 'Tashkent'}</p>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Tabassum galereyasi</h3>
              <a href="#" className="text-primary text-sm">Barchasi</a>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=smile1"
                alt="Smile"
                className="w-full h-24 rounded-lg object-cover"
              />
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=smile2"
                alt="Smile"
                className="w-full h-24 rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Booking */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Calendar size={20} /> Qabul yozilish
            </h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                {['16', '17', '18', '19'].map((day) => (
                  <button
                    key={day}
                    className={`flex-1 py-2 rounded font-semibold ${
                      day === '17' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['09:00', '09:30', '10:30', '11:00', '14:00', '14:30'].map((time) => (
                  <button key={time} className="py-2 border border-gray-300 rounded text-sm">
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => navigate(`/booking/${doctor.id}`)} className="w-full bg-primary text-white py-3 rounded-lg font-bold mt-4">
              Qabul yozilish →
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
