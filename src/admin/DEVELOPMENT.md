# Admin Panel Development Guide

## Ishni boshlash

Admin panelni localhost'da ko'rish uchun:

```bash
cd frontend
npm run dev
```

Keyin brauzerdagi addressga o'ting:
- `http://localhost:5173/admin/login` - Admin login

## 📚 Loyihaning Arxitekturasi

### Folder Struktura

```
src/admin/
├── components/
│   ├── AdminSidebar.jsx     - Chap taraf navigatsiya
│   ├── AdminHeader.jsx      - Yuqori header
│   ├── AdminLayout.jsx      - Asosiy layout wrapper
│   └── index.js             - Komponentlarni export qilish
├── pages/
│   ├── AdminLogin.jsx       - Login sahifasi
│   ├── AdminDashboard.jsx   - Asosiy dashboard
│   ├── DoctorsManagement.jsx - Shifokorlar boshqaruvi
│   ├── AppointmentsManagement.jsx - Qabullar boshqaruvi
│   └── AdminSettings.jsx    - Sozlamalar
├── utils/
│   └── auth.js              - Authentication utilities
└── README.md                - Admin panel dokumentatsiyasi
```

## 🛠️ Yangi Sahifa Qo'shish

Yangi admin sahifasi qo'shish uchun:

### 1. Yangi Page komponent yarating

```jsx
// src/admin/pages/NewPage.jsx
import React from 'react';
import AdminLayout from '../components/AdminLayout';

export default function NewPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Your content here */}
      </div>
    </AdminLayout>
  );
}
```

### 2. App.jsx ga route qo'shing

```jsx
import NewPage from './admin/pages/NewPage'

// Dalam Routes
<Route path="/admin/new-page" element={<NewPage />} />
```

### 3. Sidebar menuga qo'shing

AdminSidebar.jsx da `menuItems` arrayga qo'shing:

```jsx
{
  label: 'Yangi Sahifa',
  icon: YourIcon,
  path: '/admin/new-page',
  key: 'new-page',
}
```

## 🎨 Dizayn Qoidalari

### Ranglar

- **Blue** (Primary): `#3B82F6` - Asosiy actionlar
- **Green**: `#10B981` - Success, Tasdiqlangan
- **Yellow**: `#F59E0B` - Warning, Kutilmoqda
- **Red**: `#EF4444` - Danger, Bekor qilindi
- **Gray**: `#6B7280` - Text, Disabled

### Tailwind CSS Klasslari

```jsx
// Button
className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"

// Card
className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"

// Input
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

// Badge/Pill
className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
```

## 🔧 Komponentlar Foydalanish

### AdminLayout

AdminLayout hamma admin sahifalari uchun wrapper bo'lib ishlaydi.

```jsx
<AdminLayout adminName="Dr. Alisher V.">
  {/* Your content */}
</AdminLayout>
```

### AdminSidebar

Avtomatik AdminLayout ga kiritiladi, Manual import:

```jsx
import { AdminSidebar } from '../admin';
```

### AdminHeader

Avtomatik AdminLayout ga kiritiladi.

## 💾 State Management

Hozircha local component state ishlatilyapdi. Keyingi bosqichda Redux yoki Zustand qo'llanilishi mumkin.

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

## 🔐 Authentication

`src/admin/utils/auth.js` faylida authentication utilities mavjud:

```jsx
import { 
  ProtectedRoute, 
  logout, 
  getAdminToken, 
  loginAdmin 
} from './admin/utils/auth';

// Protected route qo'shish
<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>

// Logout
logout();

// Token olish
const token = getAdminToken();
```

## 📡 API Integratsiya

Backend API bilan ishlash uchun `authenticatedFetch` funksiyasini ishlating:

```jsx
import { authenticatedFetch } from '../admin/utils/auth';

// Data fetch qilish
async function fetchDoctors() {
  try {
    const response = await authenticatedFetch('/api/doctors');
    const data = await response.json();
    setDoctors(data);
  } catch (error) {
    console.error(error);
  }
}
```

## 📱 Responsive Dizayn

Tailwind CSS breakpoints:
- `sm`: 640px
- `md`: 768px (Sidebar toggle)
- `lg`: 1024px
- `xl`: 1280px

```jsx
// Mobile-first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## 🐛 Debugging

React Developer Tools extensionni qo'llaning:
- Chrome DevTools -> React tab

Console da error qo'rish:
```javascript
console.log('Debug:', variable);
console.error('Error:', error);
```

## 📦 Dependencies

- `react@18.2.0`
- `react-dom@18.2.0`
- `react-router-dom@6.20.0`
- `lucide-react@0.293.0`
- `tailwindcss@3.3.6`

## ✅ Best Practices

1. **Component naming** - PascalCase (AdminLogin.jsx)
2. **File naming** - Mirrored folder structure
3. **Imports** - Absolute paths qo'llang
4. **State** - Minimal state, Props orqali pass qilish
5. **Styling** - Tailwind CSS utility classes
6. **Accessibility** - Semantic HTML, ARIA attributes

## 🔗 Foydalanuvchi Yo'naltirish

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/admin/dashboard');
navigate(-1); // Orqaga qaytish
```

## 📝 Comments va Dokumentatsiya

Murakkab logika uchun JSDoc comments qo'llang:

```jsx
/**
 * Shifokorlarni qidirish
 * @param {array} doctors - Shifokorlar massivi
 * @param {string} query - Qidiruv stringi
 * @returns {array} Filtrlangan shifokorlar
 */
function searchDoctors(doctors, query) {
  // ...
}
```

## 🚀 Deployment

Frontend build qilish:
```bash
npm run build
```

`dist` papkasi production uchun tayyor.

## 📞 Support

Ishlashda muammolar bo'lsa, GitHub issues yoki pull requests orqali yo'llang.

---

**Oxirgi yangilanish**: 2026-yil 1-iyun
