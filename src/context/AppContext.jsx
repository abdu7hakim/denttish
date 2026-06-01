import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Doctors state
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Aziza Karimova',
      phone: '+998 90 123 45 67',
      specialization: 'Terapevt',
      subspecialty: 'Bolalar tish shifokori',
      experience: '8 yil',
      patients: '1.2k+',
      status: 'FAOL',
      avatar: 'AK',
      avatarBg: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Dr. Rustam Aliyev',
      phone: '+998 93 987 65 43',
      specialization: 'Jarrov',
      subspecialty: 'Implantolog',
      experience: '12 yil',
      patients: '3.5k+',
      status: 'FAOL',
      avatar: 'RA',
      avatarBg: 'bg-green-500',
    },
    {
      id: 3,
      name: 'Dr. Malika Tohirova',
      phone: '+998 97 111 22 33',
      specialization: 'Ortodont',
      subspecialty: '',
      experience: '5 yil',
      patients: '800+',
      status: 'NOFAOL',
      avatar: 'MT',
      avatarBg: 'bg-red-500',
    },
  ]);

  // Appointments state
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Azizbek Nazirov',
      initials: 'AN',
      doctor: 'Dr. Alisher Vohidov',
      clinic: 'Yunusobod',
      date: '12 Okt, 2023',
      time: '10:00 - 11:00',
      status: 'Tasdiqlangan',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      patient: 'Shahzoda Umarova',
      initials: 'SU',
      doctor: 'Dr. Malika Karimova',
      clinic: 'Chilonzor',
      date: '12 Okt, 2023',
      time: '11:30 - 12:00',
      status: 'Kutilmoqda',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 3,
      patient: 'Dilshod Rahimov',
      initials: 'DR',
      doctor: 'Dr. Alisher Vohidov',
      clinic: 'Yunusobod',
      date: '11 Okt, 2023',
      time: '15:00 - 16:30',
      status: 'Yakunlandi',
      statusColor: 'bg-blue-100 text-blue-800',
    },
  ]);

  // Clinics state
  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: 'Yunusobod Filiali',
      address: 'Yunusobod tumani, Tashkent',
      phone: '+998 71 200 00 01',
      doctors: 5,
      status: 'FAOL',
      rating: 4.8,
      reviews: 245,
      distance: 1.2,
      hours: '09:00 - 21:00',
      services: ['UMUMIY', 'RENTGEN', 'IMPLANT'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic1',
    },
    {
      id: 2,
      name: 'Chilonzor Filiali',
      address: 'Chilonzor tumani, Tashkent',
      phone: '+998 71 200 00 02',
      doctors: 4,
      status: 'FAOL',
      rating: 4.9,
      reviews: 312,
      distance: 2.5,
      hours: '08:00 - 22:00',
      services: ['UMUMIY', 'ORTODONTIYA', 'KOSMETIK'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic2',
    },
    {
      id: 3,
      name: 'Mirabad Filiali',
      address: 'Mirabad tumani, Tashkent',
      phone: '+998 71 200 00 03',
      doctors: 3,
      status: 'FAOL',
      rating: 4.7,
      reviews: 189,
      distance: 3.1,
      hours: '10:00 - 20:00',
      services: ['UMUMIY', 'PROTEZ', 'ENDODONTIYA'],
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=clinic3',
    },
  ]);

  // Add doctor
  const addDoctor = (doctor) => {
    const newDoctor = {
      ...doctor,
      id: Math.max(...doctors.map(d => d.id), 0) + 1,
    };
    setDoctors([...doctors, newDoctor]);
  };

  // Update doctor
  const updateDoctor = (id, updatedData) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, ...updatedData } : d));
  };

  // Delete doctor
  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  // Add appointment
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
    };
    setAppointments([...appointments, newAppointment]);
  };

  // Update appointment
  const updateAppointment = (id, updatedData) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  // Delete appointment
  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  // Add clinic
  const addClinic = (clinic) => {
    const newClinic = {
      ...clinic,
      id: Math.max(...clinics.map(c => c.id), 0) + 1,
    };
    setClinics([...clinics, newClinic]);
  };

  // Get statistics
  const getStatistics = () => {
    return {
      totalDoctors: doctors.filter(d => d.status === 'FAOL').length,
      totalAppointments: appointments.length,
      totalClinics: clinics.length,
      todayAppointments: appointments.filter(a => a.status === 'Tasdiqlangan').length,
    };
  };

  const value = {
    doctors,
    setDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    appointments,
    setAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    clinics,
    setClinics,
    addClinic,
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
