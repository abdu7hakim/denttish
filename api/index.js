import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin3379';

// --- IN-MEMORY DB (Vercel serverless has no writable filesystem) ---
let doctors = [
  { id: 1, name: 'Dr. Rustam Karimov', phone: '+998 90 123 45 67', specialization: 'Ortodont', subspecialty: 'Bolalar ortodontiyasi', experience: '12 yil', patients: '3.5k+', status: 'FAOL', workingHours: '09:00 - 17:00', workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'], avatar: 'RK', avatarBg: 'bg-blue-500', verified: true, rating: 4.9, reviews: 120, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rustam' },
  { id: 2, name: 'Dr. Nilufar Azimova', phone: '+998 93 987 65 43', specialization: 'Terapevt', subspecialty: 'Estetik stomatologiya', experience: '8 yil', patients: '2.1k+', status: 'FAOL', workingHours: '10:00 - 18:00', workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Juma', 'Shanba'], avatar: 'NA', avatarBg: 'bg-green-500', verified: true, rating: 4.8, reviews: 95, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nilufar' },
  { id: 3, name: 'Dr. Jahongir Sobirov', phone: '+998 97 111 22 33', specialization: 'Implantolog', subspecialty: 'Implant va protez', experience: '15 yil', patients: '4.2k+', status: 'FAOL', workingHours: '09:00 - 16:00', workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba'], avatar: 'JS', avatarBg: 'bg-red-500', verified: true, rating: 4.7, reviews: 78, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jahongir' },
];
let appointments = [];
let users = [];
let notifications = [];
let settings = {
  clinicName: 'DentTish Klinika', email: 'admin@denttish.uz', phone: '+998 71 200 00 00',
  address: 'Tashkent, Yunusobod tumani', workingHoursStart: '09:00', workingHoursEnd: '18:00',
  notificationsEmail: true, notificationsSms: true, notificationsPush: true, twoFactorAuth: false,
};
let categories = [];

let nextDoctorId = 4;
let nextAppointmentId = 1;
let nextNotifId = 1;

function adminAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// --- AUTH ---
app.post('/api/auth/register', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone required' });
  if (users.some(u => u.phone === phone)) return res.status(409).json({ error: "Bu telefon raqam avval ro'yxatdan o'tgan" });
  const user = { id: Date.now(), name, phone, registeredAt: new Date().toISOString() };
  users.push(user);
  notifications.unshift({ id: nextNotifId++, message: `Yangi foydalanuvchi ro'yxatdan o'tdi: ${name} (${phone})`, type: 'user_register', time: new Date().toISOString(), read: false, target: 'admin' });
  res.json({ user });
});

app.post('/api/auth/login', (req, res) => {
  const { name, phone } = req.body;
  const user = users.find(u => u.name === name && u.phone === phone);
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  res.json({ user });
});

app.post('/api/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
    res.json({ token, admin: { name: 'Admin' } });
  } else {
    res.status(401).json({ error: "Username yoki parol noto'g'ri" });
  }
});

// --- DOCTORS ---
app.get('/api/doctors', (_req, res) => { res.json(doctors); });

app.post('/api/doctors', adminAuth, (req, res) => {
  const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-teal-500', 'bg-indigo-500'];
  const initials = req.body.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').toUpperCase();
  const doctor = { ...req.body, id: nextDoctorId++, avatar: initials, avatarBg: bgColors[doctors.length % bgColors.length], rating: parseFloat((4 + Math.random()).toFixed(1)), reviews: Math.floor(Math.random() * 200) + 20, patients: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}k+`, verified: true };
  doctors.push(doctor);
  notifications.unshift({ id: nextNotifId++, message: `Yangi shifokor qo'shildi: ${doctor.name}`, type: 'doctor_add', time: new Date().toISOString(), read: false, target: 'admin' });
  res.json(doctor);
});

app.put('/api/doctors/:id', adminAuth, (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  doctors[idx] = { ...doctors[idx], ...req.body, id: doctors[idx].id };
  res.json(doctors[idx]);
});

