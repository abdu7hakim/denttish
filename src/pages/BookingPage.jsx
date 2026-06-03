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
  const { doctors, appointments, addAppointment } = useAppContext()
  const doctor = doctors.find(d => d.id === parseInt(doctorId))

  const [step, setStep] = useState(1)
  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
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
    if (!patientName.trim() || !patientPhone.trim() || !selectedDate || !selectedSlot) return

    addAppointment({
      patient: patientName.trim(),
      phone: patientPhone.trim(),
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
              {step === 1 && 'Ma\'lumotlaringiz'}
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
        </div>

        <div className="p-4">
          {/* Step 1: Patient Info */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Qabulga yozilish uchun ma'lumotlaringizni kiriting</p>
              <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Ism familya</label>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                    <User size={18} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Masalan: Azizbek Nazirov"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Telefon raqam</label>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                    <Phone size={18} className="text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Masalan: +998 90 123 45 67"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!patientName.trim() || !patientPhone.trim()}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Davom etish
              </button>
            </div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Qaysi kunga yozilmoqchisiz?</p>
              {dates.map((d, i) => {
                const working = isWorkingDay(d)
                return (
                  <button
                    key={i}
                    onClick={() => { if (working) { setSelectedDate(d); setStep(3) } }}
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

          {/* Step 3: Time */}
          {step === 3 && (
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
                        onClick={() => { if (!booked) { setSelectedSlot(t); setStep(4) } }}
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

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Bemor</p><p className="font-bold text-gray-900">{patientName}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-primary" />
                  <div><p className="text-xs text-gray-500">Telefon</p><p className="font-bold text-gray-900">{patientPhone}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <User size={20} className="text-primary" />
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

              <button
                onClick={() => setStep(1)}
                className="w-full text-gray-500 py-2 text-sm hover:text-gray-700"
              >
                Ma'lumotlarni o'zgartirish
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
