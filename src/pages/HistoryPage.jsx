import { Clock, Calendar } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function HistoryPage() {
  const { appointments, doctors, currentUser } = useAppContext()

  const myAppointments = appointments.filter(a =>
    a.patient === currentUser?.name && a.phone === currentUser?.phone
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        <div className="bg-white p-4 border-b">
          <h1 className="text-2xl font-bold">Mening qabullarim</h1>
          <p className="text-gray-600 text-sm">Barcha uchrashuvlaringiz tarixi</p>
        </div>

        <div className="p-4 space-y-3">
          {myAppointments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
              <p>Hali hech qanday qabul yo'q</p>
            </div>
          ) : (
            [...myAppointments].reverse().map((apt) => {
              const doctor = doctors.find(d => d.id === apt.doctorId)
              return (
                <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    {doctor?.image ? (
                      <img src={doctor.image} alt={apt.doctor} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${doctor?.avatarBg || 'bg-blue-500'}`}>
                        {doctor?.avatar || '?'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-gray-900">{apt.doctor}</p>
                          <p className="text-xs text-gray-500">{doctor?.specialization}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${apt.statusColor || 'bg-gray-100 text-gray-700'}`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{apt.clinic}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
