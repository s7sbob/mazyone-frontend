import React from 'react';
import { Phone, Mail, Globe, MapPin, Building, User } from 'lucide-react';

interface BusinessCardTemplate2Props {
  solutionType: string;
  data?: any;
}

const BusinessCardTemplate2: React.FC<BusinessCardTemplate2Props> = ({ data = {} }) => {
  return (
    <div className="w-full h-full bg-white border-2 border-gray-200 relative">
      {/* Header Section */}
      <div className="bg-gray-800 text-white p-6 h-32">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1">
              {data.fullName || 'أحمد محمد السعيد'}
            </h1>
            <p className="text-sm opacity-90">
              {data.jobTitle || 'مدير تنفيذي'}
            </p>
            {(data.company || 'الشركة المحدودة') && (
              <p className="text-xs opacity-75 mt-1">
                {data.company || 'الشركة المحدودة'}
              </p>
            )}
          </div>
          
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {data.profileImage ? (
              <img src={data.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-white opacity-80" />
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Contact Information */}
        <div className="space-y-3">
          {(data.phone || '+966 11 123 4567') && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">{data.phone || '+966 11 123 4567'}</span>
            </div>
          )}
          
          {(data.email || 'info@company.com') && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">{data.email || 'info@company.com'}</span>
            </div>
          )}
          
          {(data.website || 'www.company.com') && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">{data.website?.replace('https://', '') || 'www.company.com'}</span>
            </div>
          )}

          {data.fax && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">فاكس: {data.fax}</span>
            </div>
          )}
          
          {(data.address || 'ص.ب 1234، الرياض 11564، المملكة العربية السعودية') && (
            <div className="flex items-start space-x-3 space-x-reverse text-gray-700">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
              <span className="text-sm leading-relaxed">{data.address || 'ص.ب 1234، الرياض 11564، المملكة العربية السعودية'}</span>
            </div>
          )}
        </div>

        {/* Company Logo */}
        {data.companyLogo && (
          <div className="flex justify-center pt-2">
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              className="max-w-16 max-h-8 object-contain"
            />
          </div>
        )}

        {/* QR Code */}
        <div className="flex justify-center pt-4">
          <div className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 bg-gray-200 rounded mb-1 mx-auto"></div>
              <div className="text-xs">QR Code</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardTemplate2;
