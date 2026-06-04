import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Phone, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import * as api from '../api';

function normalizePhone(raw) {
  return raw.replace(/\s/g, '');
}

function formatPhone(raw) {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits.startsWith('998')) return raw;
  const rest = digits.slice(3);
  let out = '+998';
  if (rest.length > 0) out += ' ' + rest.slice(0, 2);
  if (rest.length > 2) out += ' ' + rest.slice(2, 5);
  if (rest.length > 5) out += ' ' + rest.slice(5, 7);
  if (rest.length > 7) out += ' ' + rest.slice(7, 9);
  return out;
}

export default function SignupModal() {
  const navigate = useNavigate();
  const { currentUser, registerUser, setCurrentUser, allUsers } = useAppContext();
  const [open, setOpen] = useState(!currentUser);
  const [authMode, setAuthMode] = useState('register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const raw = normalizePhone(phone);
    if (!name.trim() || !raw) { setLoading(false); return; }
    if (allUsers.some(u => normalizePhone(u.phone) === raw)) {
      setError('Bu telefon raqam avval ro\'yxatdan o\'tgan. Log in qiling.');
      setLoading(false);
      return;
    }
    try {
      const result = await api.apiRegister(name.trim(), raw);
      if (result?.user) {
        setCurrentUser(result.user);
        setOpen(false);
      } else {
        registerUser(name.trim(), raw);
        setOpen(false);
      }
    } catch {
      registerUser(name.trim(), raw);
      setOpen(false);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const raw = normalizePhone(phone);
    if (!name.trim() || !raw) { setLoading(false); return; }
    try {
      const result = await api.apiLogin(name.trim(), raw);
      if (result?.user) {
        setCurrentUser(result.user);
        setOpen(false);
      } else {
        const user = allUsers.find(u => u.name === name.trim() && normalizePhone(u.phone) === raw);
        if (user) { setCurrentUser(user); setOpen(false); }
        else setError('Foydalanuvchi topilmadi. Ro\'yxatdan o\'ting.');
      }
    } catch {
      const user = allUsers.find(u => u.name === name.trim() && normalizePhone(u.phone) === raw);
      if (user) { setCurrentUser(user); setOpen(false); }
      else setError('Foydalanuvchi topilmadi. Ro\'yxatdan o\'ting.');
    }
    setLoading(false);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setLoading(true);
    try {
      const result = await api.apiAdminLogin(adminUser, adminPass);
      if (result?.token) {
        api.setAdminToken(result.token);
        setOpen(false);
        navigate('/admin/dashboard');
      } else {
        setAdminError('Username yoki parol noto\'g\'ri');
      }
    } catch {
      if (adminUser === 'admin' && adminPass === 'admin3379') {
        setOpen(false);
        navigate('/admin/dashboard');
      } else {
        setAdminError('Username yoki parol noto\'g\'ri');
      }
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        {adminMode ? (
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Admin panel</h2>
            <p className="text-sm text-gray-500 mb-5 text-center">Admin panelga kirish</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input type="text" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} placeholder="Username" className="w-full bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 outline-none text-sm" required />
              <input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="Parol" className="w-full bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 outline-none text-sm" required />
              {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
              <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-300">
                {loading ? 'Kirish...' : 'Admin panelga kirish'}
              </button>
              <button type="button" onClick={() => { setAdminMode(false); setAdminError('') }} className="w-full text-gray-500 text-sm py-2 hover:text-gray-700">← Orqaga</button>
            </form>
          </>
        ) : (
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
                  <input type="text" placeholder="Azizbek Nazirov" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Telefon raqam</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                  <Phone size={18} className="text-gray-400" />
                  <input type="tel" placeholder="+998 90 123 45 67" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} className="flex-1 bg-transparent outline-none text-sm" required />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={!name.trim() || !phone.trim() || loading} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-300">
                {loading ? 'Yuklanmoqda...' : authMode === 'register' ? "Ro'yxatdan o'tish" : 'Kirish'}
              </button>
            </form>
            <div className="mt-4 text-center space-y-2">
              <button type="button" onClick={() => { setAuthMode(authMode === 'register' ? 'login' : 'register'); setError('') }} className="text-sm text-primary hover:underline">
                {authMode === 'register' ? "Already have account? Log in" : "Don't have account? Register"}
              </button>
              <br />
              <button type="button" onClick={() => setAdminMode(true)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto mt-1">
                <Shield size={14} /> Men adminman
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
