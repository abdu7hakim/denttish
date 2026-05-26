import { ArrowLeft, Settings, LogOut, Heart, Bell, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 text-center">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white"
          />
          <h1 className="text-2xl font-bold">Sarah Johnson</h1>
          <p className="text-blue-100">sarah.johnson@email.com</p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <div>
              <div className="font-bold">25</div>
              <div className="text-blue-100">Yosh</div>
            </div>
            <div>
              <div className="font-bold">+1 234 567 8900</div>
              <div className="text-blue-100">Telefon</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-xs text-gray-600">Qabul</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-gray-600">Doktorlar</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">2</div>
            <p className="text-xs text-gray-600">Klinikalar</p>
          </div>
        </div>

        {/* Menu */}
        <div className="px-4 py-4 space-y-2">
          <button className="w-full bg-white p-4 rounded-lg flex items-center gap-3 hover:bg-gray-50">
            <Heart className="text-primary" size={20} />
            <div className="text-left flex-1">
              <p className="font-bold text-sm">Sevimli Shifokorlar</p>
              <p className="text-xs text-gray-600">Saqlangan shifokorlar</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full bg-white p-4 rounded-lg flex items-center gap-3 hover:bg-gray-50">
            <Bell className="text-primary" size={20} />
            <div className="text-left flex-1">
              <p className="font-bold text-sm">Bildirishnomalar</p>
              <p className="text-xs text-gray-600">Qabul ogohlantirish</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full bg-white p-4 rounded-lg flex items-center gap-3 hover:bg-gray-50">
            <Lock className="text-primary" size={20} />
            <div className="text-left flex-1">
              <p className="font-bold text-sm">Xavfsizlik</p>
              <p className="text-xs text-gray-600">Parol va privatlik</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full bg-white p-4 rounded-lg flex items-center gap-3 hover:bg-gray-50">
            <Settings className="text-primary" size={20} />
            <div className="text-left flex-1">
              <p className="font-bold text-sm">Sozlamalar</p>
              <p className="text-xs text-gray-600">Ilovani sozlashtirish</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full bg-white p-4 rounded-lg flex items-center gap-3 hover:bg-red-50 text-red-600">
            <LogOut size={20} />
            <div className="text-left flex-1">
              <p className="font-bold text-sm">Chiqish</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* About */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-lg p-4 text-center text-xs text-gray-600">
            <p className="mb-2">DentTish v1.0.0</p>
            <p>© 2023-2024 DentTish. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
