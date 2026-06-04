const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin3379';

// --- IN-MEMORY DB ---
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

function json(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

function parseUrl(url) {
  const [path, qs] = url.split('?');
  const params = {};
  if (qs) qs.split('&').forEach(p => { const [k, v] = p.split('='); params[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
  return { path, params };
}

function isAdmin(req) {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ');
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return json(res, {});

  const { path, params } = parseUrl(req.url);
  const method = req.method;

  // --- AUTH ---
  if (path === '/api/auth/register' && method === 'POST') {
    const body = await parseBody(req);
    if (!body.name || !body.phone) return json(res, { error: 'Name and phone required' }, 400);
    if (users.some(u => u.phone === body.phone)) return json(res, { error: "Bu telefon raqam avval ro'yxatdan o'tgan" }, 409);
    const user = { id: Date.now(), name: body.name, phone: body.phone, registeredAt: new Date().toISOString() };
    users.push(user);
    notifications.unshift({ id: nextNotifId++, message: `Yangi foydalanuvchi: ${user.name} (${user.phone})`, type: 'user_register', time: new Date().toISOString(), read: false, target: 'admin' });
    return json(res, { user });
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const body = await parseBody(req);
    const user = users.find(u => u.name === body.name && u.phone === body.phone);
    if (!user) return json(res, { error: 'Foydalanuvchi topilmadi' }, 404);
    return json(res, { user });
  }

  if (path === '/api/auth/admin-login' && method === 'POST') {
    const body = await parseBody(req);
    if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
      return json(res, { token, admin: { name: 'Admin' } });
    }
    return json(res, { error: "Username yoki parol noto'g'ri" }, 401);
  }

  // --- DOCTORS ---
  if (path === '/api/doctors' && method === 'GET') {
    return json(res, doctors);
  }

  if (path === '/api/doctors' && method === 'POST') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    const body = await parseBody(req);
    const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-teal-500', 'bg-indigo-500'];
    const initials = body.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').toUpperCase();
    const doctor = { ...body, id: nextDoctorId++, avatar: initials, avatarBg: bgColors[doctors.length % bgColors.length], rating: parseFloat((4 + Math.random()).toFixed(1)), reviews: Math.floor(Math.random() * 200) + 20, patients: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}k+`, verified: true };
    doctors.push(doctor);
    notifications.unshift({ id: nextNotifId++, message: `Yangi shifokor: ${doctor.name}`, type: 'doctor_add', time: new Date().toISOString(), read: false, target: 'admin' });
    return json(res, doctor);
  }

  const doctorMatch = path.match(/^\/api\/doctors\/(\d+)$/);
  if (doctorMatch && method === 'PUT') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    const body = await parseBody(req);
    const idx = doctors.findIndex(d => d.id === parseInt(doctorMatch[1]));
    if (idx === -1) return json(res, { error: 'Not found' }, 404);
    doctors[idx] = { ...doctors[idx], ...body, id: doctors[idx].id };
    return json(res, doctors[idx]);
  }

  if (doctorMatch && method === 'DELETE') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    const doc = doctors.find(d => d.id === parseInt(doctorMatch[1]));
    if (!doc) return json(res, { error: 'Not found' }, 404);
    doctors = doctors.filter(d => d.id !== parseInt(doctorMatch[1]));
    notifications.unshift({ id: nextNotifId++, message: `Shifokor o'chirildi: ${doc.name}`, type: 'doctor_remove', time: new Date().toISOString(), read: false, target: 'admin' });
    return json(res, { ok: true });
  }

  // --- APPOINTMENTS ---
  if (path === '/api/appointments' && method === 'GET') {
    let list = appointments;
    if (params.phone) list = list.filter(a => a.phone === params.phone);
    return json(res, list);
  }

  if (path === '/api/appointments' && method === 'POST') {
    const body = await parseBody(req);
    const statusColors = { 'Tasdiqlangan': 'bg-green-100 text-green-800', 'Kutilmoqda': 'bg-yellow-100 text-yellow-800', 'Yakunlandi': 'bg-blue-100 text-blue-800', 'Bekor qilindi': 'bg-red-100 text-red-800' };
    const appointment = { ...body, id: nextAppointmentId++, initials: body.patient.split(' ').map(n => n[0]).join('').toUpperCase(), statusColor: statusColors[body.status] || statusColors['Kutilmoqda'] };
    appointments.push(appointment);
    notifications.unshift({ id: nextNotifId++, message: `${appointment.patient} → ${appointment.doctor} (${appointment.date}, ${appointment.time})`, type: 'booking', time: new Date().toISOString(), read: false, target: 'admin' });
    notifications.unshift({ id: nextNotifId++, message: `Siz ${appointment.doctor} qabuliga yozildingiz (${appointment.date}, ${appointment.time})`, type: 'booking', time: new Date().toISOString(), read: false, target: appointment.phone });
    return json(res, appointment);
  }

  const apptMatch = path.match(/^\/api\/appointments\/(\d+)$/);
  if (apptMatch && method === 'PUT') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    const body = await parseBody(req);
    const idx = appointments.findIndex(a => a.id === parseInt(apptMatch[1]));
    if (idx === -1) return json(res, { error: 'Not found' }, 404);
    const statusColors = { 'Tasdiqlangan': 'bg-green-100 text-green-800', 'Kutilmoqda': 'bg-yellow-100 text-yellow-800', 'Yakunlandi': 'bg-blue-100 text-blue-800', 'Bekor qilindi': 'bg-red-100 text-red-800' };
    appointments[idx] = { ...appointments[idx], ...body, statusColor: statusColors[body.status] || appointments[idx].statusColor };
    return json(res, appointments[idx]);
  }

  if (apptMatch && method === 'DELETE') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    appointments = appointments.filter(a => a.id !== parseInt(apptMatch[1]));
    return json(res, { ok: true });
  }

  // --- USERS ---
  if (path === '/api/users' && method === 'GET') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    return json(res, users);
  }

  // --- NOTIFICATIONS ---
  if (path === '/api/notifications' && method === 'GET') {
    let list = notifications;
    if (params.target) list = list.filter(n => n.target === params.target);
    return json(res, list);
  }

  if (path === '/api/notifications/mark-read' && method === 'POST') {
    const body = await parseBody(req);
    const n = notifications.find(n => n.id === body.id);
    if (n) n.read = true;
    return json(res, { ok: true });
  }

  if (path === '/api/notifications/mark-all-read' && method === 'POST') {
    notifications.forEach(n => { n.read = true; });
    return json(res, { ok: true });
  }

  // --- SETTINGS ---
  if (path === '/api/settings' && method === 'GET') {
    return json(res, settings);
  }

  if (path === '/api/settings' && method === 'PUT') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    const body = await parseBody(req);
    settings = { ...settings, ...body };
    return json(res, settings);
  }

  // --- CATEGORIES ---
  if (path === '/api/categories' && method === 'GET') {
    return json(res, categories);
  }

  if (path === '/api/categories' && method === 'POST') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    const body = await parseBody(req);
    if (!categories.includes(body.name)) categories.push(body.name);
    return json(res, categories);
  }

  const catMatch = path.match(/^\/api\/categories\/(.+)$/);
  if (catMatch && method === 'DELETE') {
    if (!isAdmin(req)) return json(res, { error: 'Unauthorized' }, 401);
    categories = categories.filter(c => c !== decodeURIComponent(catMatch[1]));
    return json(res, categories);
  }

  // --- STATISTICS ---
  if (path === '/api/statistics' && method === 'GET') {
    return json(res, {
      totalDoctors: doctors.length,
      activeDoctors: doctors.filter(d => d.status === 'FAOL').length,
      inactiveDoctors: doctors.filter(d => d.status !== 'FAOL').length,
      totalAppointments: appointments.length,
      todayAppointments: appointments.filter(a => a.status === 'Tasdiqlangan').length,
    });
  }

  // --- 404 ---
  return json(res, { error: 'Not found' }, 404);
};
