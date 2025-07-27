// src/pages/QRGenerator.tsx (النسخة النهائية العاملة)
import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Share2, 
  Copy, 
  Upload,
  Save,
  Trash2,
  Plus,
  Settings,
  Palette,
  Shapes,
  Sticker,
  ImageIcon,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useStore } from '../store/useStore';
import QRShapes from '../components/qr/QRShapes';
import QRStickers from '../components/qr/QRStickers';
import { AdvancedQRGenerator, type QROptions } from '../lib/qr-generator';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

const QRGenerator = () => {
  const { user } = useStore();
  const qrGenerator = useRef(new AdvancedQRGenerator());
  
  // QR Data State
  const [qrData, setQrData] = useState({
    type: 'url',
    content: '',
    title: '',
  });

  // Customization State
  const [customization, setCustomization] = useState<QROptions>({
    size: 300,
    foregroundColor: '#1D4ED8',
    backgroundColor: '#FFFFFF',
    shape: 'square',
    pattern: 'square',
    logoSize: 50,
    eyeColor: '#1D4ED8',
    eyeStrokeColor: '#1D4ED8',
    eyeballColor: '#1D4ED8'
  });

  // UI State
  const [activeTab, setActiveTab] = useState('content');
  const [qrImageUrl, setQrImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const qrTypes = [
    { id: 'url', name: 'رابط موقع', placeholder: 'https://example.com' },
    { id: 'text', name: 'نص', placeholder: 'أدخل النص هنا' },
    { id: 'email', name: 'بريد إلكتروني', placeholder: 'example@domain.com' },
    { id: 'phone', name: 'رقم هاتف', placeholder: '+966501234567' },
    { id: 'wifi', name: 'شبكة WiFi', placeholder: 'اسم الشبكة:كلمة المرور:WPA' },
  ];

  const tabs = [
    { id: 'content', name: 'المحتوى', icon: Plus },
    { id: 'shapes', name: 'الأشكال', icon: Shapes },
    { id: 'stickers', name: 'الستيكرز', icon: Sticker },
    { id: 'colors', name: 'الألوان', icon: Palette },
    { id: 'patterns', name: 'الأنماط', icon: Settings },
    { id: 'logo', name: 'اللوجو', icon: ImageIcon }
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
      case 'wifi':
        const [ssid, password, security] = qrData.content.split(':');
        return `WIFI:T:${security || 'WPA'};S:${ssid};P:${password};;`;
      default:
        return qrData.content;
    }
  };

  // Generate QR Code whenever data or customization changes
  useEffect(() => {
    const generateQR = async () => {
      const content = generateQRContent();
      if (!content) {
        setQrImageUrl('');
        return;
      }

      setIsGenerating(true);
      try {
        const qrUrl = await qrGenerator.current.generateQR(content, customization);
        setQrImageUrl(qrUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast.error('حدث خطأ في توليد رمز QR');
      } finally {
        setIsGenerating(false);
      }
    };

    generateQR();
  }, [qrData, customization]);

  // Handle shape selection
  const handleShapeSelect = (shape: string) => {
    setCustomization(prev => ({ ...prev, shape }));
    toast.success(`تم اختيار شكل: ${shape}`);
  };

  // Handle sticker selection
  const handleStickerSelect = (sticker: string) => {
    setCustomization(prev => ({ ...prev, sticker }));
    toast.success('تم تطبيق الستيكر!');
  };

  // Handle pattern change
  const handlePatternChange = (pattern: string) => {
    setCustomization(prev => ({ ...prev, pattern: pattern as any }));
    toast.success(`تم تغيير النمط إلى: ${pattern}`);
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

  // Download function
  const handleDownload = () => {
    if (!qrImageUrl) {
      toast.error('لا يوجد رمز QR للتحميل');
      return;
    }

    const link = document.createElement('a');
    link.download = `qr-${qrData.title || 'code'}.png`;
    link.href = qrImageUrl;
    link.click();
    toast.success('تم تحميل رمز QR بنجاح!');
  };

  // Reset function
  const handleReset = () => {
    setQrData({ type: 'url', content: '', title: '' });
    setCustomization({
      size: 300,
      foregroundColor: '#1D4ED8',
      backgroundColor: '#FFFFFF',
      shape: 'square',
      pattern: 'square',
      logoSize: 50,
      eyeColor: '#1D4ED8',
      eyeStrokeColor: '#1D4ED8',
      eyeballColor: '#1D4ED8'
    });
    toast.success('تم إعادة تعيين الإعدادات');
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
            onClick={handleReset}
            className="btn-secondary flex items-center space-x-2 space-x-reverse"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة تعيين</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center space-x-2 space-x-reverse"
            disabled={!qrImageUrl}
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
                    onShapeSelect={handleShapeSelect}
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
                    selectedSticker={customization.sticker || ''}
                    onStickerSelect={handleStickerSelect}
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
                      { key: 'foregroundColor', label: 'لون المقدمة' },
                      { key: 'backgroundColor', label: 'لون الخلفية' },
                      { key: 'eyeColor', label: 'لون العين' },
                      { key: 'eyeStrokeColor', label: 'لون حدود العين' },
                      { key: 'eyeballColor', label: 'لون بؤبؤ العين' }
                    ].map((colorOption) => (
                      <div key={colorOption.key}>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          {colorOption.label}
                        </label>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <input
                            type="color"
                            value={customization[colorOption.key as keyof QROptions] as string}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              [colorOption.key]: e.target.value 
                            }))}
                            className="w-12 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600"
                          />
                          <input
                            type="text"
                            value={customization[colorOption.key as keyof QROptions] as string}
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
                          onClick={() => handlePatternChange(pattern.id)}
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
                      min="200"
                      max="500"
                      step="50"
                      value={customization.size}
                      onChange={(e) => setCustomization(prev => ({ 
                        ...prev, 
                        size: parseInt(e.target.value) 
                      }))}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700"
                    />
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <span>200px</span>
                      <span>500px</span>
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
                          onClick={() => setCustomization(prev => ({ ...prev, logo: undefined }))}
                          className="btn-outline flex items-center space-x-2 space-x-reverse"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>إزالة</span>
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      PNG أو JPG، الحد الأقصى 2MB
                    </p>
                  </div>

                  {customization.logo && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        حجم اللوجو: {customization.logoSize}px
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={customization.logoSize}
                        onChange={(e) => setCustomization(prev => ({ 
                          ...prev, 
                          logoSize: parseInt(e.target.value) 
                        }))}
                        className="w-full"
                      />
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
              {isGenerating ? (
                <div className="text-center text-neutral-500 dark:text-neutral-400 flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
                  <p>جاري إنشاء الرمز...</p>
                </div>
              ) : qrImageUrl ? (
                <img 
                  src={qrImageUrl} 
                  alt="Generated QR Code" 
                  className="max-w-full max-h-full object-contain"
                  style={{ maxWidth: customization.size, maxHeight: customization.size }}
                />
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
                disabled={!qrImageUrl}
                className="w-full btn-primary flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full btn-secondary flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
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
                    toast.error('المشاركة غير مدعومة في هذا المتصفح');
                  }
                }}
                disabled={!qrContentForDisplay}
                className="w-full btn-outline flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
