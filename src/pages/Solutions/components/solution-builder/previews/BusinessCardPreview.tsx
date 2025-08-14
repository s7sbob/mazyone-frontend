import React from 'react';
import { Phone, Mail, Globe, MapPin, Building, User, Linkedin, Twitter } from 'lucide-react';

interface BusinessCardPreviewProps {
  data: any;
  config: any;
}

const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({ data, config }) => {
  const design = data.design || {};
  const primaryColor = design.primaryColor || '#3B82F6';
  const secondaryColor = design.secondaryColor || '#EFF6FF';
  const layout = design.layout || 'modern';

  const renderModernLayout = () => (
    <div 
      className="h-full bg-white relative overflow-hidden"
      style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}
    >
      {/* Header Section */}
      <div 
        className="h-32 relative"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        <div className="absolute bottom-4 right-4 left-4">
          <div className="flex items-end space-x-4 space-x-reverse">
            {data.profileImage ? (
              <img 
                src={data.profileImage} 
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1 text-white">
              <h1 className="text-lg font-bold mb-1">
                {data.fullName || 'الاسم الكامل'}
              </h1>
              {data.jobTitle && (
                <p className="text-sm opacity-90">{data.jobTitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Company */}
        {data.company && (
          <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
            <Building className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
            <span className="text-sm">{data.company}</span>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-3">
          {data.phone && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
              <span className="text-sm">{data.phone}</span>
            </div>
          )}
          
          {data.email && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Mail className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
              <span className="text-sm">{data.email}</span>
            </div>
          )}
          
          {data.website && (
            <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
              <Globe className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
              <span className="text-sm">{data.website.replace('https://', '')}</span>
            </div>
          )}
          
          {data.address && (
            <div className="flex items-start space-x-3 space-x-reverse text-gray-700">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
              <span className="text-sm">{data.address}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {data.bio && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed">{data.bio}</p>
          </div>
        )}

        {/* Social Links */}
        <div className="flex items-center space-x-4 space-x-reverse pt-2">
          {data.linkedin && (
            <Linkedin className="w-5 h-5 text-blue-600" />
          )}
          {data.twitter && (
            <Twitter className="w-5 h-5 text-blue-400" />
          )}
        </div>
      </div>
    </div>
  );

  const renderClassicLayout = () => (
    <div 
      className="h-full bg-white p-6 text-center"
      style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}
    >
      {/* Profile */}
      <div className="mb-6">
        {data.profileImage ? (
          <img 
            src={data.profileImage} 
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4"
            style={{ borderColor: primaryColor }}
          />
        ) : (
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-4"
            style={{ borderColor: primaryColor, backgroundColor: secondaryColor }}
          >
            <User className="w-10 h-10" style={{ color: primaryColor }} />
          </div>
        )}
        
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {data.fullName || 'الاسم الكامل'}
        </h1>
        
        {data.jobTitle && (
          <p className="text-sm font-medium mb-1" style={{ color: primaryColor }}>
            {data.jobTitle}
          </p>
        )}
        
        {data.company && (
          <p className="text-sm text-gray-600">{data.company}</p>
        )}
      </div>

      {/* Contact Grid */}
      <div className="space-y-3 text-right">
        {data.phone && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Phone className="w-4 h-4" style={{ color: primaryColor }} />
            <span className="text-sm text-gray-700">{data.phone}</span>
          </div>
        )}
        
        {data.email && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Mail className="w-4 h-4" style={{ color: primaryColor }} />
            <span className="text-sm text-gray-700">{data.email}</span>
          </div>
        )}
        
        {data.website && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Globe className="w-4 h-4" style={{ color: primaryColor }} />
            <span className="text-sm text-gray-700">{data.website.replace('https://', '')}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderMinimalLayout = () => (
    <div 
      className="h-full bg-white p-8"
      style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            {data.fullName || 'الاسم الكامل'}
          </h1>
          {data.jobTitle && (
            <p className="text-sm text-gray-600 mb-1">{data.jobTitle}</p>
          )}
          {data.company && (
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {data.company}
            </p>
          )}
        </div>

        <div className="space-y-2 text-right">
          {data.email && (
            <p className="text-sm text-gray-700">{data.email}</p>
          )}
          {data.phone && (
            <p className="text-sm text-gray-700">{data.phone}</p>
          )}
          {data.website && (
            <p className="text-sm text-gray-700">{data.website}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      {layout === 'classic' && renderClassicLayout()}
      {layout === 'minimal' && renderMinimalLayout()}
      {(layout === 'modern' || !layout) && renderModernLayout()}
    </div>
  );
};

export default BusinessCardPreview;
