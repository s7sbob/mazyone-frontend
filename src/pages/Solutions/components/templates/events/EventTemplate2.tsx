import React from 'react';
import { Calendar, Clock, MapPin, Crown, Star, Sparkles } from 'lucide-react';

interface EventTemplate2Props {
  solutionType: string;
  data?: any;
}

const EventTemplate2: React.FC<EventTemplate2Props> = ({ data = {} }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-y-auto">
      {/* Elegant Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-yellow-500 to-gold-600 opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-5"></div>
        
        <div className="relative p-6 text-center">
          <div className="mb-4">
            <Crown className="w-8 h-8 text-gold-400 mx-auto mb-2" />
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-medium text-gold-400 tracking-wider">حفل رسمي حصري</span>
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-serif font-bold mb-3 leading-tight">
            {data.eventName || 'حفل تكريم رواد الأعمال'}
          </h1>
          
          <p className="text-sm opacity-90 mb-6">
            ليلة استثنائية لتكريم أبرز الشخصيات
          </p>

          {/* Event Badge */}
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-gold-400 to-yellow-500 text-black font-bold rounded-full text-sm">
            بدعوة خاصة فقط
          </div>
        </div>
      </div>

      {/* Elegant Details */}
      <div className="p-6 space-y-6">
        {/* Date & Time with Gold Accents */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-gold-400 to-yellow-500 p-0.5 rounded-lg">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Calendar className="w-6 h-6 text-gold-400" />
                <div>
                  <p className="text-sm text-gray-300">تاريخ الحفل</p>
                  <p className="font-semibold text-white">
                    {data.eventDate ? new Date(data.eventDate).toLocaleDateString('ar-SA', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'السبت، 20 يناير 2024'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gold-400 to-yellow-500 p-0.5 rounded-lg">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock className="w-6 h-6 text-gold-400" />
                <div>
                  <p className="text-sm text-gray-300">وقت البداية</p>
                  <p className="font-semibold text-white">
                    {data.eventTime ? new Date(`2000-01-01T${data.eventTime}`).toLocaleTimeString('ar-SA', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }) : '7:00 مساءً'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="bg-purple-900 bg-opacity-50 p-4 rounded-lg border border-purple-700">
          <div className="flex items-start space-x-3 space-x-reverse">
            <MapPin className="w-6 h-6 text-purple-300 mt-1" />
            <div>
              <h4 className="font-semibold text-purple-100 mb-1">المكان</h4>
              <p className="text-sm text-purple-200">
                {data.eventLocation || 'فندق الريتز كارلتون الرياض'}
              </p>
              <p className="text-xs text-purple-300 mt-1">
                القاعة الملكية - الطابق الثاني
              </p>
            </div>
          </div>
        </div>

        {/* Event Program */}
        <div>
          <h3 className="text-lg font-semibold text-gold-400 mb-4 flex items-center space-x-2 space-x-reverse">
            <Star className="w-5 h-5" />
            <span>برنامج الحفل</span>
          </h3>
          
          <div className="space-y-3">
            {[
              { time: '7:00 م', event: 'استقبال الضيوف وكوكتيل ترحيبي' },
              { time: '7:30 م', event: 'كلمة افتتاحية من راعي الحفل' },
              { time: '8:00 م', event: 'تكريم رواد الأعمال المميزين' },
              { time: '9:00 م', event: 'عشاء راقي على شرف المكرمين' },
              { time: '10:30 م', event: 'فقرة ترفيهية خاصة' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 space-x-reverse">
                <div className="w-16 text-xs text-gold-400 font-medium mt-1">
                  {item.time}
                </div>
                <div className="flex-1 text-sm text-gray-300">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dress Code */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-gold-400 mb-2">قواعد اللباس</h4>
          <p className="text-sm text-gray-300">
            اللباس الرسمي مطلوب - بدلة رسمية أو ثوب تقليدي أنيق
          </p>
        </div>

        {/* RSVP */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-lg text-center">
            <h4 className="font-bold mb-1">تأكيد الحضور مطلوب</h4>
            <p className="text-sm opacity-90">يرجى التأكيد قبل 15 يناير</p>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-gold-400 to-yellow-500 text-black font-bold rounded-lg text-lg">
            تأكيد الحضور
          </button>
          
          <div className="text-center text-xs text-gray-400">
            للاستفسارات: +966 11 123 4567
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTemplate2;
