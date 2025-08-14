import React from 'react';
import { Calendar, Clock, MapPin, Users, Share2, Bookmark, Star } from 'lucide-react';

interface EventPreviewProps {
  data: any;
  config: any;
}

const EventPreview: React.FC<EventPreviewProps> = ({ data, config }) => {
  const design = data.design || {};
  const primaryColor = design.primaryColor || '#F59E0B';

  const formatDate = (dateString: string) => {
    if (!dateString) return 'تاريخ الفعالية';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'وقت الفعالية';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto" style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}>
      {/* Event Hero */}
      <div className="relative">
        <div 
          className="h-40 bg-gradient-to-br flex items-end"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="relative p-4 text-white w-full">
            <h1 className="text-lg font-bold mb-1">
              {data.eventName || 'اسم الفعالية'}
            </h1>
            <p className="text-sm opacity-90">
              فعالية مميزة لا تفوتها
            </p>
          </div>
        </div>

        {/* Bookmark Button */}
        <button className="absolute top-4 left-4 p-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
          <Bookmark className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Event Details */}
      <div className="p-4 space-y-4">
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" style={{ color: primaryColor }} />
            <div>
              <p className="text-xs text-gray-500">التاريخ</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(data.eventDate)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5" style={{ color: primaryColor }} />
            <div>
              <p className="text-xs text-gray-500">الوقت</p>
              <p className="text-sm font-medium text-gray-900">
                {formatTime(data.eventTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        {data.eventLocation && (
          <div className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 mt-0.5" style={{ color: primaryColor }} />
            <div>
              <p className="text-xs text-gray-500">المكان</p>
              <p className="text-sm font-medium text-gray-900">
                {data.eventLocation}
              </p>
            </div>
          </div>
        )}

        {/* Event Stats */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Users className="w-5 h-5" style={{ color: primaryColor }} />
            <span className="text-sm font-medium">245 مشارك</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>

        {/* Event Description */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">حول الفعالية</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.eventDescription || 'انضم إلينا في هذه الفعالية المميزة التي تجمع أفضل الخبراء والمتخصصين في المجال. ستتعلم أحدث الاتجاهات والتقنيات، وستتاح لك فرصة التواصل مع المحترفين من مختلف أنحاء العالم.'}
          </p>
        </div>

        {/* Event Highlights */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">أبرز النقاط</h3>
          <div className="space-y-2">
            {[
              'محاضرات من خبراء عالميين',
              'ورش عمل تفاعلية',
              'فرص شبكات مهنية',
              'شهادة مشاركة',
              'وجبات خفيفة ومشروبات'
            ].map((highlight, index) => (
              <div key={index} className="flex items-start space-x-2 space-x-reverse">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                <span className="text-sm text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Speakers */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">المتحدثون</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            {[1, 2, 3].map((speaker) => (
              <div key={speaker} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mb-1" />
                <p className="text-xs text-gray-600">متحدث {speaker}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button 
            className="w-full py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: primaryColor }}
          >
            تسجيل الحضور
          </button>
          
          <div className="flex space-x-3 space-x-reverse">
            <button className="flex-1 py-3 rounded-lg border-2 font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              <Calendar className="w-5 h-5" />
              <span>إضافة للتقويم</span>
            </button>
            
            <button className="flex-1 py-3 rounded-lg border-2 font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              <Share2 className="w-5 h-5" />
              <span>مشاركة</span>
            </button>
          </div>
        </div>

        {/* Event Organizer */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <p className="text-sm font-medium text-gray-900">منظم الفعالية</p>
              <p className="text-xs text-gray-600">شركة الفعاليات المتقدمة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
