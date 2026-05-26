import { ArrowLeft, MapPin, Phone, Clock, Star, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function ClinicsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const clinics = [
    {
      id: 1,
      name: 'Lumina Dental Hub',
      rating: 4.8,
      reviews: 245,
      distance: 1.2,
      address: 'Amir Temur ko\'chasi 45-uy, Tashkent',
      phone: '+998 71 123 45 67',
      hours: '09:00 - 21:00',
      services: ['UMUMIY', 'RENTGEN', 'IMPLANT'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic1',
    },
    {
      id: 2,
      name: 'DentTish Premium Clinic',
      rating: 4.9,
      reviews: 312,
      distance: 2.5,
      address: 'Navoi ko\'chasi 12-uy, Tashkent',
      phone: '+998 71 234 56 78',
      hours: '08:00 - 22:00',
      services: ['UMUMIY', 'ORTODONTIYA', 'KOSMETIK'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic2',
    },
    {
      id: 3,
      name: 'SmileCare Dental Studio',
      rating: 4.7,
      reviews: 189,
      distance: 3.1,
      address: 'Buyuk Ipak yo\'li 56-uy, Tashkent',
      phone: '+998 71 345 67 89',
      hours: '10:00 - 20:00',
      services: ['UMUMIY', 'PROTEZ', 'ENDODONTIYA'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic3',
    },
    {
      id: 4,
      name: 'Bright Smile Clinic',
      rating: 4.6,
      reviews: 156,
      distance: 4.2,
      address: 'Mirabad tumani, Qo\'qon ko\'chasi 89-uy',
      phone: '+998 71 456 78 90',
      hours: '09:00 - 19:00',
      services: ['UMUMIY', 'RENTGEN'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic4',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Header */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold flex-1">Klinikalar</h1>
          </div>
          <p className="text-gray-600 text-sm">{clinics.length} ta klinika topildi</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 border-b flex gap-2 overflow-x-auto">
          {['Hammasi', 'Yaqin', 'Reytingga', 'Yangi'].map((label, idx) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                filter === label
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Clinics List */}
        <div className="p-4 space-y-3">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img
                src={clinic.image}
                alt={clinic.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{clinic.name}</h3>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-sm">{clinic.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-3">({clinic.reviews} ta sharhlar)</p>

                <div className="space-y-2 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span>{clinic.distance} km • {clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span>{clinic.hours}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-3">
                  {clinic.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs bg-blue-100 text-primary px-2 py-1 rounded font-semibold"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <button onClick={() => navigate('/booking/1')} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                  BAND QILISH →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
