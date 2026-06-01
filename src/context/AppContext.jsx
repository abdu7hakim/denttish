import React, { createContext, useState, useContext } from 'react';

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

const initialDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    phone: '+998 90 123 45 67',
    specialization: 'Kosmetik stomatologiya va Ortodontiya',
    subspecialty: 'Ortodontiya',
    clinic: 'DentTish Premium Clinic',
    rating: 4.9,
    reviews: 120,
    experience: '12 yil',
    patients: '3.5k+',
    status: 'FAOL',
    distance: 2.5,
    avatar: 'SJ',
    avatarBg: 'bg-blue-500',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Marcus Vance',
    phone: '+998 93 987 65 43',
    specialization: 'Ortodontist',
    subspecialty: 'Bolalar ortodontiyasi',
    clinic: 'Lumina Dental Hub',
    rating: 4.8,
    reviews: 95,
    experience: '8 yil',
    patients: '2.1k+',
    status: 'FAOL',
    distance: 1.2,
    avatar: 'MV',
    avatarBg: 'bg-green-500',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Elena Rostova',
    phone: '+998 97 111 22 33',
    specialization: 'Katta endodontist',
    subspecialty: 'Endodontiya',
    clinic: 'SmileCare Dental Studio',
    rating: 4.7,
    reviews: 78,
    experience: '15 yil',
    patients: '4.2k+',
    status: 'FAOL',
    distance: 3.1,
    avatar: 'ER',
    avatarBg: 'bg-red-500',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    verified: true,
  },
  {
    id: 4,
    name: 'Dr. Ahmed Hassan',
    phone: '+998 71 456 78 90',
    specialization: 'Implant va Protez',
    subspecialty: 'Implantologiya',
    clinic: 'Bright Smile Clinic',
    rating: 4.6,
    reviews: 65,
    experience: '10 yil',
    patients: '1.8k+',
    status: 'NOFAOL',
    distance: 4.2,
    avatar: 'AH',
    avatarBg: 'bg-purple-500',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    verified: false,
  },
  {
    id: 5,
    name: 'Dr. Anna Kowalski',
    phone: '+998 90 555 66 77',
    specialization: 'Pediatrik Stomatolog',
    subspecialty: 'Bolalar stomatologiyasi',
    clinic: 'Lumina Dental Hub',
    rating: 4.9,
    reviews: 140,
    experience: '9 yil',
    patients: '2.8k+',
    status: 'FAOL',
    distance: 1.2,
    avatar: 'AK',
    avatarBg: 'bg-teal-500',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    verified: true,
  },
  {
    id: 6,
    name: 'Dr. Juan Carlos',
    phone: '+998 93 222 33 44',
    specialization: 'Estetik va Umumiy',
    subspecialty: 'Estetik stomatologiya',
    clinic: 'DentTish Premium Clinic',
    rating: 4.8,
    reviews: 102,
    experience: '11 yil',
    patients: '2.5k+',
    status: 'FAOL',
    distance: 2.5,
    avatar: 'JC',
    avatarBg: 'bg-indigo-500',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    verified: true,
  },
];

const initialClinics = [
  {
    id: 1,
    name: 'Lumina Dental Hub',
    address: 'Amir Temur ko\'chasi 45-uy, Tashkent',
    phone: '+998 71 123 45 67',
    hours: '09:00 - 21:00',
    services: ['UMUMIY', 'RENTGEN', 'IMPLANT'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic1',
    doctors: 5,
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
    doctors: 4,
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
    doctors: 3,
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
    doctors: 2,
    status: 'FAOL',
    rating: 4.6,
    reviews: 156,
    distance: 4.2,
  },
];

const initialAppointments = [
  {
    id: 1,
    patient: 'Azizbek Nazirov',
    initials: 'AN',
    doctor: 'Dr. Sarah Jenkins',
    doctorId: 1,
    clinic: 'DentTish Premium Clinic',
    date: '12 Okt, 2023',
    time: '10:00 - 11:00',
    status: 'Tasdiqlangan',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 2,
    patient: 'Shahzoda Umarova',
    initials: 'SU',
    doctor: 'Dr. Anna Kowalski',
    doctorId: 5,
    clinic: 'Lumina Dental Hub',
    date: '12 Okt, 2023',
    time: '11:30 - 12:00',
    status: 'Kutilmoqda',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 3,
    patient: 'Dilshod Rahimov',
    initials: 'DR',
    doctor: 'Dr. Marcus Vance',
    doctorId: 2,
    clinic: 'Lumina Dental Hub',
    date: '11 Okt, 2023',
    time: '15:00 - 16:30',
    status: 'Yakunlandi',
    statusColor: 'bg-blue-100 text-blue-800',
  },
];

export function AppProvider({ children }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [clinics, setClinics] = useState(initialClinics);
  const [clinicSettings, setClinicSettings] = useState(defaultSettings);
  const [lastBooking, setLastBooking] = useState(null);

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
    const seed = doctor.name.replace('Dr. ', '');
    const newDoctor = {
      ...doctor,
      id,
      avatar: initials,
      avatarBg,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
      rating: parseFloat((4 + Math.random()).toFixed(1)),
      reviews: Math.floor(Math.random() * 200) + 20,
      patients: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}k+`,
      distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1)),
      verified: true,
      subspecialty: doctor.subspecialty || '',
      phone: doctor.phone || '',
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
