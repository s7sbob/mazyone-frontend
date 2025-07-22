/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // الألوان الأساسية المحددة من العميل
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#006BE3', // الأزرار/الروابط الرئيسية - أزرق
          600: '#005BB5',
          700: '#004A94',
          800: '#003973',
          900: '#002952',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#7EDDB9', // الأزرار الثانوية/المساندة - تركوازي
          600: '#6BC7A8',
          700: '#059669',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#FACC15', // التنبيهات/التمييز - أصفر
          600: '#F1C40F',
          700: '#a16207',
          800: '#92400e',
          900: '#78350f',
        },
        cta: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#E1841F', // أزرار الحث على الإجراء - برتقالي
          600: '#D4751A',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        neutral: {
          50: '#F5F5F5',   // الخلفية الثانوية - رمادي فاتح
          100: '#EDEDED',  // الخلفية الثانوية - رمادي فاتح
          200: '#E0E0E0',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#444444',  // النصوص الثانوية - رمادي
          700: '#374151',
          800: '#2D2D2D',  // النصوص الأساسية - رمادي غامق
          900: '#1E1E1E',
        },
        white: '#FFFFFF',  // الخلفية الرئيسية - أبيض نقي
      },
      fontFamily: {
        'arabic': ['Cairo', 'sans-serif'],
        'latin': ['Poppins', 'sans-serif'],
        'sans': ['Cairo', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
