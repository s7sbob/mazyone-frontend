import React from 'react';
import { Calendar, Clock, MapPin, Users, Star, Bookmark, Share2, Award, Phone, Mail } from 'lucide-react';

interface EventTemplate1Props {
  solutionType: string;
  data?: any;
}

const EventTemplate1: React.FC<EventTemplate1Props> = ({ data = {} }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'الأحد، 15 ديسمبر 2024';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '10:00 صباحاً';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      {/* Event Hero */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="absolute top-4 right-4 z-10 flex space-x-2 space-x-reverse">
          <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full backdrop-blur-sm flex items-center justify-center">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 pb-8">
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full mb-4">
              {data.eventType || 'مؤتمر تقني'}
            </div>
            <h1 className="text-xl font-bold mb-2 leading-tight">
              {data.eventName || 'مؤتمر التكنولوجيا والذكاء الاصطناعي 2024'}
            </h1>
            <p className="text-sm opacity-90">
              {data.eventSubtitle || 'أكبر تجمع تقني في المنطقة'}
            </p>
          </div>

          {/* Event Stats */}
          <div className="flex items-center justify-center space-x-6 space-x-reverse text-center">
            <div>
              <div className="text-2xl font-bold">{data.maxAttendees || '500'}+</div>
              <div className="text-xs opacity-75">مشارك</div>
            </div>
            <div className="w-px h-8 bg-white bg-opacity-30"></div>
            <div>
              <div className="text-2xl font-bold">{data.speakers?.length || '20'}+</div>
              <div className="text-xs opacity-75">متحدث</div>
            </div>
            <div className="w-px h-8 bg-white bg-opacity-30"></div>
            <div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs opacity-75">ساعات</div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-6">
        {/* Date & Time Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">التاريخ</span>
            </div>
            <p className="text-sm text-blue-800 font-medium">
              {formatDate(data.eventDate)}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">الوقت</span>
            </div>
            <p className="text-sm text-green-800 font-medium">
              {formatTime(data.eventTime)}
              {data.eventEndTime && ` - ${formatTime(data.eventEndTime)}`}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3 space-x-reverse">
            <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">الموقع</h4>
              <p className="text-sm text-gray-700">
                {data.eventLocation || 'مركز الرياض الدولي للمؤتمرات والمعارض'}
              </p>
              {data.venue && (
                <p className="text-sm text-gray-600 mt-1">{data.venue}</p>
              )}
              {data.address && (
                <p className="text-xs text-gray-500 mt-1">{data.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Event Description */}
        {data.eventDescription && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">حول المؤتمر</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {data.eventDescription}
            </p>
          </div>
        )}

        {/* Agenda */}
        {data.agenda && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">جدول المؤتمر</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                {data.agenda}
              </div>
            </div>
          </div>
        )}

        {/* Key Topics */}
        {data.topics && Array.isArray(data.topics) && data.topics.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">المحاور الرئيسية</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.topics.map((topic: string, index: number) => (
                topic.trim() && (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-center text-sm font-medium">
                    {topic.trim()}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Speakers Preview */}
        {data.speakers && Array.isArray(data.speakers) && data.speakers.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">المتحدثون المميزون</h3>
            <div className="space-y-2">
              {data.speakers.slice(0, 3).map((speaker: string, index: number) => (
                speaker.trim() && (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{speaker.trim()}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Organizer Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">معلومات التنظيم</h4>
          <div className="space-y-2 text-sm text-blue-800">
            {data.organizer && (
              <p><span className="font-medium">المنظم:</span> {data.organizer}</p>
            )}
            {data.sponsors && Array.isArray(data.sponsors) && (
              <div>
                <span className="font-medium">الرعاة:</span>
                <div className="mt-1">
                  {data.sponsors.map((sponsor: string, index: number) => (
                    sponsor.trim() && (
                      <span key={index} className="inline-block bg-white px-2 py-1 rounded text-xs mr-1 mb-1">
                        {sponsor.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Registration */}
        <div className="space-y-3">
          {data.registrationRequired !== false && (
            <div className={`p-4 rounded-lg border ${
              data.registrationFee && data.registrationFee > 0
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  data.registrationFee && data.registrationFee > 0 ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  data.registrationFee && data.registrationFee > 0 ? 'text-yellow-800' : 'text-green-800'
                }`}>
                  {data.registrationFee && data.registrationFee > 0 
                    ? `رسوم التسجيل: ${data.registrationFee} ر.س`
                    : 'التسجيل مجاني'
                  }
                </span>
              </div>
              {data.maxAttendees && (
                <p className="text-xs text-gray-600">العدد محدود: {data.maxAttendees} مشارك فقط!</p>
              )}
              {data.registrationDeadline && (
                <p className="text-xs text-gray-600">آخر موعد للتسجيل: {formatDate(data.registrationDeadline)}</p>
              )}
            </div>
          )}

          {data.registrationLink ? (
            <a
              href={data.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg text-center"
            >
              سجل الآن
            </a>
          ) : (
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg">
              سجل الآن مجاناً
            </button>
          )}
          
          <div className="flex space-x-2 space-x-reverse">
            <button className="flex-1 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg">
              إضافة للتقويم
            </button>
            <button className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg">
              مشاركة
            </button>
          </div>
        </div>

        {/* Contact Information */}
        {(data.contactEmail || data.contactPhone) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">للاستفسارات</h4>
            <div className="space-y-1 text-sm text-gray-700">
              {data.contactEmail && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{data.contactEmail}</span>
                </div>
              )}
              {data.contactPhone && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{data.contactPhone}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTemplate1;
