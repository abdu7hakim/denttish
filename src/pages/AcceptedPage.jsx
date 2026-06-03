import { CheckCircle, Calendar, Clock, MapPin, User, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'

export default function AcceptedPage() {
  const navigate = useNavigate()
  const { lastBooking, doctors } = useAppContext()
  const booking = lastBooking
  const doctor = doctors.find(d => d.id === (booking?.doctorId || 1))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4">
        <div className="mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Band qilish tasdiqlandi</h1>
        <p className="text-gray-600 text-center mb-8">
          Sizning qabulingiz qabul qilindi. Admin tomonidan tasdiqlanishi kutilmoqda.
        </p>

        <div className="w-full max-w-md bg-white rounded-lg p-6 space-y-4 mb-8">
          <div className="flex gap-3 pb-4 border-b">
            {doctor?.image ? (
              <img src={doctor.image} alt="Doctor" className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm ${doctor?.avatarBg || 'bg-blue-500'}`}>
                {doctor?.avatar || '?'}
              </div>
            )}
            <div>
              <p className="font-bold">{booking?.doctor || 'Shifokor'}</p>
              <p className="text-sm text-gray-600">{doctor?.specialization || 'Stomatolog'}</p>
            </div>
          </div>

          {booking?.patient && (
            <div className="flex items-center gap-3">
              <User className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Bemor</p>
                <p className="font-bold">{booking.patient}</p>
              </div>
            </div>
          )}
          {booking?.phone && (
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="font-bold">{booking.phone}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Sana</p>
                <p className="font-bold">{booking?.date || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Vaqt</p>
                <p className="font-bold">{booking?.time || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Joylashuv</p>
                <p className="font-bold">{booking?.clinic || 'DentTish Klinika'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold"
          >
            BOSH SAHIFAGA QAYTISH
          </button>
        </div>
      </div>
    </div>
  )
}
