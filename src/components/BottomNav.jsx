import { Home, Clock, Box, User, Bell } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around">
      <button
        onClick={() => navigate('/')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Home size={24} />
        <span className="text-xs">Bosh sahifa</span>
      </button>
      <button
        onClick={() => navigate('/history')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 ${isActive('/history') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Clock size={24} />
        <span className="text-xs">Tarix</span>
      </button>
      <button
        onClick={() => navigate('/ai')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 ${isActive('/ai') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Box size={24} />
        <span className="text-xs">AI Yordamchi</span>
      </button>
      <button
        onClick={() => navigate('/notifications')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 relative ${isActive('/notifications') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Bell size={24} />
        <span className="text-xs">Xabarlar</span>
        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <button
        onClick={() => navigate('/profile')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 ${isActive('/profile') ? 'text-primary' : 'text-gray-500'}`}
      >
        <User size={24} />
        <span className="text-xs">Profil</span>
      </button>
    </div>
  )
}
