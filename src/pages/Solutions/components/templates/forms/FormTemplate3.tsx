import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

interface FormTemplate3Props {
  solutionType: string;
  data?: any;
}

const FormTemplate3: React.FC<FormTemplate3Props> = ({ data = {} }) => {
  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.formTitle || 'تواصل معنا'}
        </h1>
        <p className="text-gray-600">
          {data.formDescription || 'نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border text-center">
            <Phone className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">هاتف</div>
            <div className="text-xs text-gray-600">+966 50 123 4567</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border text-center">
            <Mail className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">إيميل</div>
            <div className="text-xs text-gray-600">info@company.com</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">أرسل رسالة</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أحمد"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="محمد"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ahmed@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الموضوع
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>استفسار عام</option>
                <option>دعم تقني</option>
                <option>شكوى</option>
                <option>اقتراح</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرسالة
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="اكتب رسالتك هنا..."
              />
            </div>

            <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
              <Send className="w-4 h-4" />
              <span>إرسال الرسالة</span>
            </button>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2 space-x-reverse mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium text-gray-900">ساعات العمل</h4>
          </div>
          
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>السبت - الأربعاء</span>
              <span>9:00 ص - 6:00 م</span>
            </div>
            <div className="flex justify-between">
              <span>الخميس</span>
              <span>9:00 ص - 3:00 م</span>
            </div>
            <div className="flex justify-between">
              <span>الجمعة</span>
              <span>مغلق</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate3;
