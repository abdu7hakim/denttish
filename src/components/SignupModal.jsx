import React, { useState } from 'react';
import { User as UserIcon, Phone, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ADMIN_URL = 'https://admin-denttish.vercel.app';

export default function SignupModal() {
  const { currentUser, registerUser, setCurrentUser, allUsers } = useAppContext();
  const [open, setOpen] = useState(!currentUser);
  const [authMode, setAuthMode] = useState('register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !phone.trim()) return;
    if (allUsers.some(u => u.phone === phone.trim())) {
      setError('Bu telefon raqam avval ro\'yxatdan o\'tgan. Log in qiling.');
      return;
    }
    registerUser(name.trim(), phone.trim());
    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !phone.trim()) return;
    const user = allUsers.find(u => u.name === name.trim() && u.phone === phone.trim());
    if (user) {
      setCurrentUser(user);
      setOpen(false);
    } else {
      setError('Foydalanuvchi topilmadi. Ro\'yxatdan o\'ting.');
    }
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
        {adminMode ? (
          /* Admin login */
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Admin panel</h2>
            <p className="text-sm text-gray-500 mb-5 text-center">Admin panelga kirish</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="text" value={adminUser} onChange={(e) => setAdminUser(e.target.value)}
                placeholder="Username" className="w-full bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 outline-none text-sm" required
              />
              <input
                type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)}
                placeholder="Parol" className="w-full bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 outline-none text-sm" required
              />
              {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                Admin panelga kirish
              </button>
              <button type="button" onClick={() => { setAdminMode(false); setAdminError('') }}
                className="w-full text-gray-500 text-sm py-2 hover:text-gray-700">
                ← Orqaga
              </button>
            </form>
          </>
        ) : (
          /* User auth */
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <UserIcon size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
              {authMode === 'register' ? 'DentTishga xush kelibsiz!' : 'Xush kelibsiz!'}
            </h2>
            <p className="text-sm text-gray-500 mb-5 text-center">
              {authMode === 'register' ? "Ro'yxatdan o'ting va qabulga yoziling" : 'Hisobingizga kiring'}
            </p>
            <form onSubmit={authMode === 'register' ? handleRegister : handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Ism familya</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                  <UserIcon size={18} className="text-gray-400" />
                  <input
                    type="text" placeholder="Azizbek Nazirov" value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm" required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Telefon raqam</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    type="tel" placeholder="+998 90 123 45 67" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm" required
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={!name.trim() || !phone.trim()}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-300"
              >
                {authMode === 'register' ? "Ro'yxatdan o'tish" : 'Kirish'}
              </button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <button
                type="button"
                onClick={() => { setAuthMode(authMode === 'register' ? 'login' : 'register'); setError('') }}
                className="text-sm text-primary hover:underline"
              >
                {authMode === 'register' ? "Already have account? Log in" : "Don't have account? Register"}
              </button>
              <br />
              <button
                type="button"
                onClick={() => setAdminMode(true)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto mt-1"
              >
                <Shield size={14} /> Men adminman
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
