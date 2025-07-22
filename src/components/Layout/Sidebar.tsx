import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Users, 
  Briefcase, 
  QrCode, 
  BarChart3,
  Scan,
  FileText,
  Globe,
  Gift,
  Settings,
  HelpCircle,
  Crown,
  X,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, user } = useStore();

  const menuItems = [
    {
      name: 'لوحة التحكم',
      href: '/dashboard',
      icon: Home,
      badge: null
    },
    {
      name: 'بطاقاتي',
      href: '/cards',
      icon: CreditCard,
      badge: null
    },
    {
      name: 'جهات الاتصال',
      href: '/contacts',
      icon: Users,
      badge: null
    },
    {
      name: 'الوظائف',
      href: '/jobs',
      icon: Briefcase,
      badge: null
    },
    {
      name: 'مولد QR',
      href: '/qr-generator',
      icon: QrCode,
      badge: null
    },
    {
      name: 'صفحات الهبوط',
      href: '/landing-pages',
      icon: Globe,
      badge: user?.subscription === 'free' ? 'برو' : null
    },
    {
      name: 'منشئ السيرة',
      href: '/cv-builder',
      icon: FileText,
      badge: user?.subscription === 'free' ? 'برو' : null
    },
    {
      name: 'مسح البطاقات',
      href: '/scan',
      icon: Scan,
      badge: null
    },
    {
      name: 'التحليلات',
      href: '/analytics',
      icon: BarChart3,
      badge: null
    },
    {
      name: 'الإحالات',
      href: '/referrals',
      icon: Gift,
      badge: null
    },
    {
      name: 'الاشتراك',
      href: '/subscription',
      icon: Crown,
      badge: user?.subscription === 'free' ? 'ترقية' : null
    },
    {
      name: 'الإعدادات',
      href: '/settings',
      icon: Settings,
      badge: null
    },
    {
      name: 'المساعدة',
      href: '/support',
      icon: HelpCircle,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "sidebar fixed top-0 right-0 h-full bg-white dark:bg-neutral-900  border-neutral-200 dark:border-neutral-700 z-50 transition-all duration-300 ease-in-out shadow-lg",
        sidebarOpen ? "w-64" : "w-16 lg:w-16",
        "transform lg:transform-none overflow-hidden",
        sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4  border-neutral-200 dark:border-neutral-700 relative">
          <div className={cn(
            "flex items-center space-x-3 space-x-reverse transition-opacity duration-200",
            sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
          )}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              مزيون
            </span>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={cn(
              "sidebar-toggle-btn p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 relative z-10",
              "border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm",
              !sidebarOpen && "lg:absolute lg:left-[-16px] lg:top-1/2 lg:transform lg:-translate-y-1/2"
            )}
          >
            {sidebarOpen ? (
              <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <Menu className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
          >
            <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-500">
          <div className="sidebar-container p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={cn(
                      "sidebar-link group/item relative w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "active bg-blue-500 text-white shadow-lg" 
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse w-full overflow-hidden">
                      {/* Icon */}
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <item.icon className={cn(
                          "w-5 h-5 transition-colors",
                          isActive 
                            ? "text-white" 
                            : "text-neutral-600 dark:text-neutral-400 group-hover/item:text-neutral-800 dark:group-hover/item:text-neutral-200"
                        )} />
                      </div>
                      
                      {/* Text */}
                      <span className={cn(
                        "font-medium transition-all duration-200 flex-1 min-w-0",
                        sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 lg:opacity-0 lg:translate-x-2",
                        isActive 
                          ? "text-white" 
                          : "text-neutral-700 dark:text-neutral-300 group-hover/item:text-neutral-900 dark:group-hover/item:text-neutral-100",
                        "truncate"
                      )}>
                        {item.name}
                      </span>
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <span className={cn(
                        "bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full transition-all duration-200 flex-shrink-0",
                        sidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 lg:opacity-0 lg:scale-75"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Tooltip */}
                  {!sidebarOpen && (
                    <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60] shadow-lg min-w-max">
                      {item.name}
                      {item.badge && (
                        <span className="mr-2 bg-yellow-400 text-yellow-900 px-1 rounded text-xs">
                          {item.badge}
                        </span>
                      )}
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-full">
                        <div className="w-0 h-0 border-l-[6px] border-r-0 border-t-[6px] border-b-[6px] border-l-neutral-900 dark:border-l-neutral-100 border-t-transparent border-b-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* User Info at Bottom */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 p-4">
          <div className={cn(
            "flex items-center space-x-3 space-x-reverse transition-all duration-200",
            sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
          )}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {user?.name?.charAt(0) || 'M'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {user?.name || 'المستخدم'}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {user?.subscription === 'free' ? 'مزيون الأصيل' : 
                 user?.subscription === 'pro' ? 'مزيون برو' : 
                 user?.subscription === 'business' ? 'مزيون المؤسسي' : 'مزيون الأصيل'}
              </p>
            </div>
          </div>

          {/* Upgrade Button for Free Users */}
          {user?.subscription === 'free' && (
            <Link
              to="/subscription"
              className={cn(
                "mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium text-xs py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center",
                sidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 lg:opacity-0 lg:scale-75"
              )}
            >
              <Crown className="w-3 h-3 ml-1" />
              ترقية الحساب
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
