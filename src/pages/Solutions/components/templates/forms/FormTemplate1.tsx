import React from 'react';
import { Send, Star, MessageSquare, User, Mail, Phone } from 'lucide-react';

interface FormTemplate1Props {
  solutionType: string;
  data?: any;
}

const FormTemplate1: React.FC<FormTemplate1Props> = ({ data = {} }) => {
  // استخدام الألوان المخصصة
  const primaryColor = data.primaryColor || '#3B82F6';
  const accentColor = data.accentColor || '#10B981';
  const backgroundColor = data.backgroundColor || '#F8FAFC';

  return (
    <div className="w-full h-full overflow-y-auto" style={{ backgroundColor }}>
      {/* Header */}
      <div 
        className="text-white p-6 text-center"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)` }}
      >
        <h1 className="text-xl font-bold mb-2">
          {data.formTitle || 'استطلاع رضا العملاء'}
        </h1>
        <p className="text-sm opacity-90">
          {data.formDescription || 'ساعدنا في تحسين خدماتنا من خلال مشاركة آرائك القيمة'}
        </p>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        {/* Name Field */}
        {data.collectName !== false && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              الاسم الكامل *
            </label>
            <div className="relative">
              <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent bg-white"
                style={{ '--tw-ring-color': primaryColor } as any}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
          </div>
        )}

        {/* Email Field */}
        {data.collectEmail !== false && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              البريد الإلكتروني *
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent bg-white"
                style={{ '--tw-ring-color': primaryColor } as any}
                placeholder="example@email.com"
              />
            </div>
          </div>
        )}

        {/* Phone Field */}
        {data.collectPhone === true && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              رقم الهاتف
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent bg-white"
                style={{ '--tw-ring-color': primaryColor } as any}
                placeholder="+966 50 123 4567"
              />
            </div>
          </div>
        )}

        {/* Company Field */}
        {data.collectCompany === true && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم الشركة/المؤسسة
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent bg-white"
              style={{ '--tw-ring-color': primaryColor } as any}
              placeholder="اسم الشركة"
            />
          </div>
        )}

        {/* Rating */}
        {data.collectRating !== false && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              تقييم الخدمة
            </label>
            <div className="flex items-center space-x-2 space-x-reverse">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  style={{ borderColor: accentColor }}
                >
                  <Star className="w-5 h-5" style={{ color: accentColor }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message */}
        {data.collectMessage !== false && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ملاحظاتك وآرائك
            </label>
            <div className="relative">
              <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent bg-white resize-none"
                style={{ '--tw-ring-color': primaryColor } as any}
                rows={4}
                placeholder="شاركنا رأيك وتجربتك..."
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button 
          className="w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 space-x-reverse shadow-lg hover:shadow-xl transition-shadow"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)` }}
        >
          <Send className="w-5 h-5" />
          <span>{data.submitButtonText || 'إرسال النموذج'}</span>
        </button>

        {/* Success Message Preview */}
        {data.successMessage && (
          <div 
            className="mt-6 p-4 border rounded-lg"
            style={{ 
              backgroundColor: `${accentColor}10`, 
              borderColor: accentColor 
            }}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm font-medium" style={{ color: accentColor }}>
                {data.successMessage}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            شكراً لوقتك الثمين في مشاركة آرائك معنا
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate1;
