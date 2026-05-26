import { CheckCircle, Calendar, Clock, MapPin, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function AcceptedPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">Band qilish tasdiqlandi</h1>
        <p className="text-gray-600 text-center mb-8">
          Sizning uchrashuvingiz tasdiqlandi. Tafsilotlarni Telegram xabarlaringizga yubordik.
        </p>

        {/* Appointment Details */}
        <div className="w-full max-w-md bg-white rounded-lg p-6 space-y-4 mb-8">
          {/* Doctor */}
          <div className="flex gap-3 pb-4 border-b">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
              alt="Doctor"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="font-bold">Dr. Elena Rostova</p>
              <p className="text-sm text-gray-600">Katta endodontist</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Sana</p>
                <p className="font-bold">24-oktabr, 2023</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Vaqt</p>
                <p className="font-bold">10:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Joylashuv</p>
                <p className="font-bold">Lumina Dental Studio</p>
                <p className="text-sm text-gray-600">Foshkent sh., Amir Temur ko'chasi 45-uy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold"
          >
            BOSH SAHIFAGA QAYTISH
          </button>
          <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold">
            TELEGRAM TAQVIMIGA QO'SHISH
          </button>
        </div>
      </div>
    </div>
  )
}
