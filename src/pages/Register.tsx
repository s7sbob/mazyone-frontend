import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import AuthIllustration from '../assets/auth-illustration.svg';

const Register: React.FC = () => {
  const { registerUser } = useStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/dashboard');
    } catch {
      toast.error('حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* form */}
      <div className="flex items-center justify-center p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl border"
        >
          <header className="text-center space-y-2">
            <h1 className="text-3xl font-bold dark:text-neutral-100">إنشاء حساب</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              املأ البيانات التالية لإنشاء حسابك
            </p>
          </header>

          {/* name */}
          <div>
            <label className="block mb-2 text-sm font-medium">الاسم الكامل</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                required
                placeholder="أحمد محمد"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field pr-10"
              />
            </div>
          </div>

          {/* email */}
          <div>
            <label className="block mb-2 text-sm font-medium">البريد الإلكترونى</label>
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
            <label className="block mb-2 text-sm font-medium">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'جارى الإنشاء...' : 'تسجيل'}
          </button>

          <p className="text-sm text-center">
            لديك حساب بالفعل؟{' '}
            <a href="/login" className="text-primary-500 hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </form>
      </div>

{/* illustration side */}
<div className="hidden lg:block bg-neutral-50 dark:bg-neutral-800 relative">
  {/* النص أعلى الصورة */}
  <div className="absolute top-0 righ-0 w-full p-10 select-none">
    <h2 className="text-4xl font-extrabold text-primary-500 tracking-tight">
      Mazyon<span className="text-primary-500"></span>
    </h2>
    <p className="mt-2 text-lg max-w-xs text-neutral-600 dark:text-neutral-400">
      build your smart digital identity with&nbsp;Mazyon
    </p>
  </div>

  {/* الصورة نفسها */}
  <img
    src={AuthIllustration}
    alt="Authentication illustration"
    className="w-full h-full object-cover"
  />
</div>
    </div>
  );
};

export default Register;
