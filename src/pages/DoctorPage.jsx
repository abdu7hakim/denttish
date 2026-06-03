import { ArrowLeft, MapPin, Heart, Share2, Calendar, Clock, Star, Check, Phone, ChevronRight } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function DoctorPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { doctors, clinics } = useAppContext()
  const doctor = doctors.find(d => d.id === parseInt(id))

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Shifokor topilmadi</p>
      </div>
    )
  }

  const doctorClinic = clinics.find(c => c.name === doctor.clinic)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {/* Back */}
        <div className="bg-white px-4 py-3 border-b sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary font-medium">
            <ArrowLeft size={20} />
            <span>Ortga</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 text-center border-b">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-blue-100"
          />
          <div className="flex justify-center gap-2 mb-2">
            {doctor.verified && (
              <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                <Check size={12} /> Tasdiqlangan
              </span>
            )}
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{doctor.specialization}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h1>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-900">{doctor.rating}</span>
              <span className="text-gray-500">({doctor.reviews})</span>
            </div>
            <div className="text-gray-600">{doctor.experience} tajriba</div>
            <div className="text-gray-600">{doctor.patients} bemor</div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          {/* Working Hours */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Ish vaqti
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Ish kunlari:</span>
              <span className="text-sm font-semibold text-gray-900">
                {doctor.workingDays?.[0]} – {doctor.workingDays?.slice(-1)[0]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ish vaqti:</span>
              <span className="text-sm font-semibold text-primary">{doctor.workingHours}</span>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> Manzil
            </h3>
            <p className="text-sm font-semibold text-gray-900">{doctor.clinic}</p>
            <p className="text-sm text-gray-500">{doctorClinic?.address || 'Toshkent shahri'}</p>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Shifokor haqida</h3>
            <p className="text-sm text-gray-600">
              {doctor.name} — {doctor.specialization} bo'yicha mutaxassis. {doctor.experience} tajribaga ega. {doctor.subspecialty && `Yo'nalishi: ${doctor.subspecialty}.`}
            </p>
          </div>
        </div>

        {/* Book Button */}
        <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-white border-t">
          <button
            onClick={() => navigate(`/booking/${doctor.id}`)}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Qabulga yozilish
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
