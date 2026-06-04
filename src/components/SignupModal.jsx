import React, { useState } from 'react';
import { User as UserIcon, Phone, X, LogIn, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ADMIN_URL = 'https://admin-denttish.vercel.app';

export default function SignupModal() {
  const { currentUser, registerUser } = useAppContext();
  const [open, setOpen] = useState(!currentUser);
  const [mode, setMode] = useState(currentUser ? 'login' : 'register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      registerUser(name.trim(), phone.trim());
      setOpen(false);
    }
  };

  const handleLogin = () => {
    setOpen(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminError('');
    if (adminUser === 'admin' && adminPass === 'admin3379') {
      setOpen(false);
      window.open(ADMIN_URL, '_blank');
    } else {
      setAdminError('Username yoki parol noto\'g\'ri');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            {adminMode ? <Shield size={24} className="text-primary" /> : <UserIcon size={24} className="text-primary" />}
          </div>
          <button
            onClick={() => { if (currentUser || mode === 'login') setOpen(false) }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {adminMode ? (
          /* Admin login */
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Admin panel</h2>
            <p className="text-sm text-gray-500 mb-5">Admin panelga kirish uchun ma'lumotlaringizni kiriting</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Username</label>
                <input
                  type="text"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Parol</label>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 outline-none text-sm"
                  required
                />
              </div>
              {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Admin panelga kirish
              </button>
              <button
                type="button"
                onClick={() => { setAdminMode(false); setAdminError('') }}
                className="w-full text-gray-500 text-sm py-2 hover:text-gray-700"
              >
                ← Orqaga
              </button>
            </form>
          </>
        ) : mode === 'register' ? (
          /* Registration */
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">DentTishga xush kelibsiz!</h2>
            <p className="text-sm text-gray-500 mb-5">Qabulga yozilish uchun ro'yxatdan o'ting</p>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Ism familya</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                  <UserIcon size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Azizbek Nazirov"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Telefon raqam</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!name.trim() || !phone.trim()}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-300"
              >
                Ro'yxatdan o'tish
              </button>
              <button
                type="button"
                onClick={() => setAdminMode(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 py-2 hover:text-gray-700"
              >
                <Shield size={16} /> Men adminman
              </button>
            </form>
          </>
        ) : (
          /* Login (returning user) */
          <>
            <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl bg-blue-500">
              {currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Xush kelibsiz, {currentUser?.name?.split(' ')[0] || 'mehmon'}!</h2>
            <p className="text-sm text-gray-500 mb-5 text-center">{currentUser?.phone}</p>
            <div className="space-y-3">
              <button
                onClick={handleLogin}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <LogIn size={18} /> Davom etish
              </button>
              <button
                type="button"
                onClick={() => setAdminMode(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 py-2 hover:text-gray-700"
              >
                <Shield size={16} /> Men adminman
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
