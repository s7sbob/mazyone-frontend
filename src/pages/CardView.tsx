import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  QrCode, 
  Edit, 
  Eye, 
  Download,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const CardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cards } = useStore();
  const [showQR, setShowQR] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const card = cards.find(c => c.id === id);

  useEffect(() => {
    if (!card) {
      toast.error('البطاقة غير موجودة');
      navigate('/cards');
    }
  }, [card, navigate]);

  if (!card) return null;

  const handleShare = async () => {
    const shareData = {
      title: `بطاقة ${card.name}`,
      text: `تعرف على ${card.name} - ${card.title}`,
      url: `${window.location.origin}/card/${card.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success('تم نسخ الرابط بنجاح!');
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
ORG:${card.company || ''}
TITLE:${card.title}
TEL:${card.phone || ''}
EMAIL:${card.email || ''}
URL:${card.website || ''}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.name}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigate('/cards')}
              className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {card.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                {card.title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={() => setShowQR(true)}
              className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <QrCode className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <Share2 className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={() => navigate(`/cards/${card.id}/edit`)}
              className="btn-primary flex items-center space-x-2 space-x-reverse"
            >
              <Edit className="w-4 h-4" />
              <span>تعديل</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Preview */}
          <div className="lg:col-span-2">
            <div className="card">
              <div 
                className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-lg p-8"
                style={{ borderTop: `4px solid ${card.colors.primary}` }}
              >
                {/* Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                    {card.avatar ? (
                      <img 
                        src={card.avatar} 
                        alt={card.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-neutral-600 dark:text-neutral-400">
                        {card.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    {card.name}
                  </h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
                    {card.title}
                  </p>
                  {card.company && (
                    <p className="text-neutral-500 dark:text-neutral-500">
                      {card.company}
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-4 mb-6">
                  {card.phone && (
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">الهاتف</p>
                        <p className="text-neutral-900 dark:text-neutral-100">{card.phone}</p>
                      </div>
                    </div>
                  )}

                  {card.email && (
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">البريد الإلكتروني</p>
                        <p className="text-neutral-900 dark:text-neutral-100">{card.email}</p>
                      </div>
                    </div>
                  )}

                  {card.website && (
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">الموقع الإلكتروني</p>
                        <p className="text-neutral-900 dark:text-neutral-100">{card.website}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {card.socialLinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      التواصل الاجتماعي
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {card.socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {link.platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Fields */}
                {card.customFields.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      معلومات إضافية
                    </h3>
                    <div className="space-y-3">
                      {card.customFields.map((field) => (
                        <div key={field.id} className="flex justify-between">
                          <span className="text-neutral-600 dark:text-neutral-400">{field.label}:</span>
                          <span className="text-neutral-900 dark:text-neutral-100">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadVCard}
                    className="btn-primary flex items-center justify-center space-x-2 space-x-reverse flex-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>حفظ جهة الاتصال</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="btn-secondary flex items-center justify-center space-x-2 space-x-reverse flex-1"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة البطاقة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                إحصائيات البطاقة
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Eye className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">المشاهدات</span>
                  </div>
                  <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {card.views}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Share2 className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">المشاركات</span>
                  </div>
                  <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {card.shares}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">النقرات</span>
                  </div>
                  <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {card.clicks}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                معلومات البطاقة
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">تاريخ الإنشاء:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    {new Date(card.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">آخر تحديث:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    {new Date(card.updatedAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">الحالة:</span>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    card.isActive 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                  )}>
                    {card.isActive ? 'نشطة' : 'غير نشطة'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                رمز QR للبطاقة
              </h3>
              
              <div className="w-48 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-neutral-400" />
              </div>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                امسح هذا الرمز للوصول إلى البطاقة
              </p>
              
              <button
                onClick={() => setShowQR(false)}
                className="btn-primary w-full"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardView;
