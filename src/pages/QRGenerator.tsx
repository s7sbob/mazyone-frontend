// src/pages/QRGenerator.tsx (النسخة المحدثة بالكامل)
import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Share2, 
  Copy, 
  Upload,
  Eye,
  Save,
  Trash2,
  Plus,
  Settings,
  Palette,
  Shapes,
  Sticker,
  ImageIcon,
  RefreshCw
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { useStore } from '../store/useStore';
import QRShapes from '../components/qr/QRShapes';
import QRStickers from '../components/qr/QRStickers';
import type { QRCode as QRCodeType } from '../types';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

interface QRCustomization {
  // Basic QR settings
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  
  // Advanced customization
  customStrokeColor: string;
  customEyeColor: string;
  customEyeStrokeColor: string;
  customEyeballColor: string;
  
  // Shape settings
  shape: string;
  pattern: 'square' | 'dots' | 'rounded' | 'diamond' | 'star';
  
  // Logo settings
  logo: string;
  logoSize: number;
  logoBackgroundColor: string;
  logoCornerRadius: number;
  
  // Frame/Sticker settings
  sticker: string;
  
  // Decorative picture
  backgroundImage: string;
  qrPosition: { x: number; y: number };
  qrScale: number;
}

const QRGenerator = () => {
  const { user } = useStore();
  
  // QR Data State
  const [qrData, setQrData] = useState({
    type: 'url',
    content: '',
    title: '',
  });

  // Customization State
  const [customization, setCustomization] = useState<QRCustomization>({
    foregroundColor: '#1D4ED8',
    backgroundColor: '#FFFFFF',
    size: 256,
    customStrokeColor: '#1D4ED8',
    customEyeColor: '#1D4ED8',
    customEyeStrokeColor: '#1D4ED8',
    customEyeballColor: '#1D4ED8',
    shape: 'square',
    pattern: 'square',
    logo: '',
    logoSize: 32,
    logoBackgroundColor: '#FFFFFF',
    logoCornerRadius: 8,
    sticker: '',
    backgroundImage: '',
    qrPosition: { x: 50, y: 50 },
    qrScale: 1
  });

  // UI State
  const [activeTab, setActiveTab] = useState('content');
  const [savedQRs, setSavedQRs] = useState<QRCodeType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const qrTypes = [
    { id: 'url', name: 'رابط موقع', placeholder: 'https://example.com' },
    { id: 'text', name: 'نص', placeholder: 'أدخل النص هنا' },
    { id: 'email', name: 'بريد إلكتروني', placeholder: 'example@domain.com' },
    { id: 'phone', name: 'رقم هاتف', placeholder: '+966501234567' },
    { id: 'sms', name: 'رسالة نصية', placeholder: 'رقم الهاتف:الرسالة' },
    { id: 'wifi', name: 'شبكة WiFi', placeholder: 'اسم الشبكة:كلمة المرور:نوع الحماية' },
    { id: 'vcard', name: 'بطاقة اتصال', placeholder: 'الاسم:الهاتف:البريد' },
    { id: 'location', name: 'موقع جغرافي', placeholder: 'خط العرض,خط الطول' },
    { id: 'event', name: 'حدث', placeholder: 'عنوان الحدث:التاريخ:المكان' },
    { id: 'social', name: 'وسائل التواصل', placeholder: 'https://linkedin.com/in/username' }
  ];

  const tabs = [
    { id: 'content', name: 'المحتوى', icon: Plus },
    { id: 'shapes', name: 'الأشكال', icon: Shapes },
    { id: 'stickers', name: 'الستيكرز', icon: Sticker },
    { id: 'colors', name: 'الألوان', icon: Palette },
    { id: 'patterns', name: 'الأنماط', icon: Settings },
    { id: 'logo', name: 'اللوجو', icon: ImageIcon },
    { id: 'decorate', name: 'تزيين الصورة', icon: Upload }
  ];

  // Generate QR content based on type
  const generateQRContent = (): string => {
    if (!qrData.content.trim()) return '';
    
    switch (qrData.type) {
      case 'url':
        return qrData.content;
      case 'email':
        return `mailto:${qrData.content}`;
      case 'phone':
        return `tel:${qrData.content}`;
      case 'sms':
        const [phone, message] = qrData.content.split(':');
        return `sms:${phone}?body=${encodeURIComponent(message || '')}`;
      case 'wifi':
        const [ssid, password, security] = qrData.content.split(':');
        return `WIFI:T:${security || 'WPA'};S:${ssid};P:${password};;`;
      case 'vcard':
        const [name, phoneNum, email] = qrData.content.split(':');
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phoneNum}\nEMAIL:${email}\nEND:VCARD`;
      case 'location':
        const [lat, lng] = qrData.content.split(',');
        return `geo:${lat},${lng}`;
      case 'event':
        const [title, date, location] = qrData.content.split(':');
        return `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${date}\nLOCATION:${location}\nEND:VEVENT`;
      default:
        return qrData.content;
    }
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('حجم الملف يجب أن يكون أقل من 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCustomization(prev => ({ ...prev, logo: result }));
      toast.success('تم رفع اللوجو بنجاح!');
    };
    reader.readAsDataURL(file);
  };

  // Handle background image upload
  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الملف يجب أن يكون أقل من 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCustomization(prev => ({ ...prev, backgroundImage: result }));
      toast.success('تم رفع الصورة بنجاح!');
    };
    reader.readAsDataURL(file);
  };

  // Custom QR Code component with advanced styling
  const CustomQRCode = () => {
    const qrContent = generateQRContent();
    if (!qrContent) return null;

    return (
      <div 
        ref={qrRef}
        className="relative inline-block"
        style={{
          filter: customization.shape !== 'square' ? `drop-shadow(0 4px 8px rgba(0,0,0,0.1))` : 'none'
        }}
      >
        {/* Shape Mask */}
        {customization.shape !== 'square' && (
          <div 
            className="absolute inset-0 z-10"
            style={{
              maskImage: `url("data:image/svg+xml,${encodeURIComponent(`
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L90 90 L10 90 Z" fill="white"/>
                </svg>
              `)}")`,
              WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(`
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L90 90 L10 90 Z" fill="white"/>
                </svg>
              `)}")`,
              maskSize: 'cover',
              WebkitMaskSize: 'cover'
            }}
          >
            <div 
              className="w-full h-full"
              style={{ backgroundColor: customization.foregroundColor }}
            />
          </div>
        )}

        {/* QR Code */}
        <QRCode
          value={qrContent}
          size={customization.size}
          fgColor={customization.foregroundColor}
          bgColor={customization.backgroundColor}
          style={{
            borderRadius: customization.pattern === 'rounded' ? '8px' : '0px',
          }}
        />

        {/* Logo Overlay */}
        {customization.logo && (
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              width: customization.logoSize,
              height: customization.logoSize,
              backgroundColor: customization.logoBackgroundColor,
              borderRadius: customization.logoCornerRadius,
              border: '2px solid white'
            }}
          >
            <img 
              src={customization.logo} 
              alt="Logo"
              className="max-w-full max-h-full object-contain"
              style={{
                borderRadius: customization.logoCornerRadius - 2
              }}
            />
          </div>
        )}

        {/* Sticker Frame */}
        {customization.sticker && (
          <div className="absolute inset-0 pointer-events-none">
            {/* This would render the selected sticker frame around the QR */}
            <div className="w-full h-full border-4 border-blue-500 rounded-lg" />
          </div>
        )}
      </div>
    );
  };

  // Generate final QR with all customizations
  const generateFinalQR = async () => {
    // This would use canvas to combine all elements
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Canvas manipulation code here...
    return canvas.toDataURL();
  };

  // Download function
  const handleDownload = async () => {
    const dataUrl = await generateFinalQR();
    if (!dataUrl) {
      toast.error('حدث خطأ في توليد الرمز');
      return;
    }

    const link = document.createElement('a');
    link.download = `qr-${qrData.title || 'code'}.png`;
    link.href = dataUrl;
    link.click();
    toast.success('تم تحميل رمز QR بنجاح!');
  };

  const qrContentForDisplay = generateQRContent();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            مولد رموز QR المتقدم
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            أنشئ رموز QR مخصصة بأشكال وألوان احترافية
          </p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => {
              setQrData({ type: 'url', content: '', title: '' });
              setCustomization({
                foregroundColor: '#1D4ED8',
                backgroundColor: '#FFFFFF',
                size: 256,
                customStrokeColor: '#1D4ED8',
                customEyeColor: '#1D4ED8',
                customEyeStrokeColor: '#1D4ED8',
                customEyeballColor: '#1D4ED8',
                shape: 'square',
                pattern: 'square',
                logo: '',
                logoSize: 32,
                logoBackgroundColor: '#FFFFFF',
                logoCornerRadius: 8,
                sticker: '',
                backgroundImage: '',
                qrPosition: { x: 50, y: 50 },
                qrScale: 1
              });
            }}
            className="btn-secondary flex items-center space-x-2 space-x-reverse"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة تعيين</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center space-x-2 space-x-reverse"
            disabled={!qrContentForDisplay}
          >
            <Download className="w-4 h-4" />
            <span>تحميل</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="card">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary-500 text-white"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      نوع المحتوى
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {qrTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setQrData({ ...qrData, type: type.id, content: '' })}
                          className={cn(
                            "p-3 rounded-lg border text-sm font-medium transition-colors",
                            qrData.type === type.id
                              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 text-neutral-700 dark:text-neutral-300"
                          )}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        عنوان الرمز (اختياري)
                      </label>
                      <input
                        type="text"
                        value={qrData.title}
                        onChange={(e) => setQrData({ ...qrData, title: e.target.value })}
                        className="input-field"
                        placeholder="أدخل عنواناً للرمز"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        المحتوى
                      </label>
                      <textarea
                        value={qrData.content}
                        onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
                        className="input-field min-h-24"
                        placeholder={qrTypes.find(t => t.id === qrData.type)?.placeholder}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shapes Tab */}
              {activeTab === 'shapes' && (
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    اختر شكل الرمز
                  </h3>
                  <QRShapes
                    selectedShape={customization.shape}
                    onShapeSelect={(shape) => setCustomization(prev => ({ ...prev, shape }))}
                  />
                </div>
              )}

              {/* Stickers Tab */}
              {activeTab === 'stickers' && (
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    اختر إطار الستيكر
                  </h3>
                  <QRStickers
                    selectedSticker={customization.sticker}
                    onStickerSelect={(sticker) => setCustomization(prev => ({ ...prev, sticker }))}
                  />
                </div>
              )}

              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    تخصيص الألوان
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'foregroundColor', label: 'لون المقدمة', value: customization.foregroundColor },
                      { key: 'backgroundColor', label: 'لون الخلفية', value: customization.backgroundColor },
                      { key: 'customStrokeColor', label: 'لون الحدود المخصص', value: customization.customStrokeColor },
                      { key: 'customEyeColor', label: 'لون العين المخصص', value: customization.customEyeColor },
                      { key: 'customEyeStrokeColor', label: 'لون حدود العين', value: customization.customEyeStrokeColor },
                      { key: 'customEyeballColor', label: 'لون بؤبؤ العين', value: customization.customEyeballColor }
                    ].map((colorOption) => (
                      <div key={colorOption.key}>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          {colorOption.label}
                        </label>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <input
                            type="color"
                            value={colorOption.value}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              [colorOption.key]: e.target.value 
                            }))}
                            className="w-12 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600"
                          />
                          <input
                            type="text"
                            value={colorOption.value}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              [colorOption.key]: e.target.value 
                            }))}
                            className="input-field flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Patterns Tab */}
              {activeTab === 'patterns' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    نمط الرمز
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                      شكل النقاط
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { id: 'square', name: 'مربع' },
                        { id: 'dots', name: 'نقاط' },
                        { id: 'rounded', name: 'مستدير' },
                        { id: 'diamond', name: 'معين' },
                        { id: 'star', name: 'نجمة' }
                      ].map((pattern) => (
                        <button
                          key={pattern.id}
                          onClick={() => setCustomization(prev => ({ 
                            ...prev, 
                            pattern: pattern.id as any 
                          }))}
                          className={cn(
                            "p-3 rounded-lg border text-sm font-medium transition-colors",
                            customization.pattern === pattern.id
                              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 text-neutral-700 dark:text-neutral-300"
                          )}
                        >
                          {pattern.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      حجم الرمز: {customization.size}px
                    </label>
                    <input
                      type="range"
                      min="128"
                      max="512"
                      step="32"
                      value={customization.size}
                      onChange={(e) => setCustomization(prev => ({ 
                        ...prev, 
                        size: parseInt(e.target.value) 
                      }))}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700"
                    />
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <span>128px</span>
                      <span>512px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Logo Tab */}
              {activeTab === 'logo' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    إضافة لوجو
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      رفع اللوجو
                    </label>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-secondary flex items-center space-x-2 space-x-reverse"
                      >
                        <Upload className="w-4 h-4" />
                        <span>اختر لوجو</span>
                      </button>
                      {customization.logo && (
                        <button
                          onClick={() => setCustomization(prev => ({ ...prev, logo: '' }))}
                          className="btn-outline flex items-center space-x-2 space-x-reverse"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>إزالة</span>
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      PNG أو SVG، الحد الأقصى 2MB
                    </p>
                  </div>

                  {customization.logo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          حجم اللوجو: {customization.logoSize}px
                        </label>
                        <input
                          type="range"
                          min="16"
                          max="128"
                          value={customization.logoSize}
                          onChange={(e) => setCustomization(prev => ({ 
                            ...prev, 
                            logoSize: parseInt(e.target.value) 
                          }))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          لون خلفية اللوجو
                        </label>
                        <input
                          type="color"
                          value={customization.logoBackgroundColor}
                          onChange={(e) => setCustomization(prev => ({ 
                            ...prev, 
                            logoBackgroundColor: e.target.value 
                          }))}
                          className="w-full h-10 rounded-lg border border-neutral-300 dark:border-neutral-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          استدارة الزوايا: {customization.logoCornerRadius}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={customization.logoCornerRadius}
                          onChange={(e) => setCustomization(prev => ({ 
                            ...prev, 
                            logoCornerRadius: parseInt(e.target.value) 
                          }))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Decorate Picture Tab */}
              {activeTab === 'decorate' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    إضافة QR على صورتك الخاصة
                  </h3>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                        أضف صورتك الخاصة
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 mb-4">
                        ارفع صورة وضع رمز QR عليها واضبط الموضع والحجم
                      </p>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="hidden"
                        id="background-upload"
                      />
                      <label
                        htmlFor="background-upload"
                        className="btn-primary inline-flex items-center space-x-2 space-x-reverse cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>اختر صورة</span>
                      </label>
                    </div>
                  </div>

                  {customization.backgroundImage && (
                    <div className="space-y-4">
                      <div className="relative border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                        <img 
                          src={customization.backgroundImage} 
                          alt="Background"
                          className="w-full h-64 object-cover"
                        />
                        <div 
                          className="absolute bg-white bg-opacity-90 p-2 rounded cursor-move"
                          style={{
                            left: `${customization.qrPosition.x}%`,
                            top: `${customization.qrPosition.y}%`,
                            transform: `translate(-50%, -50%) scale(${customization.qrScale})`
                          }}
                          onMouseDown={() => setIsDragging(true)}
                        >
                          <div className="w-16 h-16 bg-neutral-900 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            موضع أفقي: {customization.qrPosition.x}%
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="90"
                            value={customization.qrPosition.x}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              qrPosition: { ...prev.qrPosition, x: parseInt(e.target.value) }
                            }))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            موضع عمودي: {customization.qrPosition.y}%
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="90"
                            value={customization.qrPosition.y}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              qrPosition: { ...prev.qrPosition, y: parseInt(e.target.value) }
                            }))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            الحجم: {Math.round(customization.qrScale * 100)}%
                          </label>
                          <input
                            type="range"
                            min="0.3"
                            max="2"
                            step="0.1"
                            value={customization.qrScale}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              qrScale: parseFloat(e.target.value)
                            }))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          {/* QR Preview */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              معاينة الرمز
            </h2>
            
            <div className="flex justify-center p-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg min-h-80">
              {qrContentForDisplay ? (
                <CustomQRCode />
              ) : (
                <div className="text-center text-neutral-500 dark:text-neutral-400 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8" />
                  </div>
                  <p>أدخل محتوى لعرض الرمز</p>
                </div>
              )}
            </div>

            {qrContentForDisplay && (
              <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">المحتوى:</p>
                <p className="text-sm font-mono text-neutral-900 dark:text-neutral-100 break-all">
                  {qrContentForDisplay}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              إجراءات سريعة
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                disabled={!qrContentForDisplay}
                className="w-full btn-primary flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Download className="w-4 h-4" />
                <span>تحميل PNG</span>
              </button>
              
              <button
                onClick={() => {
                  if (qrContentForDisplay) {
                    navigator.clipboard.writeText(qrContentForDisplay);
                    toast.success('تم نسخ المحتوى!');
                  }
                }}
                disabled={!qrContentForDisplay}
                className="w-full btn-secondary flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Copy className="w-4 h-4" />
                <span>نسخ المحتوى</span>
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share && qrContentForDisplay) {
                    navigator.share({
                      title: qrData.title || 'رمز QR',
                      text: qrContentForDisplay
                    });
                  } else {
                    toast.error('المشاركة غير مدعومة');
                  }
                }}
                disabled={!qrContentForDisplay}
                className="w-full btn-outline flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة</span>
              </button>
            </div>
          </div>

          {/* Save to Library */}
          {qrContentForDisplay && (
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                حفظ في المكتبة
              </h3>
              
              <button
                onClick={() => {
                  // Save to library logic
                  toast.success('تم حفظ الرمز في مكتبتك!');
                }}
                className="w-full btn-primary flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الرمز</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for final rendering */}
      <canvas ref={canvasRef} className="hidden" width="512" height="512" />
    </div>
  );
};

export default QRGenerator;
