import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as api from '../api';

const AppContext = createContext();

const defaultSettings = {
  clinicName: 'DentTish Klinika', email: 'admin@denttish.uz', phone: '+998 71 200 00 00',
  address: 'Tashkent, Yunusobod tumani', workingHoursStart: '09:00', workingHoursEnd: '18:00',
  notificationsEmail: true, notificationsSms: true, notificationsPush: true, twoFactorAuth: false,
};

const CLINIC_NAME = 'DentTish Klinika';

const seedDoctors = [
  { id: 1, name: 'Dr. Rustam Karimov', phone: '+998 90 123 45 67', specialization: 'Ortodont', subspecialty: 'Bolalar ortodontiyasi', clinic: CLINIC_NAME, experience: '12 yil', patients: '3.5k+', status: 'FAOL', workingHours: '09:00 - 17:00', workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'], avatar: 'RK', avatarBg: 'bg-blue-500', verified: true, rating: 4.9, reviews: 120, distance: 2.5, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rustam' },
  { id: 2, name: 'Dr. Nilufar Azimova', phone: '+998 93 987 65 43', specialization: 'Terapevt', subspecialty: 'Estetik stomatologiya', clinic: CLINIC_NAME, experience: '8 yil', patients: '2.1k+', status: 'FAOL', workingHours: '10:00 - 18:00', workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Juma', 'Shanba'], avatar: 'NA', avatarBg: 'bg-green-500', verified: true, rating: 4.8, reviews: 95, distance: 1.2, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nilufar' },
  { id: 3, name: 'Dr. Jahongir Sobirov', phone: '+998 97 111 22 33', specialization: 'Implantolog', subspecialty: 'Implant va protez', clinic: CLINIC_NAME, experience: '15 yil', patients: '4.2k+', status: 'FAOL', workingHours: '09:00 - 16:00', workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba'], avatar: 'JS', avatarBg: 'bg-red-500', verified: true, rating: 4.7, reviews: 78, distance: 3.1, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jahongir' },
];

function loadLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(`denttish_${key}`);
    if (saved) return JSON.parse(saved);
    return fallback;
  } catch { return fallback; }
}

function saveLocal(key, data) {
  try { localStorage.setItem(`denttish_${key}`, JSON.stringify(data)); } catch {}
}

