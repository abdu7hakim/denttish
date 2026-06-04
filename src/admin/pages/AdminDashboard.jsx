import React from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Users,
  Calendar,
  Stethoscope,
  TrendingUp,
  MoreVertical,
  Edit,
  Bell,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'Hozir';
  if (min < 60) return `${min} min oldin`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs} soat oldin`;
  const days = Math.floor(hrs / 24);
  return `${days} kun oldin`;
}

export default function AdminDashboard() {
  const { doctors, appointments, getStatistics, adminNotifications, markAllAdminRead } = useAppContext();
  const stats = getStatistics();

  return (
    <AdminLayout adminName="Admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Xush kelibsiz, Admin! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Bugungi klinika holati va asosiy ko'rsatkichlar
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bugungi qabullar */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg w-fit">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Bugungi qabullar</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {appointments.length}
              </span>
              <span className="text-sm text-green-600 font-medium">Jami</span>
            </div>
          </div>

          {/* Faol shifokorlar */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg w-fit">
                <Stethoscope className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Faol shifokorlar</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {doctors.filter(d => d.status === 'FAOL').length}
              </span>
              <span className="text-sm text-green-600 font-medium">/{doctors.length} jami</span>
            </div>
          </div>

          {/* Nofaol shifokorlar */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg w-fit">
                <Users className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Nofaol shifokorlar</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {doctors.filter(d => d.status === 'NOFAOL').length}
              </span>
              <span className="text-sm text-yellow-600 font-medium">Tasdiqlanmagan</span>
            </div>
          </div>

          {/* Jami shifokorlar */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg w-fit">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Jami shifokorlar</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {doctors.length}
              </span>
              <span className="text-sm text-purple-600 font-medium">Tizimda</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments Table */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                So'nggi yozuvlar
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Bugungi kun uchun belgilangan va kuzatish yozuvlari va kattiqlashtirilgan yozuvlarni
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Bemor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Shifokor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Vaqt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Holat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {appointment.patient}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {appointment.date}<br/><span className="text-xs">{appointment.time}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <a
                href="/admin/appointments"
                className="text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                Barcha yozuvlarni ko'rish
              </a>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Bildirrishnomalar
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {adminNotifications.filter(n => !n.read).length} ta o'qilmagan
                </p>
              </div>
              {adminNotifications.some(n => !n.read) && (
                <button onClick={markAllAdminRead} className="text-xs text-blue-600 hover:underline">
                  Hammasini o'qilgan deb belgilash
                </button>
              )}
            </div>

            <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {adminNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">
                  Bildirrishnomalar mavjud emas
                </div>
              ) : (
                adminNotifications.slice(0, 10).map((notif) => (
                  <div key={notif.id} className={`p-4 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start gap-3">
                      <Bell size={16} className={`mt-0.5 ${!notif.read ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{timeAgo(notif.time)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
