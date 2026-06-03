import { ArrowLeft, Star, Clock, Search, ChevronRight } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function DoctorsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { doctors, categories } = useAppContext()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null)

  const activeDoctors = doctors.filter(d => d.status === 'FAOL')

  const searched = activeDoctors.filter(d =>
    !search ||
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  )

  const filtered = selectedCategory
    ? searched.filter(d => d.specialization === selectedCategory)
    : searched

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold flex-1">Shifokorlar</h1>
          </div>
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2.5">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 ml-2 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-b sticky top-[72px] z-10">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                !selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Barchasi
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-sm text-gray-500">
            {filtered.length} ta shifokor
            {selectedCategory && ` • ${selectedCategory}`}
          </p>
        </div>

        {/* List */}
        <div className="px-4 mt-1 space-y-3">
          {filtered.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="bg-white rounded-xl p-4 flex gap-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-gray-900 truncate">{doctor.name}</h3>
                  {doctor.verified && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Tasdiqlangan</span>}
                </div>
                <p className="text-sm text-blue-600 font-medium mb-1">{doctor.specialization}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {doctor.rating} ({doctor.reviews})
                  </span>
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1.5">
                  <Clock size={12} />
                  <span>{doctor.workingDays?.[0]}–{doctor.workingDays?.slice(-1)[0]}: {doctor.workingHours}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 self-center" />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-500">Shifokor topilmadi</div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
