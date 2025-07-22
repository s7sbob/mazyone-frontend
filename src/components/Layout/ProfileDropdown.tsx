import React, { useState } from 'react';
import { User, Settings, LogOut, CreditCard, BarChart3, HelpCircle, Crown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const ProfileDropdown = () => {
  const { user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: User,
      label: 'الملف الشخصي',
      href: '/settings',
      color: 'text-neutral-600'
    },
    {
      icon: CreditCard,
      label: 'بطاقاتي',
      href: '/cards',
      color: 'text-blue-500'
    },
    {
      icon: BarChart3,
      label: 'التحليلات',
      href: '/analytics',
      color: 'text-green-500'
    },
    {
      icon: Settings,
      label: 'الإعدادات',
      href: '/settings',
      color: 'text-neutral-600'
    },
    {
      icon: HelpCircle,
      label: 'المساعدة',
      href: '/support',
      color: 'text-purple-500'
    }
  ];

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case 'core':
        return { text: 'مزيون الأصيل', color: 'bg-gray-100 text-gray-800' };
      case 'pro':
        return { text: 'مزيون برو', color: 'bg-blue-100 text-blue-800' };
      case 'pro-plus':
        return { text: 'مزيون برو بلس', color: 'bg-purple-100 text-purple-800' };
      case 'business':
        return { text: 'مزيون المؤسسي', color: 'bg-orange-100 text-orange-800' };
      default:
        return { text: 'مجاني', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleLogout = () => {
    if (window.confirm('هل أنت متأكد أنك تريد تسجيل الخروج؟')) {
      logout();
      setIsOpen(false);
    }
  };

  const subscriptionBadge = getSubscriptionBadge(user?.subscription || 'free');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50">
            {/* User Info */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {user?.name || 'المستخدم'}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {user?.email}
                  </p>
                  <div className="mt-1">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      subscriptionBadge.color
                    )}>
                      {user?.subscription === 'business' && <Crown className="w-3 h-3 ml-1" />}
                      {subscriptionBadge.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <item.icon className={cn("w-4 h-4", item.color)} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Subscription Upgrade */}
            {user?.subscription === 'free' && (
              <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      ترقية الاشتراك
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                    احصل على ميزات إضافية مع مزيون برو
                  </p>
                  <button 
                    className="w-full text-xs font-medium text-white py-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#006BE3' }}
                  >
                    ترقية الآن
                  </button>
                </div>
              </div>
            )}

            {/* Logout */}
            <div className="p-2 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
