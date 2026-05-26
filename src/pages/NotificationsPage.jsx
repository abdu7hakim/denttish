import { ArrowLeft, Trash2, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Band qilish rasmiylashtirildi',
      desc: 'Dr. Sarah Jenkins bilan 24-oktabr 10:00 da uchrashuv rasmiylashtirindi',
      time: '2 soat oldin',
      read: false,
      icon: '📅',
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Uchrashuvga eslatma',
      desc: 'Ertaga Dr. Marcus Vance bilan uchrashuv mavjud. Vaqt: 15:30',
      time: '1 kun oldin',
      read: false,
      icon: '🔔',
    },
    {
      id: 3,
      type: 'promo',
      title: 'Maxsus taklif!',
      desc: 'Bu hafta tish tozalashga 20% chegirma. Foydalaning!',
      time: '3 kun oldin',
      read: true,
      icon: '🎉',
    },
    {
      id: 4,
      type: 'result',
      title: 'Rentgen natijalaringiz tayyor',
      desc: 'Sizning panoramik rentgen natijalaringiz tahlil qilingan va tayyor',
      time: '1 hafta oldin',
      read: true,
      icon: '📸',
    },
    {
      id: 5,
      type: 'message',
      title: 'Shifokor soramasiga javob',
      desc: 'Dr. Elena Rostova: "Siz hozir dori qabul qilyapsizmi?"',
      time: '1 hafta oldin',
      read: true,
      icon: '💬',
    },
    {
      id: 6,
      type: 'appointment',
      title: 'Band qilish bekor qilindi',
      desc: 'Sizning 15-oktabr dagi Dr. Ahmed Hassan bilan uchrashuv bekor qilingan',
      time: '2 hafta oldin',
      read: true,
      icon: '❌',
    },
  ])

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border-b sticky top-16 z-10">
          <div className="flex overflow-x-auto px-4">
            {['Hammasi', 'O\'qilmagan', 'Uchrashuvlar', 'Xabarlar'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-3 text-sm font-semibold border-b-2 border-transparent hover:border-primary text-gray-600 whitespace-nowrap"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 text-lg">
                Bildirishnomalar yo'q
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-gray-100 transition ${
                  !notif.read ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="flex gap-3">
                  <div className="text-2xl flex-shrink-0">{notif.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold text-sm ${!notif.read ? 'text-primary' : ''}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {notif.desc}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">{notif.time}</p>

                    <div className="flex gap-2">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="flex items-center gap-1 text-xs text-primary font-semibold hover:bg-white px-2 py-1 rounded"
                        >
                          <Check size={14} />
                          O'qildi deb belgilash
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:bg-white px-2 py-1 rounded"
                      >
                        <Trash2 size={14} />
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
