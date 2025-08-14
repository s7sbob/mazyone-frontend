import React from 'react';
import { Send, Mail, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';

interface FormPreviewProps {
  data: any;
  config: any;
}

const FormPreview: React.FC<FormPreviewProps> = ({ data, config }) => {
  const design = data.design || {};
  const primaryColor = design.primaryColor || '#8B5CF6';
  const layout = design.layout || 'single';

  const renderSinglePageLayout = () => (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="p-6 text-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {data.formTitle || 'عنوان النموذج'}
        </h1>
        {data.formDescription && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.formDescription}
          </p>
        )}
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل *
          </label>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          />
        </div>

        {/* Email Field */}
        {data.collectEmail !== 'لا' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              />
            </div>
          </div>
        )}

        {/* Phone Field */}
        {data.collectPhone !== 'لا' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="+966 50 123 4567"
                className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              />
            </div>
          </div>
        )}

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تقييم الخدمة
          </label>
          <div className="flex items-center space-x-2 space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-medium transition-colors"
                style={{ 
                  borderColor: star <= 4 ? primaryColor : '#e5e7eb',
                  backgroundColor: star <= 4 ? primaryColor : 'transparent',
                  color: star <= 4 ? 'white' : '#6b7280'
                }}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ملاحظاتك وآرائك
          </label>
          <div className="relative">
            <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              placeholder="شاركنا رأيك وتجربتك..."
              rows={4}
              className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
            />
          </div>
        </div>

        {/* Multiple Choice */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            كيف سمعت عنا؟
          </label>
          <div className="space-y-2">
            {['وسائل التواصل الاجتماعي', 'من صديق', 'إعلانات جوجل', 'محرك البحث', 'أخرى'].map((option) => (
              <label key={option} className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                <input
                  type="radio"
                  name="source"
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                  style={{ accentColor: primaryColor }}
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 space-x-reverse transition-colors"
            style={{ backgroundColor: primaryColor }}
          >
            <Send className="w-5 h-5" />
            <span>إرسال النموذج</span>
          </button>
        </div>

        {/* Success Message Preview */}
        {data.successMessage && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {data.successMessage}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMultiStepLayout = () => (
    <div className="h-full bg-white">
      {/* Progress Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">الخطوة 1 من 3</span>
          <span className="text-sm text-gray-500">33%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300" 
            style={{ backgroundColor: primaryColor, width: '33%' }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          المعلومات الأساسية
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الكامل *
            </label>
            <input
              type="text"
              placeholder="أدخل اسمك الكامل"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg">
            السابق
          </button>
          <button 
            className="px-6 py-2 text-white rounded-lg"
            style={{ backgroundColor: primaryColor }}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full" style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}>
      {layout === 'multi-step' ? renderMultiStepLayout() : renderSinglePageLayout()}
    </div>
  );
};

export default FormPreview;
