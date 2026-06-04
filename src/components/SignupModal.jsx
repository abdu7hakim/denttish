import React from 'react';
import { User as UserIcon, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function SignupModal() {
  const { currentUser, registerUser } = useAppContext();
  const [open, setOpen] = useState(!currentUser);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      registerUser(name.trim(), phone.trim());
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <UserIcon size={24} className="text-primary" />
          </div>
          <button onClick={() => { if (currentUser) setOpen(false) }} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">DentTishga xush kelibsiz!</h2>
        <p className="text-sm text-gray-500 mb-5">Qabulga yozilish uchun ro'yxatdan o'ting</p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
        </form>
      </div>
    </div>
  );
}
