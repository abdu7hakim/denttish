import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Save, X, LogOut, Calendar } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { currentUser, updateCurrentUser, appointments, logoutUser } = useAppContext()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(currentUser?.name || '')
  const [phone, setPhone] = useState(currentUser?.phone || '')

  const userApps = appointments.filter(a =>
    a.patient === currentUser?.name && a.phone === currentUser?.phone
  )
  const initials = currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500']
  const avatarBg = colors[(currentUser?.name?.length || 0) % colors.length]

  const handleSave = () => {
    if (name.trim() && phone.trim()) {
      updateCurrentUser(name.trim(), phone.trim())
      setEditing(false)
    }
  }

  const handleCancel = () => {
    setName(currentUser?.name || '')
    setPhone(currentUser?.phone || '')
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white flex items-center justify-center text-white font-bold text-3xl ${avatarBg}`}>
            {initials}
          </div>
          {editing ? (
            <div className="space-y-2 max-w-xs mx-auto">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                <User size={16} className="text-white/70" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-sm"
                  placeholder="Ism familya"
                />
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                <Phone size={16} className="text-white/70" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-sm"
                  placeholder="Telefon raqam"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={handleSave} className="flex-1 bg-white text-primary py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1">
                  <Save size={16} /> Saqlash
                </button>
                <button onClick={handleCancel} className="flex-1 bg-white/20 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1">
                  <X size={16} /> Bekor
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{currentUser?.name || 'Ism kiritilmagan'}</h1>
              <p className="text-blue-100">{currentUser?.phone || 'Telefon kiritilmagan'}</p>
              <button
                onClick={() => { setName(currentUser?.name || ''); setPhone(currentUser?.phone || ''); setEditing(true) }}
                className="mt-3 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full hover:bg-white/30 transition"
              >
                Tahrirlash
              </button>
            </>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-primary">{userApps.length}</div>
            <p className="text-xs text-gray-600">Qabullar</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-primary">{currentUser ? 'Faol' : '—'}</div>
            <p className="text-xs text-gray-600">Holat</p>
          </div>
        </div>

        {/* Appointments list */}
        <div className="px-4">
          <h2 className="font-bold text-gray-900 mb-2">Mening qabullarim</h2>
          {userApps.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-400 text-sm shadow-sm">
              <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
              Hali qabulga yozilmagansiz
            </div>
          ) : (
            <div className="space-y-2">
              {userApps.slice().reverse().map(a => (
                <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{a.doctor}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{a.date} • {a.time}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.statusColor}`}>{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="px-4 mt-4">
          <button
            onClick={() => {
              logoutUser()
            }}
            className="w-full bg-white p-4 rounded-xl flex items-center gap-3 hover:bg-red-50 text-red-600 shadow-sm"
          >
            <LogOut size={20} />
            <div className="text-left flex-1">
              <p className="font-bold text-sm">Chiqish</p>
              <p className="text-xs text-gray-500">Profilni tozalash va qaytadan ro'yxatdan o'tish</p>
            </div>
          </button>
        </div>

        {/* About */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-lg p-4 text-center text-xs text-gray-600 shadow-sm">
            <p className="mb-2">DentTish v1.0.0</p>
            <p>© 2023-2024 DentTish. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
