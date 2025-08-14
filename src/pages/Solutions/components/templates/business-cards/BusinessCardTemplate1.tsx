import React from 'react';
import { Phone, Mail, Globe, MapPin, Building, User, Linkedin, Twitter } from 'lucide-react';

interface BusinessCardTemplate1Props {
  solutionType: string;
  data?: any;
}

const BusinessCardTemplate1: React.FC<BusinessCardTemplate1Props> = ({ data = {} }) => {
  // استخدام الألوان من الـ config
  const primaryColor = data.primaryColor || '#3B82F6';
  const secondaryColor = data.secondaryColor || '#EFF6FF';

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: secondaryColor }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 border rounded-full" style={{ borderColor: primaryColor }} />
        <div className="absolute bottom-8 left-6 w-16 h-16 border rounded-full" style={{ borderColor: primaryColor }} />
        <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col text-white">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 space-x-reverse mb-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              {data.profileImage ? (
                <img src={data.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold leading-tight">
                {data.fullName || 'أحمد محمد السعيد'}
              </h1>
              <p className="text-sm opacity-90">
                {data.jobTitle || 'مطور واجهات أمامية'}
              </p>
            </div>
          </div>
          
          {(data.company || 'شركة التقنيات المتقدمة') && (
            <div className="flex items-center space-x-2 space-x-reverse text-sm opacity-90">
              <Building className="w-4 h-4" />
              <span>{data.company || 'شركة التقنيات المتقدمة'}</span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-white text-sm flex-1">
          {(data.phone || '+966 50 123 4567') && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <Phone className="w-4 h-4 opacity-80" />
              <span>{data.phone || '+966 50 123 4567'}</span>
            </div>
          )}
          
          {(data.email || 'ahmed@company.com') && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <Mail className="w-4 h-4 opacity-80" />
              <span>{data.email || 'ahmed@company.com'}</span>
            </div>
          )}
          
          {(data.website || 'www.company.com') && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <Globe className="w-4 h-4 opacity-80" />
              <span>{data.website?.replace('https://', '') || 'www.company.com'}</span>
            </div>
          )}
          
          {data.address && (
            <div className="flex items-start space-x-3 space-x-reverse">
              <MapPin className="w-4 h-4 opacity-80 mt-0.5" />
              <span className="leading-relaxed text-xs">{data.address}</span>
            </div>
          )}
        </div>

        {/* Social Links & QR */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex space-x-2 space-x-reverse">
            {data.linkedin && (
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                <Linkedin className="w-3 h-3 text-white" />
              </div>
            )}
            {data.twitter && (
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                <Twitter className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="text-xs text-white opacity-80 text-center">
              <div className="w-8 h-8 bg-white bg-opacity-30 rounded mb-1 mx-auto"></div>
              QR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardTemplate1;
