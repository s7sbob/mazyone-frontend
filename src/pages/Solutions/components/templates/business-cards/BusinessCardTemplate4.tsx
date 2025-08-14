import React from 'react';
import { Phone, Mail, Globe, MapPin, User, Crown } from 'lucide-react';

interface BusinessCardTemplate4Props {
  solutionType: string;
  data?: any;
}

const BusinessCardTemplate4: React.FC<BusinessCardTemplate4Props> = ({ data = {} }) => {
  // استخدام الألوان المخصصة للتيمبليت الفاخر
  const goldColor = data.primaryColor || '#F59E0B';
  const accentColor = data.accentColor || '#EAB308';

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Golden Accents */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-20"
          style={{ background: `linear-gradient(135deg, ${goldColor} 0%, transparent 100%)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12 opacity-20"
          style={{ background: `linear-gradient(45deg, ${accentColor} 0%, transparent 100%)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col text-white">
        {/* Header with Crown */}
        <div className="flex items-center justify-between mb-6">
          <Crown className="w-6 h-6" style={{ color: goldColor }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: goldColor }}></div>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <div 
              className="w-16 h-16 rounded-full p-0.5"
              style={{ background: `linear-gradient(45deg, ${goldColor} 0%, ${accentColor} 100%)` }}
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                {data.profileImage ? (
                  <img src={data.profileImage} alt="Profile" className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8" style={{ color: goldColor }} />
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1" style={{ color: goldColor }}>
                {data.fullName || 'أحمد محمد السعيد'}
              </h1>
              <p className="text-sm text-gray-300">
                {data.title || data.jobTitle || 'مطور واجهات أمامية'}
              </p>
              {(data.company || 'شركة التقنيات المتقدمة') && (
                <p className="text-xs text-gray-400 mt-1">
                  {data.company || 'شركة التقنيات المتقدمة'}
                </p>
              )}
              {data.department && (
                <p className="text-xs text-gray-400">{data.department}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info with Golden Icons */}
        <div className="space-y-4 flex-1">
          {(data.phone || data.mobile || '+966 50 123 4567') && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(45deg, ${goldColor} 0%, ${accentColor} 100%)` }}
              >
                <Phone className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-sm text-gray-300">{data.phone || data.mobile || '+966 50 123 4567'}</span>
            </div>
          )}
          
          {(data.email || 'ahmed@company.com') && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(45deg, ${goldColor} 0%, ${accentColor} 100%)` }}
              >
                <Mail className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-sm text-gray-300">{data.email || 'ahmed@company.com'}</span>
            </div>
          )}
          
          {(data.website || 'www.company.com') && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(45deg, ${goldColor} 0%, ${accentColor} 100%)` }}
              >
                <Globe className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-sm text-gray-300">{data.website?.replace('https://', '') || 'www.company.com'}</span>
            </div>
          )}
          
          {data.address && (
            <div className="flex items-start space-x-3 space-x-reverse">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(45deg, ${goldColor} 0%, ${accentColor} 100%)` }}
              >
                <MapPin className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-xs text-gray-400 leading-relaxed">{data.address}</span>
            </div>
          )}
        </div>

        {/* QR Code with Golden Frame */}
        <div className="flex justify-end">
          <div 
            className="w-20 h-20 rounded-lg p-1"
            style={{ background: `linear-gradient(45deg, ${goldColor} 0%, ${accentColor} 100%)` }}
          >
            <div className="w-full h-full bg-gray-900 rounded flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-700 rounded mb-1 mx-auto"></div>
                <div className="text-xs" style={{ color: goldColor }}>QR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardTemplate4;
