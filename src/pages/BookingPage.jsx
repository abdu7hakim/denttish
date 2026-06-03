import { ArrowLeft, Calendar, Clock, MapPin, User, CheckCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function BookingPage() {
  const navigate = useNavigate()
  const { doctorId } = useParams()
  const { doctors, addAppointment } = useAppContext()
  const doctor = doctors.find(d => d.id === parseInt(doctorId))
  const [step, setStep] = useState(1)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const services = [
    { id: 1, name: 'Tish ko\'rigi', duration: '30 min', price: '50 000' },
    { id: 2, name: 'Tish tozalash', duration: '45 min', price: '150 000' },
    { id: 3, name: 'Plombalash', duration: '60 min', price: '300 000' },
    { id: 4, name: 'Tish oqartirish', duration: '90 min', price: '500 000' },
  ]

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })

  const handleConfirm = () => {
    const service = services.find(s => s.id === selectedTime)
    addAppointment({
      patient: 'Abdulloh',
      doctor: doctor.name,
      doctorId: doctor.id,
      clinic: doctor.clinic,
      date: dates[selectedDate]?.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' }),
      time: timeSlots[selectedTime],
      status: 'Kutilmoqda',
    })
    navigate('/accepted')
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Shifokor topilmadi</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {/* Steps indicator */}
        <div className="bg-white px-4 py-3 border-b sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold flex-1">
              {step === 1 && 'Xizmat tanlash'}
              {step === 2 && 'Sana tanlash'}
              {step === 3 && 'Vaqt tanlash'}
              {step === 4 && 'Tasdiqlash'}
            </h1>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        {/* Doctor summary */}
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
          <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{doctor.name}</p>
            <p className="text-xs text-gray-500">{doctor.clinic}</p>
          </div>
        </div>

        <div className="p-4">
          {/* Step 1: Service */}
          {step === 1 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Qaysi xizmat turiga yozilmoqchisiz?</p>
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedTime(s.id); setStep(2) }}
                  className="w-full bg-white rounded-xl p-4 flex items-center justify-between border-2 border-gray-100 hover:border-primary transition text-left"
                >
                  <div>
                    <p className="font-bold text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.duration}</p>
                  </div>
                  <span className="text-primary font-bold">{s.price} so'm</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Qaysi kunga yozilmoqchisiz?</p>
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedDate(i); setStep(3) }}
                  className={`w-full bg-white rounded-xl p-4 flex items-center justify-between border-2 transition text-left ${
                    selectedDate === i ? 'border-primary bg-blue-50' : 'border-gray-100'
                  }`}
                >
                  <div>
                    <p className="font-bold text-gray-900">
                      {d.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <p className="text-xs text-gray-500">{d.toLocaleDateString('uz-UZ')}</p>
                  </div>
                  <span className="text-green-600 text-sm font-medium">Mavjud</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Time */}
          {step === 3 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                {dates[selectedDate]?.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })} kuni uchun vaqt:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(t => (
                  <button
                    key={t}
                    onClick={() => { setSelectedTime(t); setStep(4) }}
                    className={`py-3 rounded-xl font-semibold border-2 transition ${
                      selectedTime === t ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Shifokor</p><p className="font-bold text-gray-900">{doctor.name}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Sana</p><p className="font-bold text-gray-900">{dates[selectedDate]?.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Vaqt</p><p className="font-bold text-gray-900">{selectedTime}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Joy</p><p className="font-bold text-gray-900">{doctor.clinic}</p></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-gray-100 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Shartlar va qoidalarni qabul qilaman</span>
                </label>
                <label className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-gray-100 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Telegram orqali eslatma yuborish</span>
                </label>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle size={22} />
                Tasdiqlash
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
