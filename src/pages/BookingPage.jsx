import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, CheckCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

function formatDate(d) {
  const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

function parseWorkingHours(hours) {
  if (!hours) return { start: 9, end: 18 }
  const parts = hours.split('-').map(s => s.trim())
  if (parts.length < 2) return { start: 9, end: 18 }
  const start = parseInt(parts[0]) || 9
  const end = parseInt(parts[1]) || 18
  return { start, end }
}

function generateSlots(start, end) {
  const slots = []
  for (let h = start; h < end; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
}

export default function BookingPage() {
  const navigate = useNavigate()
  const { doctorId } = useParams()
  const { doctors, appointments, addAppointment, currentUser } = useAppContext()
  const doctor = doctors.find(d => d.id === parseInt(doctorId))

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const dates = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      return d
    }),
  [])

  const { start, end } = useMemo(() => doctor ? parseWorkingHours(doctor.workingHours) : { start: 9, end: 18 }, [doctor])

  const allSlots = useMemo(() => generateSlots(start, end), [start, end])

  const bookedSlots = useMemo(() => {
    if (!selectedDate || !doctor) return []
    const dateStr = formatDate(selectedDate)
    return appointments
      .filter(a => a.doctorId === doctor.id && a.date === dateStr && a.status !== 'Bekor qilindi')
      .map(a => a.time)
  }, [selectedDate, doctor, appointments])

  const availableSlots = useMemo(() =>
    allSlots.filter(s => !bookedSlots.some(b => b.startsWith(s))),
  [allSlots, bookedSlots])

  const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

  const isWorkingDay = (date) => {
    const dayUz = dayNames[date.getDay()]
    return doctor?.workingDays?.includes(dayUz)
  }

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot || !currentUser) return

    addAppointment({
      patient: currentUser.name,
      phone: currentUser.phone,
      doctor: doctor.name,
      doctorId: doctor.id,
      clinic: doctor.clinic,
      date: formatDate(selectedDate),
      time: selectedSlot,
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

  const steps = [
    { key: 1, label: 'Sana tanlash' },
    { key: 2, label: 'Vaqt tanlash' },
    { key: 3, label: 'Tasdiqlash' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        <div className="bg-white px-4 py-3 border-b sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold flex-1">{steps.find(s => s.key === step)?.label}</h1>
          </div>
          <div className="flex gap-1.5">
            {steps.map(s => (
              <div key={s.key} className={`flex-1 h-1.5 rounded-full ${s.key <= step ? 'bg-primary' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        {/* Doctor + User summary */}
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${doctor.avatarBg}`}>
              {doctor.avatar}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{doctor.name}</p>
            <p className="text-xs text-gray-500">{doctor.clinic} • {doctor.workingHours}</p>
          </div>
          {currentUser && (
            <div className="text-right text-xs text-gray-400">
              <p>{currentUser.name}</p>
              <p>{currentUser.phone}</p>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Step: Date */}
          {step === 1 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Qaysi kunga yozilmoqchisiz?</p>
              {dates.map((d, i) => {
                const working = isWorkingDay(d)
                return (
                  <button
                    key={i}
                    onClick={() => { if (working) { setSelectedDate(d); setStep(2) } }}
                    disabled={!working}
                    className={`w-full bg-white rounded-xl p-4 flex items-center justify-between border-2 transition text-left ${
                      !working ? 'border-gray-100 opacity-50 cursor-not-allowed' :
                      selectedDate === d ? 'border-primary bg-blue-50' : 'border-gray-100 hover:border-primary'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-gray-900">
                        {d.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                      <p className="text-xs text-gray-500">{d.toLocaleDateString('uz-UZ')}</p>
                    </div>
                    <span className={`text-sm font-medium ${working ? 'text-green-600' : 'text-red-500'}`}>
                      {working ? 'Mavjud' : 'Dam olish'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Step: Time */}
          {step === 2 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                {selectedDate?.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })} — bo'sh vaqtlar:
              </p>
              {availableSlots.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center text-yellow-700 text-sm">
                  Bu kunda bo'sh vaqtlar mavjud emas. Boshqa kunni tanlang.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {allSlots.map(t => {
                    const booked = bookedSlots.some(b => b.startsWith(t))
                    return (
                      <button
                        key={t}
                        onClick={() => { if (!booked) { setSelectedSlot(t); setStep(3) } }}
                        disabled={booked}
                        className={`py-3 rounded-xl font-semibold border-2 transition ${
                          selectedSlot === t ? 'border-primary bg-primary text-white' :
                          booked ? 'border-gray-100 bg-gray-100 text-gray-300 cursor-not-allowed line-through' :
                          'border-gray-200 bg-white text-gray-700 hover:border-primary'
                        }`}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step: Confirm */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Bemor</p><p className="font-bold text-gray-900">{currentUser?.name}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Telefon</p><p className="font-bold text-gray-900">{currentUser?.phone}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Shifokor</p><p className="font-bold text-gray-900">{doctor.name}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Sana</p><p className="font-bold text-gray-900">{selectedDate?.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Vaqt</p><p className="font-bold text-gray-900">{selectedSlot}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Joy</p><p className="font-bold text-gray-900">{doctor.clinic}</p></div>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle size={22} />
                Qabulni tasdiqlash
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
