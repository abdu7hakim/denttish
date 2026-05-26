# DentTish - Stomatolog Klinikasi Ilovasi

React va Tailwind CSS bilan qurilgan zamonaviy stomatolog klinikalarini boshqarish va maslahat berish ilovasi.

## Xususiyatlari

- 🏠 **Bosh sahifa** - Klinikalar va shifokorlarni qidirish, kelsagi qabullar
- 👨‍⚕️ **Shifokor profili** - Shifokorlar haqida to'liq ma'lumot, baholash, galereya
- 🏥 **Klinikalar** - Barcha klinikalarni ro'yxati va tafsili
- 👥 **Shifokorlar** - Barcha shifokorlarni ro'yxati va reyting
- 📅 **Band qilish** - 4 bosqichli band qilish jarayoni
- 🤖 **AI Yordamchi** - AI bilan dental muammolar haqida maslahat
- 🚨 **Favqulodda yordam** - Tez yordamni xizmatlari va maslahatlar
- 📋 **Qayd tarixi** - Tish xaritasi, rentgen, davolash tarixi
- ✅ **Band qilish tasdiqlash** - Qabul tasdiqlash sahifasi
- 👤 **Profil** - Foydalanuvchi ma'lumotlari va statistikasi
- 🔔 **Bildirishnomalar** - Barcha xabarlarni kuzatish
- ⚙️ **Sozlamalar** - Ilovani sozlashtirish va xavfsizlik

## Loyiha Strukturasi

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── BottomNav.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── DoctorPage.jsx
│   │   ├── AIPage.jsx
│   │   ├── EmergencyPage.jsx
│   │   ├── HistoryPage.jsx
│   │   └── AcceptedPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## O'rnatish

1. Dependensiyalarni o'rnatish:
```bash
npm install
```

2. Development serverini ishga tushirish:
```bash
npm run dev
```

3. Build:
```bash
npm run build
```

## Foydalanilgan Texnologiyalar

- **React 18** - UI framework
- **React Router** - Navigatsiya
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Ikonkalar

## Ranglar

- Primary: #3B5998 (Asosiy ko'k)
- Secondary: #E8EAF6 (Engil ko'k)
- Accent: #7C3AED (Qirol)
- Danger: #DC2626 (Qizil)

## Dasturdagi Sahifalar

| Sahifa | Manzil | Tavsifi |
|--------|--------|---------|
| Bosh sahifa | `/` | Qabul qilish va klinikalari ko'rish |
| Shifokor profili | `/doctor/:id` | Shifokor haqida to'liq ma'lumot |
| Klinikalar | `/clinics` | Barcha klinikalarni ro'yxati |
| Shifokorlar | `/doctors` | Barcha shifokorlarni ro'yxati |
| Band qilish | `/booking/:doctorId` | Band qilish sahifasi (4 bosqich) |
| AI Yordamchi | `/ai` | AI bilan chatni boshlash |
| Favqulodda | `/emergency` | Tez yordamni xizmatlari |
| Qayd | `/history` | Tish tarixi va rentgenlari |
| Tasdiqlash | `/accepted` | Band qilishni tasdiqlash |
| Profil | `/profile` | Foydalanuvchi profilini sahifasi |
| Bildirishnomalar | `/notifications` | Barcha xabarlarni sahifasi |
| Sozlamalar | `/settings` | Ilovani sozlashtirish |

## Mualliflar

DentTish Team

---

Barcha Uzbek tilida va mobil-birinchi dizayn bilan qurilgan! 📱
