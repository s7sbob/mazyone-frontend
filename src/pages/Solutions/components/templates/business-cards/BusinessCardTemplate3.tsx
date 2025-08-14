import React from 'react';
import { Phone, Mail, Globe, User } from 'lucide-react';

interface BusinessCardTemplate3Props {
  solutionType: string;
  data?: any;
}

const BusinessCardTemplate3: React.FC<BusinessCardTemplate3Props> = ({ data = {} }) => {
  return (
    <div className="w-full h-full bg-white p-8 flex flex-col justify-center">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          {data.profileImage ? (
            <img src={data.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        <h1 className="text-2xl font-light text-gray-900 mb-2">
          {data.fullName || 'أحمد محمد'}
        </h1>
        
        <p className="text-sm text-gray-600 mb-1">
          {data.jobTitle || 'مصمم جرافيك'}
        </p>
        
        {(data.company || 'استوديو الإبداع') && (
          <p className="text-sm font-medium text-blue-600">
            {data.company || 'استوديو الإبداع'}
          </p>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-4 text-center">
        {(data.email || 'ahmed@example.com') && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{data.email || 'ahmed@example.com'}</span>
          </div>
        )}
        
        {(data.phone || '+966 50 123 4567') && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{data.phone || '+966 50 123 4567'}</span>
          </div>
        )}
        
        {(data.website || 'https://portfolio.com') && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Globe className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{data.website?.replace('https://', '') || 'portfolio.com'}</span>
          </div>
        )}
      </div>

      {/* QR Code */}
      <div className="flex justify-center mt-8">
        <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-xs text-gray-400">QR</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardTemplate3;
