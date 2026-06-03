import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

const defaultSettings = {
  clinicName: 'DentTish Klinika',
  email: 'admin@denttish.uz',
  phone: '+998 71 200 00 00',
  address: 'Tashkent, Yunusobod tumani',
  workingHoursStart: '09:00',
  workingHoursEnd: '18:00',
  notificationsEmail: true,
  notificationsSms: true,
  notificationsPush: true,
  twoFactorAuth: false,
};

const defaultClinics = [
  {
    id: 1,
    name: 'Lumina Dental Hub',
    address: 'Amir Temur ko\'chasi 45-uy, Tashkent',
    phone: '+998 71 123 45 67',
    hours: '09:00 - 21:00',
    services: ['UMUMIY', 'RENTGEN', 'IMPLANT'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic1',
    doctors: 0,
    status: 'FAOL',
    rating: 4.8,
    reviews: 245,
    distance: 1.2,
  },
  {
    id: 2,
    name: 'DentTish Premium Clinic',
    address: 'Navoi ko\'chasi 12-uy, Tashkent',
    phone: '+998 71 234 56 78',
    hours: '08:00 - 22:00',
    services: ['UMUMIY', 'ORTODONTIYA', 'KOSMETIK'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic2',
    doctors: 0,
    status: 'FAOL',
    rating: 4.9,
    reviews: 312,
    distance: 2.5,
  },
  {
    id: 3,
    name: 'SmileCare Dental Studio',
    address: 'Buyuk Ipak yo\'li 56-uy, Tashkent',
    phone: '+998 71 345 67 89',
    hours: '10:00 - 20:00',
    services: ['UMUMIY', 'PROTEZ', 'ENDODONTIYA'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic3',
    doctors: 0,
    status: 'FAOL',
    rating: 4.7,
    reviews: 189,
    distance: 3.1,
  },
  {
    id: 4,
    name: 'Bright Smile Clinic',
    address: 'Mirabad tumani, Qo\'qon ko\'chasi 89-uy, Tashkent',
    phone: '+998 71 456 78 90',
    hours: '09:00 - 19:00',
    services: ['UMUMIY', 'RENTGEN'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic4',
    doctors: 0,
    status: 'FAOL',
    rating: 4.6,
    reviews: 156,
    distance: 4.2,
  },
];

const loadState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`denttish_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [doctors, setDoctors] = useState(() => loadState('doctors', []));
  const [appointments, setAppointments] = useState(() => loadState('appointments', []));
  const [clinics, setClinics] = useState(() => loadState('clinics', defaultClinics));
  const [clinicSettings, setClinicSettings] = useState(() => loadState('settings', defaultSettings));
  const [lastBooking, setLastBooking] = useState(null);
  const [extraCategories, setExtraCategories] = useState(() => loadState('extraCategories', []));

  useEffect(() => { localStorage.setItem('denttish_doctors', JSON.stringify(doctors)) }, [doctors]);
  useEffect(() => { localStorage.setItem('denttish_appointments', JSON.stringify(appointments)) }, [appointments]);
  useEffect(() => { localStorage.setItem('denttish_clinics', JSON.stringify(clinics)) }, [clinics]);
  useEffect(() => { localStorage.setItem('denttish_settings', JSON.stringify(clinicSettings)) }, [clinicSettings]);
  useEffect(() => { localStorage.setItem('denttish_extraCategories', JSON.stringify(extraCategories)) }, [extraCategories]);

  // Doctor CRUD
  const addDoctor = (doctor) => {
    const id = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    const initials = doctor.name
      .replace('Dr. ', '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
    const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500'];
    const avatarBg = bgColors[id % bgColors.length];
    const newDoctor = {
      ...doctor,
      id,
      avatar: initials,
      avatarBg,
      rating: parseFloat((4 + Math.random()).toFixed(1)),
      reviews: Math.floor(Math.random() * 200) + 20,
      patients: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}k+`,
      distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1)),
      verified: true,
      subspecialty: doctor.subspecialty || '',
      phone: doctor.phone || '',
      workingDays: doctor.workingDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
      workingHours: doctor.workingHours || '09:00 - 18:00',
    };
    setDoctors([...doctors, newDoctor]);
  };

  const updateDoctor = (id, updatedData) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, ...updatedData } : d));
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  // Appointment CRUD
  const addAppointment = (appointment) => {
    const id = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    const statusColors = {
      'Tasdiqlangan': 'bg-green-100 text-green-800',
      'Kutilmoqda': 'bg-yellow-100 text-yellow-800',
      'Yakunlandi': 'bg-blue-100 text-blue-800',
      'Bekor qilindi': 'bg-red-100 text-red-800',
    };
    const newAppointment = {
      ...appointment,
      id,
      initials: appointment.patient.split(' ').map(n => n[0]).join('').toUpperCase(),
      phone: appointment.phone || '',
      statusColor: statusColors[appointment.status] || statusColors['Kutilmoqda'],
    };
    setAppointments([...appointments, newAppointment]);
    setLastBooking(newAppointment);
  };

  const updateAppointment = (id, updatedData) => {
    const statusColors = {
      'Tasdiqlangan': 'bg-green-100 text-green-800',
      'Kutilmoqda': 'bg-yellow-100 text-yellow-800',
      'Yakunlandi': 'bg-blue-100 text-blue-800',
      'Bekor qilindi': 'bg-red-100 text-red-800',
    };
    setAppointments(appointments.map(a => {
      if (a.id === id) {
        const updated = { ...a, ...updatedData };
        updated.statusColor = statusColors[updated.status] || statusColors['Kutilmoqda'];
        return updated;
      }
      return a;
    }));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  // Clinic CRUD
  const addClinic = (clinic) => {
    const id = clinics.length > 0 ? Math.max(...clinics.map(c => c.id)) + 1 : 1;
    const newClinic = {
      ...clinic,
      id,
      doctors: 0,
      rating: 4.5,
      reviews: 0,
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=clinic${id}`,
    };
    setClinics([...clinics, newClinic]);
  };

  const updateClinic = (id, updatedData) => {
    setClinics(clinics.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteClinic = (id) => {
    setClinics(clinics.filter(c => c.id !== id));
  };

  const updateClinicSettings = (settings) => {
    setClinicSettings({ ...clinicSettings, ...settings });
  };

  // Categories
  const categories = [...new Set([
    ...doctors.filter(d => d.status === 'FAOL').map(d => d.specialization),
    ...extraCategories,
  ])].filter(Boolean).sort();

  const doAddCategory = (name) => {
    if (name && !categories.includes(name)) {
      setExtraCategories([...extraCategories, name]);
    }
  };

  const doRemoveCategory = (name) => {
    const hasDoctor = doctors.some(d => d.specialization === name);
    if (!hasDoctor) {
      setExtraCategories(extraCategories.filter(c => c !== name));
    }
  };

  const getStatistics = () => {
    return {
      totalDoctors: doctors.length,
      activeDoctors: doctors.filter(d => d.status === 'FAOL').length,
      inactiveDoctors: doctors.filter(d => d.status === 'NOFAOL').length,
      totalAppointments: appointments.length,
      totalClinics: clinics.length,
      todayAppointments: appointments.filter(a => a.status === 'Tasdiqlangan').length,
    };
  };

  const value = {
    doctors, setDoctors, addDoctor, updateDoctor, deleteDoctor,
    appointments, setAppointments, addAppointment, updateAppointment, deleteAppointment,
    clinics, setClinics, addClinic, updateClinic, deleteClinic,
    clinicSettings, updateClinicSettings,
    lastBooking, setLastBooking,
    categories, addCategory: doAddCategory, removeCategory: doRemoveCategory,
    getStatistics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
