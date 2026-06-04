import { useState } from 'react'
import { ArrowLeft, Trash2, Check, Calendar, Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

function timeAgo(time) {
  const diff = Date.now() - new Date(time).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Hozir'
  if (mins < 60) return `${mins} daqiqa oldin`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} soat oldin`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} kun oldin`
  return new Date(time).toLocaleDateString('uz-UZ')
}

const typeIcons = {
  welcome: User,
  booking: Calendar,
}

const typeColors = {
  welcome: 'text-green-600 bg-green-100',
  booking: 'text-blue-600 bg-blue-100',
}

const tabs = [
  { key: 'all', label: 'Hammasi' },
  { key: 'unread', label: "O'qilmagan" },
  { key: 'booking', label: 'Uchrashuvlar' },
]

export default function NotificationsPage() {
  const navigate = useNavigate()
  const { userNotifications, clearUserNotification, markUserNotificationRead, markAllUserNotificationsRead, clearAllUserNotifications } = useAppContext()
  const [activeTab, setActiveTab] = useState('all')

  const filtered = userNotifications.filter(n => {
    if (activeTab === 'unread') return !n.read
    if (activeTab === 'booking') return n.type === 'booking'
    return true
  })

  const unreadCount = userNotifications.filter(n => !n.read).length

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
            <h1 className="text-2xl font-bold flex-1">Bildirishnomalar</h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllUserNotificationsRead}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Hammasini o'qildi
              </button>
            )}
            {userNotifications.length > 0 && (
              <button onClick={clearAllUserNotifications} className="text-xs text-red-500 font-semibold hover:underline">
                Tozalash
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border-b sticky top-[60px] z-10">
          <div className="flex px-4">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.key === 'unread' && unreadCount > 0 && (
                  <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Bell size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400 text-lg">Bildirishnomalar yo'q</p>
            </div>
          ) : (
            filtered.map(notif => {
              const Icon = typeIcons[notif.type] || Bell
              const color = typeColors[notif.type] || 'text-gray-600 bg-gray-100'
              return (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 transition ${!notif.read ? 'bg-blue-50/50' : 'bg-white'}`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full ${color} flex-shrink-0 self-start`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'text-gray-800'}`}>
                          {notif.message}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{timeAgo(notif.time)}</p>

                      <div className="flex gap-2 mt-2">
                        {!notif.read && (
                          <button
                            onClick={() => markUserNotificationRead(notif.id)}
                            className="flex items-center gap-1 text-xs text-primary font-semibold px-2 py-1 rounded hover:bg-blue-50"
                          >
                            <Check size={14} />
                            O'qildi
                          </button>
                        )}
                        <button
                          onClick={() => clearUserNotification(notif.id)}
                          className="flex items-center gap-1 text-xs text-red-600 font-semibold px-2 py-1 rounded hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          O'chirish
                        </button>
                      </div>
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
