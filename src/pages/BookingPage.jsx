import { ArrowLeft, Calendar, Clock, MapPin, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function BookingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedService, setSelectedService] = useState(null)

  const doctor = {
    name: 'Dr. Sarah Jenkins',
    specialty: 'Kosmetik stomatologiya',
    clinic: 'DentTish Premium Clinic',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  }

  const services = [
    { id: 1, name: 'Tish tahlili', duration: '30 min', price: '50,000' },
    { id: 2, name: 'Tish tozalash', duration: '45 min', price: '150,000' },
    { id: 3, name: 'Tish tozhish', duration: '60 min', price: '300,000' },
    { id: 4, name: 'Tish oqartirish', duration: '90 min', price: '500,000' },
  ]

  const availableTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  const canContinue = () => {
    if (step === 1) return selectedService
    if (step === 2) return selectedDate
    if (step === 3) return selectedTime
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Header */}
        <div className="bg-white p-4 border-b sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold flex-1">Band qilish</h1>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  s <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Doctor Info */}
        <div className="bg-white p-4 border-b">
          <div className="flex gap-3">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold text-sm">{doctor.name}</h3>
              <p className="text-xs text-gray-600">{doctor.specialty}</p>
              <p className="text-xs text-gray-500">{doctor.clinic}</p>
            </div>
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="p-4">
            <h2 className="font-bold mb-3">Xizmat turini tanlang</h2>
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition ${
                    selectedService === service.id
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold">{service.name}</h3>
                    <span className="text-primary font-bold">{service.price} so'm</span>
                  </div>
                  <p className="text-xs text-gray-600">{service.duration}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        {step === 2 && (
          <div className="p-4">
            <h2 className="font-bold mb-3">Sana tanlang</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {dates.map((date, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(idx)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition ${
                    selectedDate === idx
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">
                        {date.toLocaleDateString('uz-UZ', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-600">
                        {date.toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                    <span className="text-primary font-bold">Mavjud</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Time */}
        {step === 3 && (
          <div className="p-4">
            <h2 className="font-bold mb-3">Vaqt tanlang</h2>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 font-bold transition ${
                    selectedTime === time
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="p-4 space-y-4">
            <h2 className="font-bold mb-3">Uchrashuvni tasdiqlang</h2>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <User size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Shifokor</p>
                  <p className="font-bold">{doctor.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Sana</p>
                  <p className="font-bold">
                    {dates[selectedDate]?.toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Vaqt</p>
                  <p className="font-bold">{selectedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Xizmat</p>
                  <p className="font-bold">
                    {services.find((s) => s.id === selectedService)?.name}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Umumiy narx:</p>
                  <p className="text-primary font-bold text-lg">
                    {services.find((s) => s.id === selectedService)?.price} so'm
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-sm text-gray-600">
                  Men shartlar va qoidalarni qabul qilamn
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-sm text-gray-600">
                  Telegram orqali ogohlantirish jo'natish
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="fixed bottom-20 left-0 right-0 px-4 py-4 bg-white border-t flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold"
            >
              Orqaga
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canContinue()}
              className={`flex-1 py-3 rounded-lg font-bold ${
                canContinue()
                  ? 'bg-primary text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Davom ettir
            </button>
          ) : (
            <button
              onClick={() => navigate('/accepted')}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-bold"
            >
              Band qilishni tasdiqlash
            </button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
