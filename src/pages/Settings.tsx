import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  Save,
  Link
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, darkMode, toggleDarkMode, logout } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', name: 'الملف الشخصي', icon: User },
    { id: 'security', name: 'الأمان', icon: Shield },
    { id: 'preferences', name: 'التفضيلات', icon: Palette },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'privacy', name: 'الخصوصية', icon: Lock },
    { id: 'account', name: 'إدارة الحساب', icon: Trash2 }
  ];

  const handleSave = () => {
    toast.success('تم حفظ التغييرات بنجاح!');
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }
    toast.success('تم تغيير كلمة المرور بنجاح!');
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('هل أنت متأكد من حذف حسابك نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      if (window.confirm('تأكيد أخير: سيتم حذف جميع بياناتك وبطاقاتك نهائياً.')) {
        toast.success('تم حذف الحساب. سيتم تسجيل خروجك الآن.');
        setTimeout(() => logout(), 2000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          الإعدادات
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          إدارة حسابك وتخصيص تجربتك
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary-500 text-white"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                  المعلومات الشخصية
                </h2>
                
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                        <Camera className="w-4 h-4" />
                        <span>تغيير الصورة</span>
                      </button>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        PNG أو JPG، الحد الأقصى 2MB
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        الشركة
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      نبذة تعريفية
                    </label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="input-field"
                      placeholder="اكتب نبذة مختصرة عنك..."
                    />
                  </div>

                  <button onClick={handleSave} className="btn-primary">
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                  الأمان
                </h2>
                
                <div className="space-y-6">
                  {/* Change Password */}
                  <div>
                    <h3 className="text-md font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                      تغيير كلمة المرور
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          كلمة المرور الحالية
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className="input-field pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          كلمة المرور الجديدة
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          تأكيد كلمة المرور الجديدة
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="input-field"
                        />
                      </div>

                      <button onClick={handlePasswordChange} className="btn-primary">
                        تغيير كلمة المرور
                      </button>
                    </div>
                  </div>

                  {/* Two Factor Authentication */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <h3 className="text-md font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                      المصادقة الثنائية
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          تأمين إضافي لحسابك
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          ستحتاج لرمز من هاتفك عند تسجيل الدخول
                        </p>
                      </div>
                      <button className="btn-secondary">
                        تفعيل
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                  التفضيلات
                </h2>
                
                <div className="space-y-6">
                  {/* Dark Mode */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        الوضع الليلي
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        تبديل بين الوضع الفاتح والداكن
                      </p>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        darkMode ? "bg-primary-500" : "bg-neutral-300"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          darkMode ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      اللغة
                    </label>
                    <select className="input-field w-full sm:w-auto">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      المنطقة الزمنية
                    </label>
                    <select className="input-field w-full sm:w-auto">
                      <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                      <option value="Asia/Dubai">دبي (GMT+4)</option>
                      <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                  إدارة الحساب
                </h2>
                <div className="card">
  <h3>إدارة الاشتراك</h3>
  <Link to="/subscription" className="btn-primary">
    عرض الباقات وترقية الحساب
  </Link>
</div>
                <div className="space-y-6">
                  {/* Export Data */}
                  <div>
                    <h3 className="text-md font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                      تصدير البيانات
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      احصل على نسخة من جميع بياناتك
                    </p>
                    <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                      <Download className="w-4 h-4" />
                      <span>تصدير البيانات</span>
                    </button>
                  </div>

                  {/* Delete Account */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <h3 className="text-md font-medium text-red-600 dark:text-red-400 mb-4">
                      حذف الحساب
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      حذف حسابك نهائياً مع جميع البيانات والبطاقات. هذا الإجراء لا يمكن التراجع عنه.
                    </p>
                    <button 
                      onClick={handleDeleteAccount}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 space-x-reverse"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>حذف الحساب نهائياً</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
