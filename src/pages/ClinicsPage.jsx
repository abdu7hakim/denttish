import { ArrowLeft, MapPin, Phone, Clock, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function ClinicsPage() {
  const navigate = useNavigate()
  const { clinics, clinicSettings } = useAppContext()
  const mainClinic = clinics[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b">
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Klinika haqida</h1>
          </div>
        </div>

        {/* Main clinic information */}
        {mainClinic && (
          <div className="m-4 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src={mainClinic.image} alt={mainClinic.name} className="w-full h-44 object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{mainClinic.name}</h2>
              <div className="flex items-center gap-1 mb-4">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-800">{mainClinic.rating}</span>
                <span className="text-gray-500 text-sm">({mainClinic.reviews} ta sharh)</span>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5" />
                  <span>{mainClinic.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5" />
                  <span>{mainClinic.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary mt-0.5" />
                  <span>{mainClinic.hours}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {mainClinic.services.map(s => (
                  <span key={s} className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full font-semibold">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Branches */}
        {clinics.length > 1 && (
          <div className="px-4">
            <h3 className="font-bold text-gray-900 mb-3">Filiallar</h3>
            <div className="space-y-3">
              {clinics.slice(1).map(c => (
                <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{c.name}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{c.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-center gap-1.5"><MapPin size={14} /> {c.address}</p>
                    <p className="flex items-center gap-1.5"><Phone size={14} /> {c.phone}</p>
                    <p className="flex items-center gap-1.5"><Clock size={14} /> {c.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
