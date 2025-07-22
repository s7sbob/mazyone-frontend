import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Eye, 
  Share2, 
  Plus, 
  TrendingUp,
  Users,
  QrCode,
  BarChart3,
  Calendar,
  ArrowRight,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const { cards, contacts, user, notifications } = useStore();

  const stats = [
    {
      name: 'إجمالي البطاقات',
      value: cards.length,
      icon: CreditCard,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'إجمالي المشاهدات',
      value: cards.reduce((sum, card) => sum + card.views, 0),
      icon: Eye,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'إجمالي المشاركات',
      value: cards.reduce((sum, card) => sum + card.shares, 0),
      icon: Share2,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      name: 'جهات الاتصال',
      value: contacts.length,
      icon: Users,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      name: 'إنشاء بطاقة جديدة',
      description: 'أنشئ بطاقة رقمية احترافية',
      icon: Plus,
      href: '/cards/new',
      color: 'bg-blue-500'
    },
    {
      name: 'مولد QR',
      description: 'أنشئ رمز QR مخصص',
      icon: QrCode,
      href: '/qr-generator',
      color: 'bg-teal-500'
    },
    {
      name: 'مسح البطاقات',
      description: 'امسح بطاقة أو رمز QR',
      icon: Zap,
      href: '/scan',
      color: 'bg-yellow-500'
    },
    {
      name: 'التحليلات',
      description: 'تتبع أداء بطاقاتك',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-indigo-500'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'card_view',
      message: 'تم عرض بطاقة "أحمد محمد السعيد" 5 مرات',
      time: 'منذ ساعتين',
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'card_share',
      message: 'تم مشاركة بطاقة "بطاقة الشركة"',
      time: 'منذ 4 ساعات',
      icon: Share2,
      color: 'text-green-500'
    },
    {
      id: '3',
      type: 'contact_add',
      message: 'تم إضافة جهة اتصال جديدة "سارة أحمد"',
      time: 'أمس',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      id: '4',
      type: 'qr_scan',
      message: 'تم مسح رمز QR الخاص بك 3 مرات',
      time: 'أمس',
      icon: QrCode,
      color: 'text-orange-500'
    }
  ];

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
{/* Welcome Section */}
<div className="relative overflow-hidden rounded-2xl p-8 text-white" style={{ background: '#FACC15' }}>
  <div className="relative z-10">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          مرحباً بعودتك، {user?.name}! 👋
        </h1>
        <p className="text-yellow-100 text-lg">
          بطاقتك الذكية تبدأ من هنا. تحكم بهويتك، شاركها، وتتبع تفاعلها.
        </p>
      </div>
      <div className="hidden lg:block">
        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
          <Award className="w-16 h-16 text-white" />
        </div>
      </div>
    </div>
    
    <div className="mt-6 flex flex-wrap gap-4">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
        <span className="text-sm font-medium">اشتراكك: </span>
        <span className="font-bold">
          {user?.subscription === 'pro' && 'مزيون برو'}
          {user?.subscription === 'free' && 'مزيون الأصيل'}
          {user?.subscription === 'business' && 'مزيون المؤسسي'}
        </span>
      </div>
      {unreadNotifications > 0 && (
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-sm font-medium">{unreadNotifications} إشعار جديد</span>
        </div>
      )}
    </div>
  </div>
  
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full"></div>
    <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
    <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
  </div>
</div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {stat.value.toLocaleString()}
                </p>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className={cn(
                    "text-sm font-medium",
                    stat.changeType === 'positive' ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 mr-1">
                    من الشهر الماضي
                  </span>
                </div>
              </div>
              <div className={cn("p-4 rounded-xl", stat.color)}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            إجراءات سريعة
          </h2>
          <Target className="w-6 h-6 text-neutral-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3 space-x-reverse mb-3">
                <div className={cn("p-2 rounded-lg", action.color)}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                {action.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cards */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              بطاقاتي الأخيرة
            </h2>
            <Link 
              to="/cards" 
              className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1 space-x-reverse"
            >
              <span>عرض الكل</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {cards.slice(0, 3).map((card) => (
              <div key={card.id} className="flex items-center space-x-4 space-x-reverse p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.colors.primary }}>
                  {card.avatar ? (
                    <img 
                      src={card.avatar} 
                      alt={card.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <CreditCard className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {card.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    {card.title}
                  </p>
                  <div className="flex items-center space-x-4 space-x-reverse text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <span>{card.views} مشاهدة</span>
                    <span>{card.shares} مشاركة</span>
                  </div>
                </div>
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  card.isActive ? "bg-green-500" : "bg-neutral-400"
                )} />
              </div>
            ))}
          </div>
          
          <Link 
            to="/cards/new"
            className="mt-6 w-full btn-primary flex items-center justify-center space-x-2 space-x-reverse"
          >
            <Plus className="w-5 h-5" />
            <span>أنشئ بطاقة جديدة</span>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              النشاط الأخير
            </h2>
            <Calendar className="w-6 h-6 text-neutral-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                  <activity.icon className={cn("w-5 h-5", activity.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed">
                    {activity.message}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Link 
              to="/analytics"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1 space-x-reverse"
            >
              <span>عرض جميع الأنشطة</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              💡 نصيحة اليوم
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
              شارك بطاقتك عبر رمز QR في المؤتمرات والفعاليات لزيادة شبكة اتصالاتك المهنية بسرعة وفعالية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
