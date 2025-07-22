import React from 'react';
import { Menu, Moon, Sun, Search, Link, Crown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const { user, darkMode, toggleDarkMode, toggleSidebar } = useStore();

  return (
    <header className="bg-white dark:bg-neutral-900  border-neutral-200 dark:border-neutral-700 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              مرحباً، {user?.name?.split(' ')[0] || 'المستخدم'}
            </h1>
          </div>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="البحث في مزيون..."
              className="w-full pl-4 pr-10 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {user?.subscription === 'free' && (
  <Link to="/subscription" className="btn-primary text-sm">
    <Crown className="w-4 h-4 mr-1" />
    ترقية
  </Link>
)}
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={darkMode ? 'الوضع الفاتح' : 'الوضع الليلي'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