app.delete('/api/doctors/:id', adminAuth, (req, res) => {
  const doc = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Not found' });
  doctors = doctors.filter(d => d.id !== parseInt(req.params.id));
  notifications.unshift({ id: nextNotifId++, message: `Shifokor ishdan olindi: ${doc.name}`, type: 'doctor_remove', time: new Date().toISOString(), read: false, target: 'admin' });
  res.json({ ok: true });
});

// --- APPOINTMENTS ---
app.get('/api/appointments', (req, res) => {
  const { phone } = req.query;
  let list = appointments;
  if (phone) list = list.filter(a => a.phone === phone);
  res.json(list);
});

app.post('/api/appointments', (req, res) => {
  const statusColors = { 'Tasdiqlangan': 'bg-green-100 text-green-800', 'Kutilmoqda': 'bg-yellow-100 text-yellow-800', 'Yakunlandi': 'bg-blue-100 text-blue-800', 'Bekor qilindi': 'bg-red-100 text-red-800' };
  const appointment = { ...req.body, id: nextAppointmentId++, initials: req.body.patient.split(' ').map(n => n[0]).join('').toUpperCase(), statusColor: statusColors[req.body.status] || statusColors['Kutilmoqda'] };
  appointments.push(appointment);
  notifications.unshift({ id: nextNotifId++, message: `${appointment.patient} → ${appointment.doctor} (${appointment.date}, ${appointment.time})`, type: 'booking', time: new Date().toISOString(), read: false, target: 'admin' });
  notifications.unshift({ id: nextNotifId++, message: `Siz ${appointment.doctor} qabuliga yozildingiz (${appointment.date}, ${appointment.time})`, type: 'booking', time: new Date().toISOString(), read: false, target: appointment.phone });
  res.json(appointment);
});

app.put('/api/appointments/:id', adminAuth, (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const statusColors = { 'Tasdiqlangan': 'bg-green-100 text-green-800', 'Kutilmoqda': 'bg-yellow-100 text-yellow-800', 'Yakunlandi': 'bg-blue-100 text-blue-800', 'Bekor qilindi': 'bg-red-100 text-red-800' };
  appointments[idx] = { ...appointments[idx], ...req.body, statusColor: statusColors[req.body.status] || appointments[idx].statusColor };
  res.json(appointments[idx]);
});

app.delete('/api/appointments/:id', adminAuth, (req, res) => {
  appointments = appointments.filter(a => a.id !== parseInt(req.params.id));
  res.json({ ok: true });
});

// --- USERS ---
app.get('/api/users', adminAuth, (_req, res) => { res.json(users); });

// --- NOTIFICATIONS ---
app.get('/api/notifications', (req, res) => {
  const { target } = req.query;
  let list = notifications;
  if (target) list = list.filter(n => n.target === target);
  res.json(list);
});

app.post('/api/notifications/mark-read', (req, res) => {
  const n = notifications.find(n => n.id === req.body.id);
  if (n) n.read = true;
  res.json({ ok: true });
});

app.post('/api/notifications/mark-all-read', (_req, res) => {
  notifications.forEach(n => { n.read = true; });
  res.json({ ok: true });
});

// --- SETTINGS ---
app.get('/api/settings', (_req, res) => { res.json(settings); });

app.put('/api/settings', adminAuth, (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

// --- CATEGORIES ---
app.get('/api/categories', (_req, res) => { res.json(categories); });

app.post('/api/categories', adminAuth, (req, res) => {
  if (!categories.includes(req.body.name)) categories.push(req.body.name);
  res.json(categories);
});

app.delete('/api/categories/:name', adminAuth, (req, res) => {
  categories = categories.filter(c => c !== req.params.name);
  res.json(categories);
});

// --- STATISTICS ---
app.get('/api/statistics', (_req, res) => {
  res.json({
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter(d => d.status === 'FAOL').length,
    inactiveDoctors: doctors.filter(d => d.status !== 'FAOL').length,
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(a => a.status === 'Tasdiqlangan').length,
  });
});

// For local dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`DentTish Backend running on port ${PORT}`));
}

export default app;
