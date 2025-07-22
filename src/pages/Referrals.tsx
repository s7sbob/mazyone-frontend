import React, { useState } from 'react';
import { 
  Users, 
  Gift, 
  Copy, 
  Share2,
  Trophy,
  TrendingUp,
  QrCode,
  Download,
  Star,
  Check
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockReferrals } from '../utils/mockData';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Referrals = () => {
  const { user } = useStore();
  const [referrals] = useState(mockReferrals);
  const [showQRModal, setShowQRModal] = useState(false);

  const referralLink = `https://mazyone.com/ref/${user?.id || 'AHMED2024'}`;
  const referralCode = 'AHMED2024';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('تم نسخ رابط الإحالة بنجاح!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('تم نسخ كود الإحالة بنجاح!');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'انضم إلى مزيون',
      text: 'أنشئ بطاقتك الرقمية الاحترافية مجاناً',
      url: referralLink
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const stats = [
    {
      name: 'إجمالي الدعوات',
      value: 15,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'التسجيلات الناجحة',
      value: 8,
      icon: Check,
      color: 'bg-green-500'
    },
    {
      name: 'المكافآت المكتسبة',
      value: 4,
      icon: Gift,
      color: 'bg-purple-500'
    },
    {
      name: 'إجمالي الأرباح',
      value: '200 ريال',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const leaderboard = [
    { name: 'أحمد محمد', referrals: 25, position: 1 },
    { name: 'سارة أحمد', referrals: 22, position: 2 },
    { name: 'محمد علي', referrals: 18, position: 3 },
    { name: 'فاطمة خالد', referrals: 15, position: 4 },
    { name: 'أنت', referrals: 8, position: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            نظام الإحالة
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            ادع أصدقاءك واكسب مكافآت مع كل تسجيل ناجح
          </p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button 
            onClick={() => setShowQRModal(true)}
            className="btn-secondary flex items-center space-x-2 space-x-reverse"
          >
            <QrCode className="w-4 h-4" />
            <span>رمز QR</span>
          </button>
          <button 
            onClick={handleShare}
            className="btn-primary flex items-center space-x-2 space-x-reverse"
          >
            <Share2 className="w-4 h-4" />
            <span>مشاركة الرابط</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={cn("p-3 rounded-lg", stat.color)}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Link */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            رابط الإحالة الخاص بك
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                الرابط
              </label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="input-field flex-1 bg-neutral-50 dark:bg-neutral-800"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                كود الإحالة
              </label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="input-field flex-1 bg-neutral-50 dark:bg-neutral-800"
                />
                <button
                  onClick={handleCopyCode}
                  className="p-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4">
              <h3 className="font-medium text-accent-800 dark:text-accent-200 mb-2">
                🎁 المكافآت المتاحة
              </h3>
              <ul className="text-sm text-accent-700 dark:text-accent-300 space-y-1">
                <li>• 50 ريال لكل 5 تسجيلات ناجحة</li>
                <li>• خصم 20% على الاشتراك السنوي</li>
                <li>• ميزات إضافية مجانية</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            لوحة المتصدرين
          </h2>
          
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-center space-x-3 space-x-reverse p-3 rounded-lg",
                  user.name === 'أنت' 
                    ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                    : "bg-neutral-50 dark:bg-neutral-800"
                )}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold">
                  {user.position <= 3 ? (
                    <Trophy className="w-4 h-4" />
                  ) : (
                    user.position
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {user.name}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {user.referrals} إحالة
                  </p>
                </div>
                
                {user.position <= 3 && (
                  <Star className="w-5 h-5 text-accent-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Referral History */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            سجل الإحالات
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    البريد الإلكتروني
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    تاريخ الدعوة
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    المكافأة
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {referral.refereeEmail}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {new Date(referral.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        referral.status === 'completed' 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      )}>
                        {referral.status === 'completed' ? 'مكتملة' : 'في الانتظار'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {referral.reward ? referral.reward.description : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                رمز QR للإحالة
              </h3>
              
              <div className="w-48 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-neutral-400" />
              </div>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                امسح هذا الرمز للانضمام عبر رابط الإحالة الخاص بك
              </p>
              
              <div className="flex space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  إغلاق
                </button>
                <button className="flex-1 btn-primary">
                  تحميل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Referrals;
