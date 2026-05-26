import { ArrowLeft, Sun, Bell, Lock, Globe, HelpCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function SettingsPage() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    language: 'uz',
    saveData: false,
  })

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Header */}
        <div className="bg-white p-4 border-b sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-primary">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Sozlamalar</h1>
          </div>
        </div>

        {/* Account Section */}
        <div className="mt-4">
          <h2 className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">
            Hisob
          </h2>
          <div className="bg-white space-y-1">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left">
              <span className="text-sm">Profil ma'lumotlari</span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left border-t">
              <span className="text-sm">Email manzilim</span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left border-t">
              <span className="text-sm">Telefon raqamim</span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mt-4">
          <h2 className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">
            Bildirishnomalar
          </h2>
          <div className="bg-white space-y-1">
            <div className="px-4 py-3 flex items-center justify-between border-b hover:bg-gray-50">
              <div className="flex items-center gap-3 flex-1">
                <Bell size={20} className="text-primary" />
                <span className="text-sm">Push bildirishnomalar</span>
              </div>
              <button
                onClick={() => toggleSetting('notifications')}
                className={`relative w-10 h-6 rounded-full transition ${
                  settings.notifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.notifications ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <span className="text-sm">Email bildirishnomalar</span>
              <button
                onClick={() => toggleSetting('emailNotifications')}
                className={`relative w-10 h-6 rounded-full transition ${
                  settings.emailNotifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.emailNotifications ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="mt-4">
          <h2 className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">
            Ko'rinish
          </h2>
          <div className="bg-white space-y-1">
            <div className="px-4 py-3 flex items-center justify-between border-b hover:bg-gray-50">
              <div className="flex items-center gap-3 flex-1">
                <Sun size={20} className="text-primary" />
                <span className="text-sm">Qorong'i rejim</span>
              </div>
              <button
                onClick={() => toggleSetting('darkMode')}
                className={`relative w-10 h-6 rounded-full transition ${
                  settings.darkMode ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.darkMode ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left border-t">
              <div className="flex items-center gap-3 flex-1">
                <Globe size={20} className="text-primary" />
                <div className="text-left">
                  <p className="text-sm">Til</p>
                  <p className="text-xs text-gray-600">O'zbekcha</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mt-4">
          <h2 className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">
            Xavfsizlik va Privatlik
          </h2>
          <div className="bg-white space-y-1">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left border-b">
              <div className="flex items-center gap-3 flex-1">
                <Lock size={20} className="text-primary" />
                <span className="text-sm">Parol o'zgartirish</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <span className="text-sm">Shaxsy ma'lumotlarni saqlash</span>
              <button
                onClick={() => toggleSetting('saveData')}
                className={`relative w-10 h-6 rounded-full transition ${
                  settings.saveData ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.saveData ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-4">
          <h2 className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">
            Yordam
          </h2>
          <div className="bg-white space-y-1">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left border-b">
              <div className="flex items-center gap-3 flex-1">
                <HelpCircle size={20} className="text-primary" />
                <span className="text-sm">Ko'mak markazi</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left">
              <span className="text-sm">Muammo haqida xabar berish</span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-4 mx-4">
          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-600">
            <LogOut size={20} />
            Chiqish
          </button>
        </div>

        {/* Version */}
        <div className="text-center mt-6 mb-4">
          <p className="text-xs text-gray-600">DentTish v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2023-2024 DentTish</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
