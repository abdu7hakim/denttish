import { useState, useRef, useEffect } from 'react'
import { Bell, X, User } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import SignupModal from './SignupModal'
import logoImg from '../../images/logo.png'

export default function Header() {
  const { currentUser, userNotifications, clearUserNotification, clearAllUserNotifications } = useAppContext()
  const [notifOpen, setNotifOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setNotifOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const unreadCount = userNotifications.filter(n => !n.read).length

  return (
    <>
      <SignupModal />
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center px-4 py-3">
          <img src={logoImg} alt="DentTish" className="h-8 w-auto" />

          <div className="relative" ref={ref}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-xl">
                  <span className="font-bold text-gray-800">Bildirishnomalar</span>
                  {userNotifications.length > 0 && (
                    <button onClick={clearAllUserNotifications} className="text-xs text-red-500 hover:underline">Tozalash</button>
                  )}
                </div>
                {userNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">Bildirishnoma yo'q</div>
                ) : (
                  userNotifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-gray-100 flex gap-3 items-start ${!n.read ? 'bg-blue-50' : ''}`}>
                      <div className={`p-1.5 rounded-full flex-shrink-0 ${n.type === 'welcome' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {n.type === 'welcome' ? <User size={14} /> : <Bell size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(n.time).toLocaleString('uz-UZ')}</p>
                      </div>
                      <button onClick={() => clearUserNotification(n.id)} className="text-gray-300 hover:text-gray-600 flex-shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