export function AppProvider({ children }) {
  const [doctors, setDoctors] = useState(() => loadLocal('doctors', seedDoctors));
  const [appointments, setAppointments] = useState(() => loadLocal('appointments', []));
  const [clinicSettings, setClinicSettings] = useState(() => loadLocal('settings', defaultSettings));
  const [extraCategories, setExtraCategories] = useState(() => loadLocal('extraCategories', []));
  const [currentUser, setCurrentUser] = useState(() => loadLocal('currentUser', null));
  const [allUsers, setAllUsers] = useState(() => loadLocal('allUsers', []));
  const [adminNotifications, setAdminNotifications] = useState(() => loadLocal('adminNotifications', []));
  const [lastBookingMap, setLastBookingMap] = useState(() => loadLocal('lastBooking', {}));
  const [userNotifications, setUserNotifications] = useState([]);

  const loadUserNotifications = useCallback((phone) => {
    const all = loadLocal(`userNotifications_${phone}`, []);
    const cutoff = Date.now() - 86400000;
    const fresh = all.filter(n => new Date(n.time).getTime() > cutoff);
    setUserNotifications(fresh.slice(0, 20));
  }, []);

  const getLastBooking = useCallback(() => {
    if (!currentUser?.phone) return null;
    return lastBookingMap[currentUser.phone] || null;
  }, [lastBookingMap, currentUser?.phone]);

  const setLastBookingForUser = useCallback((booking) => {
    if (!currentUser?.phone) return;
    setLastBookingMap(prev => {
      const updated = { ...prev, [currentUser.phone]: booking };
      saveLocal('lastBooking', updated);
      return updated;
    });
  }, [currentUser?.phone]);

  useEffect(() => {
    api.apiGetDoctors().then(data => { if (data) { setDoctors(data); saveLocal('doctors', data); } }).catch(() => {});
    api.apiGetAppointments().then(data => { if (data) { setAppointments(data); saveLocal('appointments', data); } }).catch(() => {});
    api.apiGetUsers().then(data => { if (data) { setAllUsers(data); saveLocal('allUsers', data); } }).catch(() => {});
    api.apiGetSettings().then(data => { if (data) { setClinicSettings(data); saveLocal('settings', data); } }).catch(() => {});
    api.apiGetNotifications('admin').then(data => { if (data) { setAdminNotifications(data); saveLocal('adminNotifications', data); } }).catch(() => {});
  }, []);

  useEffect(() => { saveLocal('doctors', doctors); }, [doctors]);
  useEffect(() => { saveLocal('appointments', appointments); }, [appointments]);
  useEffect(() => { saveLocal('settings', clinicSettings); }, [clinicSettings]);
  useEffect(() => { saveLocal('extraCategories', extraCategories); }, [extraCategories]);
  useEffect(() => { saveLocal('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { saveLocal('allUsers', allUsers); }, [allUsers]);
  useEffect(() => { saveLocal('adminNotifications', adminNotifications); }, [adminNotifications]);
  useEffect(() => {
    if (currentUser?.phone) saveLocal(`userNotifications_${currentUser.phone}`, userNotifications);
  }, [userNotifications, currentUser?.phone]);

  useEffect(() => {
    if (currentUser?.phone) {
      loadUserNotifications(currentUser.phone);
      api.apiGetNotifications(currentUser.phone).then(data => {
        if (data) { setUserNotifications(data); saveLocal(`userNotifications_${currentUser.phone}`, data); }
      }).catch(() => {});
    } else {
      setUserNotifications([]);
    }
  }, [currentUser?.phone, loadUserNotifications]);

  const addAdminNotification = useCallback((message, type = 'info') => {
    const notif = { id: Date.now(), message, type, time: new Date().toISOString(), read: false };
    setAdminNotifications(prev => [notif, ...prev].slice(0, 50));
  }, []);

  const clearAdminNotification = useCallback((id) => {
    setAdminNotifications(prev => prev.filter(n => n.id !== id));
    api.apiMarkRead(id).catch(() => {});
  }, []);

  const markAllAdminRead = useCallback(() => {
    setAdminNotifications(prev => prev.map(n => ({ ...n, read: true })));
    api.apiMarkAllRead().catch(() => {});
  }, []);

  const addUserNotification = useCallback((message, type = 'info') => {
    const notif = { id: Date.now(), message, type, time: new Date().toISOString(), read: false };
    setUserNotifications(prev => [notif, ...prev].slice(0, 50));
  }, []);

  const clearUserNotification = useCallback((id) => {
    setUserNotifications(prev => prev.filter(n => n.id !== id));
    api.apiMarkRead(id).catch(() => {});
  }, []);

  const markUserNotificationRead = useCallback((id) => {
    setUserNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    api.apiMarkRead(id).catch(() => {});
  }, []);

  const markAllUserNotificationsRead = useCallback(() => {
    setUserNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearAllUserNotifications = useCallback(() => {
    setUserNotifications([]);
    if (currentUser?.phone) saveLocal(`userNotifications_${currentUser.phone}`, []);
  }, [currentUser?.phone]);

  const registerUser = useCallback(async (name, phone) => {
    const user = { name, phone, registeredAt: new Date().toISOString() };
    setCurrentUser(user);
    setAllUsers(prev => {
      if (prev.some(u => u.phone === phone)) return prev;
      return [...prev, user];
    });
    addUserNotification(`Xush kelibsiz, ${name}! DentTish ilovasiga muvaffaqiyatli ro'yxatdan o'tdingiz.`, 'welcome');
    try {
      const result = await api.apiRegister(name, phone);
      if (result?.user) {
        setCurrentUser(result.user);
        setAllUsers(prev => {
          if (prev.some(u => u.phone === phone)) return prev;
          return [...prev, result.user];
        });
      }
    } catch {}
  }, [addUserNotification]);

  const updateCurrentUser = useCallback((name, phone) => {
    const oldPhone = currentUser?.phone;
    setCurrentUser(prev => ({ ...prev, name, phone }));
    setAllUsers(prev => prev.map(u => u.phone === oldPhone ? { ...u, name, phone } : u));
  }, [currentUser]);

  const addDoctor = (doctor) => {
    const id = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').toUpperCase();
    const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500'];
    const newDoctor = {
      ...doctor, id, avatar: initials, avatarBg: bgColors[id % bgColors.length],
      rating: parseFloat((4 + Math.random()).toFixed(1)), reviews: Math.floor(Math.random() * 200) + 20,
      patients: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}k+`, verified: true,
      subspecialty: doctor.subspecialty || '', phone: doctor.phone || '',
      workingDays: doctor.workingDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
      workingHours: doctor.workingHours || '09:00 - 18:00',
    };
    setDoctors([...doctors, newDoctor]);
    addAdminNotification(`Yangi shifokor qo'shildi: ${newDoctor.name}`, 'doctor_add');
    api.apiAddDoctor(newDoctor).then(data => { if (data) setDoctors(prev => prev.map(d => d.id === data.id ? data : d)); }).catch(() => {});
  };

  const updateDoctor = (id, updatedData) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, ...updatedData } : d));
    api.apiUpdateDoctor(id, updatedData).catch(() => {});
  };

  const deleteDoctor = (id) => {
    const doc = doctors.find(d => d.id === id);
    if (doc) addAdminNotification(`Shifokor ishdan olindi: ${doc.name}`, 'doctor_remove');
    setDoctors(doctors.filter(d => d.id !== id));
    api.apiDeleteDoctor(id).catch(() => {});
  };

  const addAppointment = (appointment) => {
    const id = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    const statusColors = { 'Tasdiqlangan': 'bg-green-100 text-green-800', 'Kutilmoqda': 'bg-yellow-100 text-yellow-800', 'Yakunlandi': 'bg-blue-100 text-blue-800', 'Bekor qilindi': 'bg-red-100 text-red-800' };
    const newAppointment = { ...appointment, id, initials: appointment.patient.split(' ').map(n => n[0]).join('').toUpperCase(), phone: appointment.phone || '', statusColor: statusColors[appointment.status] || statusColors['Kutilmoqda'] };
    setAppointments([...appointments, newAppointment]);
    setLastBookingForUser(newAppointment);
    addUserNotification(`Siz ${appointment.doctor} qabuliga yozildingiz (${appointment.date}, ${appointment.time})`, 'booking');
    addAdminNotification(`${appointment.patient} → ${appointment.doctor} (${appointment.date}, ${appointment.time})`, 'booking');
    api.apiAddAppointment(newAppointment).then(data => { if (data) setAppointments(prev => prev.map(a => a.id === data.id ? data : a)); }).catch(() => {});
  };

  const updateAppointment = (id, updatedData) => {
    const statusColors = { 'Tasdiqlangan': 'bg-green-100 text-green-800', 'Kutilmoqda': 'bg-yellow-100 text-yellow-800', 'Yakunlandi': 'bg-blue-100 text-blue-800', 'Bekor qilindi': 'bg-red-100 text-red-800' };
    setAppointments(appointments.map(a => {
      if (a.id === id) {
        const updated = { ...a, ...updatedData };
        updated.statusColor = statusColors[updated.status] || statusColors['Kutilmoqda'];
        return updated;
      }
      return a;
    }));
    api.apiUpdateAppointment(id, updatedData).catch(() => {});
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
    api.apiDeleteAppointment(id).catch(() => {});
  };

  const updateClinicSettings = (settings) => {
    const updated = { ...clinicSettings, ...settings };
    setClinicSettings(updated);
    api.apiUpdateSettings(updated).catch(() => {});
  };

  const categories = [...new Set([
    ...doctors.filter(d => d.status === 'FAOL').map(d => d.specialization),
    ...extraCategories,
  ])].filter(Boolean).sort();

  const doAddCategory = (name) => {
    if (name && !categories.includes(name)) {
      setExtraCategories([...extraCategories, name]);
      api.apiAddCategory(name).catch(() => {});
    }
  };

  const doRemoveCategory = (name) => {
    const hasDoctor = doctors.some(d => d.specialization === name);
    if (!hasDoctor) {
      setExtraCategories(extraCategories.filter(c => c !== name));
      api.apiDeleteCategory(name).catch(() => {});
    }
  };

  const getStatistics = () => ({
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter(d => d.status === 'FAOL').length,
    inactiveDoctors: doctors.filter(d => d.status === 'NOFAOL').length,
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(a => a.status === 'Tasdiqlangan').length,
  });

  const value = {
    doctors, setDoctors, addDoctor, updateDoctor, deleteDoctor,
    appointments, setAppointments, addAppointment, updateAppointment, deleteAppointment,
    clinicSettings, updateClinicSettings,
    lastBooking: getLastBooking(), setLastBooking: setLastBookingForUser,
    categories, addCategory: doAddCategory, removeCategory: doRemoveCategory,
    getStatistics,
    currentUser, setCurrentUser, registerUser, updateCurrentUser, allUsers,
    adminNotifications, addAdminNotification, clearAdminNotification, markAllAdminRead,
    userNotifications, addUserNotification, clearUserNotification, markUserNotificationRead,
    markAllUserNotificationsRead, clearAllUserNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
