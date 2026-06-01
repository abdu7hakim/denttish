# DentTish Admin Panel

Admin paneli DentTish klinikai boshqaruv tizimining asosiy interfeysi bo'lib, barcha asosiy operatsiyalarni amalga oshirish uchun mo'ljallangan.

## 📋 Xususiyatlar

### 1. **Admin Login (`/admin/login`)**
- Email yoki login va parol orqali kirish
- "Meni eslab qol" funksiyasi
- Parol unutgan bo'lsa - "Parolni unutdingizmi?" linkni bosmang (hali amalga oshirilmagan)
- Responsive dizayn

### 2. **Admin Dashboard (`/admin/dashboard`)**
- Bugungi qabullar soni
- Faol shifokorlar
- Kutilayotgan yangi bemorlar
- Jami bemorlar statistikasi
- So'nggi yozuvlardan jadval
- Bildirrishnomalar va fikrlar bo'limi

### 3. **Shifokorlar (`/admin/doctors`)**
- Barcha shifokorlarni ko'rish
- Grid yoki List ko'rinishda ko'rish
- Qidirish funksiyasi
- Filterlash (Faol/Nofaol)
- Shifokorlarni tahrirlash va o'chirish
- Yangi shifokor qo'shish

### 4. **Qabullar (`/admin/appointments`)**
- Barcha bemorlar qabullarini ko'rish
- Sana bo'yicha filterlash
- Holat bo'yicha filterlash (Tasdiqlangan, Kutilmoqda, Yakunlandi, Bekor qilindi)
- Shifokor bo'yicha filterlash
- Excelga yuklash
- Qabullarni tahrirlash va o'chirish

### 5. **Sozlamalar (`/admin/settings`)**
- Klinika asosiy ma'lumotlari
- Ish vaqti sozlash
- Bildirishnomalar sozlash (Email, SMS, Push)
- Xavfsizlik sozlamalari
- Ikki bosqichli tasdiqlov

## 🗂️ Loyiha Tuzilishi

```
src/admin/
├── components/
│   ├── AdminSidebar.jsx      - Navigation sidebar
│   ├── AdminHeader.jsx       - Top header
│   ├── AdminLayout.jsx       - Main layout wrapper
│   └── index.js              - Component exports
├── pages/
│   ├── AdminLogin.jsx        - Login page
│   ├── AdminDashboard.jsx    - Main dashboard
│   ├── DoctorsManagement.jsx - Doctors page
│   ├── AppointmentsManagement.jsx - Appointments page
│   └── AdminSettings.jsx     - Settings page
└── index.js                  - Admin folder exports
```

## 🚀 Ro'yxatdan o'tish

Admin panelga kirish uchun `/admin/login` sahifasiga o'ting.

Standart test ma'lumotlari:
- **Email**: admin@denttish.uz
- **Parol**: (Istalgan parolni kiritishingiz mumkin, hali backend integratsiyasi amalga oshirilmagan)

## 🎨 Dizayn

- **Rang sxemasi**: Asosiy rang blue (#3B82F6), qo'shimcha ranglar: green, yellow, red, purple
- **Shrift**: Inter (Tailwind CSS)
- **Responsive**: Mobile, Tablet, Desktop uchun optimallashtirilgan
- **Ikonlar**: lucide-react kutubxonasidan foydalanilgan

## 🔧 Texnologiyalar

- **React 18.2.0** - UI framework
- **React Router 6.20.0** - Marshrutlash
- **Tailwind CSS 3.3.6** - Styling
- **Lucide React 0.293.0** - Ikonlar
- **Vite 5.0.8** - Build tool

## 📱 Responsive Dizayn

- Mobile (< 768px): Sidebar avtomatik o'chiq/yopiq
- Tablet (768px - 1024px): Flexible layout
- Desktop (> 1024px): Stable layout

## 🔐 Xavfsizlik

Hozirda demo rejimida ishlaydi. Keyingi bosqichda:
- Backend API bilan integratsiya
- JWT token-based authentication
- Role-based access control (RBAC)
- API request validation

## 📝 Keyingi Bosqichlar

1. ✅ Admin panel layout (Tugallandi)
2. ⏳ Bemorlar boshqaruvi sahifasi
3. ⏳ Klinika filiallarini boshqarish
4. ⏳ Hisobotlar va analytics
5. ⏳ Backend API integratsiyasi
6. ⏳ User authentication va authorization

## 👨‍💻 Foydalanuvchi

Admin sahifalari sidebar orqali navigatsiyalashuvchi foydalanuvchiga mo'ljallangan.

## 🌐 Til

Butun interface Uzbek tilida (O'zbekcha) yozilgan.

---

**Oxirgi yangilanish**: 2026-yil 1-iyun
