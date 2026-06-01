import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export default function AdminHeader({ toggleSidebar, adminName = 'Admin' }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 flex-1 md:flex-none md:ml-0 ml-4">
          DentTish Admin
        </h1>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {adminName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
