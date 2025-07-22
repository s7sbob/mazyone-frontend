import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import AuthIllustration from '../assets/auth-illustration.svg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useStore();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: 'ahmed@example.com',
    password: 'password',
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/dashboard');
    } catch {
      toast.error('بيانات غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col justify-center" dir="rtl">
      {/* الصف الأول: الشعار والترحيب + العنوان والوصف */}
      <div className="hidden lg:flex flex-row w-full items-start justify-center pt-16 pb-4 px-8">
        {/* يمين: الشعار والترحيب */}
        <div className="flex flex-col items-center justify-start w-1/2">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #006BE3 0%, #7EDDB9 100%)' }}>
            <span className="text-white font-bold text-3xl">M</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
            مرحباً بك في عالم مَزيون
          </h1>
        </div>
        {/* يسار: العنوان والوصف */}
        <div className="flex flex-col items-center justify-start w-1/2">
          <h2 className="font-inter text-6xl font-bold text-black dark:text-white mb-4 mt-0 text-center w-full">
            Mazyone
          </h2>
          <p className="font-inter text-xl text-neutral-600 dark:text-neutral-400 mb-0 text-center w-full">
            The smart digital identity platform that<br />
            empowers professionals to connect, share, and grow.
          </p>
        </div>
      </div>

      {/* الصف الثاني: نموذج تسجيل الدخول + الصورة */}
      <div className="flex flex-col lg:flex-row w-full flex-1 items-stretch justify-center">
        {/* يمين: نموذج تسجيل الدخول */}
        <div className="flex items-start justify-center w-full lg:w-1/2 p-6">
          <div className="w-full max-w-md mt-0 lg:mt-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl border"
            >
              <header className="text-center space-y-2 mb-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  تسجيل الدخول
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-base">
                  أدخل بياناتك للوصول إلى حسابك
                </p>
              </header>
              {/* email */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  البريد الإلكترونى
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field pr-10"
                  />
                </div>
              </div>

              {/* password */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="input-field pr-10 pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* remember & submit */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) =>
                      setForm({ ...form, remember: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span>تذكرنى</span>
                </label>

                <a href="#" className="text-primary-500 text-sm hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'جارى الدخول...' : 'دخول'}
              </button>

              <p className="text-sm text-center">
                ليس لديك حساب؟{' '}
                <a href="/register" className="text-primary-500 hover:underline">
                  إنشاء حساب جديد
                </a>
              </p>
            </form>
          </div>
        </div>
        {/* يسار: الصورة */}
        <div className="hidden lg:flex items-start justify-center w-1/2 pt-8 pl-8 h-full">
          <img
            src={AuthIllustration}
            alt="Authentication illustration"
            className="h-[calc(100vh-4rem)] max-h-screen w-auto object-contain"
            style={{ alignSelf: 'flex-start', height: 'calc(100vh - 4rem)', maxHeight: '100vh' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
